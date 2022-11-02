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

const cubeVAO = gl.createVertexArray()

const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.bindVertexArray(cubeVAO)
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)

    requestAnimationFrame(draw)
}

// 数据
const init = () => {
    gl.useProgram(program)

    const positionLocation = 0
    // cube vao
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

    gl.bindVertexArray(null)
}

init()
requestAnimationFrame(draw)
