// @ts-nocheck
import { initGL, cube, bindVAO } from '../../../common'

const { gl, program, canvas } = initGL('vs', 'fs')

const positionLocation = 0

const cubeVAO = gl.createVertexArray() as WebGLVertexArrayObject
const cubeGeometry = cube() as any

gl.useProgram(program)

gl.enable(gl.DEPTH_TEST)

const { count } = bindVAO(gl, cubeVAO, positionLocation, cubeGeometry)

const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.bindVertexArray(cubeVAO)
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
