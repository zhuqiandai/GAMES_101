import { initGL, cube, bindVAO, sphere, drawVAO } from '../../../common'
import { mat4 } from 'gl-matrix'

const { gl, program, canvas } = initGL('vs', 'fs')

const positionLocation = 0

const sunVAO = gl.createVertexArray() as WebGLVertexArrayObject
const sunGeometry = sphere() as any

const earthVAO = gl.createVertexArray() as WebGLVertexArrayObject
const earthGeometry = sphere() as any

const moonVAO = gl.createVertexArray() as WebGLVertexArrayObject
const moonGeometry = sphere() as any

gl.useProgram(program)

gl.enable(gl.DEPTH_TEST)

const sunMat = mat4.create()
mat4.scale(sunMat, sunMat, [0.3, 0.3, 0.3])
const sunTransMat = mat4.create()

const earthMat = mat4.create()
mat4.scale(earthMat, earthMat, [0.2, 0.2, 0.2])
mat4.translate(earthMat, earthMat, [0.0, 2.5, 0.0])
const earthTransMat = mat4.create()

const moonMat = mat4.create()
mat4.scale(moonMat, moonMat, [0.1, 0.1, 0.1])
mat4.translate(moonMat, moonMat, [0.0, 7.0, 0.0])
const moonTransMat = mat4.create()

function updateWorldMatrix() {
}

const moon = {
    localMatrix: moonMat,
    worldMatrix: moonTransMat,
    children: [],
    updateWorldMatrix,
}
const earth = {
    localMatrix: earthMat,
    worldMatrix: earthTransMat,
    children: [moon],
    updateWorldMatrix,
}
const sun = {
    localMatrix: sunMat,
    worldMatrix: sunTransMat,
    children: [earth, moon],
    updateWorldMatrix,
}

const modelLoc = gl.getUniformLocation(program, 'u_modelMat')
const colorLoc = gl.getUniformLocation(program, 'u_color')

const { count: sunc } = bindVAO(gl, sunVAO, positionLocation, sunGeometry)
const { count: earthc } = bindVAO(gl, earthVAO, positionLocation, earthGeometry)
const { count: moonc } = bindVAO(gl, moonVAO, positionLocation, moonGeometry)

let then = 0
let rotate = Math.PI / 3
const draw = (time: number) => {
    const now = time * 0.001
    const delta = now - then
    then = now

    rotate = Math.sin(delta * 0.0005)

    sun.updateWorldMatrix()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    mat4.rotateZ(sun.localMatrix, sun.localMatrix, 0.01)
    gl.uniformMatrix4fv(modelLoc, false, sun.localMatrix)
    gl.uniform3fv(colorLoc, [1.0, 0.0, 0.0])
    drawVAO(gl, sunVAO, sunc)

    mat4.rotateZ(earth.localMatrix, earth.localMatrix, 0.01)
    gl.uniformMatrix4fv(modelLoc, false, earth.localMatrix)
    gl.uniform3fv(colorLoc, [0.0, 0.0, 1.0])
    drawVAO(gl, earthVAO, earthc)

    mat4.rotateZ(moon.localMatrix, moon.localMatrix, 0.01)
    gl.uniformMatrix4fv(modelLoc, false, moon.localMatrix)
    gl.uniform3fv(colorLoc, [1.0, 1.0, 1.0])
    drawVAO(gl, moonVAO, moonc)

    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)
