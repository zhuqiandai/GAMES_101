// @ts-nocheck
import { initGL, cube } from '../../../common'

const { gl, program } = initGL('vs', 'fs')

const {
    vertexPositions: cubePositions,
    indices: cubeIndices,
    vertexNormals: cubeNormals,
} = cube()

const positionLocation = 0
const normalLocation = 1

const cubeVAO = gl.createVertexArray()
const cubeNormalBuffer = gl.createBuffer()

const init = () => {
    gl.useProgram(program)

    gl.enable(gl.DEPTH_TEST)

    gl.bindVertexArray(cubeVAO)

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, cubeNormals, gl.STATIC_DRAW)

    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 3 * 4, 0)
    gl.enableVertexAttribArray(normalLocation)

    const cubeBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, cubePositions, gl.STATIC_DRAW)

    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 3 * 4, 0)
    gl.enableVertexAttribArray(positionLocation)

    const cubeIndiceBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeIndices, gl.STATIC_DRAW)

    gl.bindVertexArray(null)

    const lviewLocation = gl.getUniformLocation(program, 'lubo_view')
    const lpositionLocation = gl.getUniformLocation(program, 'lubo_position')
    const lcolorLocation = gl.getUniformLocation(program, 'lubo_color')

    const light = {
        view: [0.0, 0.0, 3.0],
        position: [0.0, 0.2, 0.6],
        color: [0.2, 0.2, 0.2],
    }

    gl.uniform3fv(lviewLocation, light.view)
    gl.uniform3fv(lpositionLocation, light.position)
    gl.uniform3fv(lcolorLocation, light.color)
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
