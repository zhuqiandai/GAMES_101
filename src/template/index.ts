// @ts-nocheck
import { initGL, cube } from '../../../common'
import { mat4 } from 'gl-matrix'

const { gl, program } = initGL('vs', 'fs')

const { vertexPositions: cubePositions, indices: cubeIndices } = cube()

const positionLocation = 0

const cubeVAO = gl.createVertexArray()

const init = () => {
    gl.useProgram(program)

    gl.bindVertexArray(cubeVAO)
    
    gl.enable(gl.DEPTH_TEST)

    const cubeBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, cubePositions, gl.STATIC_DRAW)

    const cubeIndiceBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeIndices, gl.STATIC_DRAW)

    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(positionLocation)

    gl.bindVertexArray(null)
}

const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.bindVertexArray(cubeVAO)
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)

    requestAnimationFrame(draw)
}

init()
requestAnimationFrame(draw)
