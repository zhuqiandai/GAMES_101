import dat from 'dat.gui'
import { mat4 } from 'gl-matrix'
import { createProgram, cube } from '../../../common'

const vsSource = document.getElementById('vs')?.textContent as string
const fsSource = document.getElementById('fs')?.textContent as string

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const gl = canvas.getContext('webgl2') as WebGL2RenderingContext

const width = 800
const height = 800

const program = createProgram(
    canvas,
    gl,
    width,
    height,
    vsSource,
    fsSource
) as WebGL2RenderingContext

const positionLocation = 0
const divisorLocation = 1
const divisorMatLocation = 2

const { vertexPositions: cubePositions, indices: cubeIndices } = cube()

// gui
const gui = new dat.GUI()

// mesh
const meshVAO = gl.createVertexArray()

const meshBuffer = gl.createBuffer()
const meshIndiceBuffer = gl.createBuffer()

// divisor
const divisorBuffer = gl.createBuffer()
const divisorMatBuffer = gl.createBuffer()

const x = -0.5
const y = -0.5
const z = 0.0

let divisorElements: number[] = []
let divisorMatElements: number[] = []

// init & draw
const init = () => {
    gl.useProgram(program)

    gl.enable(gl.DEPTH_TEST)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    for (let i = 0; i <= 1; i += 0.2) {
        divisorElements.push(x + i, y, z)
        divisorElements.push(x, y + i, z)

        divisorMatElements.push(x + i, y, z)
        divisorMatElements.push(x, y + i, z)
    }

    gl.bindVertexArray(meshVAO)

    gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, cubePositions, gl.STATIC_DRAW)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshIndiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeIndices, gl.STATIC_DRAW)

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 3 * 4, 0)

    /**
     *  divisor translate
     */
    gl.bindBuffer(gl.ARRAY_BUFFER, divisorBuffer)
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(divisorElements),
        gl.STATIC_DRAW
    )

    gl.enableVertexAttribArray(divisorLocation)
    gl.vertexAttribPointer(divisorLocation, 3, gl.FLOAT, false, 3 * 4, 0)

    gl.vertexAttribDivisor(divisorLocation, 1)

    /**
     *  divisor matrix
     */
    gl.bindBuffer(gl.ARRAY_BUFFER, divisorMatBuffer)
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float64Array(divisorMatElements),
        gl.STATIC_DRAW
    )

    gl.enableVertexAttribArray(divisorMatLocation)
    gl.vertexAttribPointer(divisorMatLocation, 3, gl.FLOAT, false, 3 * 4, 0)

    gl.vertexAttribDivisor(divisorMatLocation, 1)

    gl.bindVertexArray(null)
}

let step = 0
const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    step += 0.01

    gl.bindVertexArray(meshVAO)

    gl.drawElementsInstanced(
        gl.TRIANGLES,
        cubeIndices.length,
        gl.UNSIGNED_SHORT,
        0,
        6 * 2
    )

    gl.bindVertexArray(null)

    requestAnimationFrame(draw)
}

init()
requestAnimationFrame(draw)
