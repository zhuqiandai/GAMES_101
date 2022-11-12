import { initGL, cube } from '../../../common'
import { mat4 } from 'gl-matrix'

const { gl, program } = initGL('vs', 'fs')

const { vertexPositions: cubePositions, indices: cubeIndices } = cube()

const positionLocation = 0

const cubeVAO = gl.createVertexArray()
const mvpUBO = gl.createBuffer()

const model = mat4.create()
const view = mat4.create()
const projection = mat4.create()
let mvpData = new Float32Array([...model, ...view, ...projection])

const init = () => {
    gl.useProgram(program)

    gl.bindVertexArray(cubeVAO)

    const cubeBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, cubePositions, gl.STATIC_DRAW)

    const cubeIndiceBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeIndices, gl.STATIC_DRAW)

    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(positionLocation)

    gl.bindVertexArray(null)

    // Uniform Buffer Object
    const UBO_BINDING_POINT = 0
    gl.bindBufferBase(gl.UNIFORM_BUFFER, UBO_BINDING_POINT, mvpUBO)
    gl.bufferData(gl.UNIFORM_BUFFER, mvpData, gl.DYNAMIC_DRAW)

    const uniformBlockIndex = gl.getUniformBlockIndex(program, 'MVP')
    gl.uniformBlockBinding(program, uniformBlockIndex, UBO_BINDING_POINT)
}

const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    mat4.rotateX(model, model, Math.PI / 128)
    mat4.rotateY(model, model, Math.PI / 128)
    mat4.rotateZ(model, model, Math.PI / 128)

    let mvpData = new Float32Array([...model, ...view, ...projection])
    gl.bindBuffer(gl.UNIFORM_BUFFER, mvpUBO)
    gl.bufferSubData(gl.UNIFORM_BUFFER, 0, mvpData)

    gl.bindVertexArray(cubeVAO)
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)

    requestAnimationFrame(draw)
}

init()
requestAnimationFrame(draw)
