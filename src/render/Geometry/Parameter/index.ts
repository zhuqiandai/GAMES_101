/**
 *  1. B-Spline Curve
 */
import { initGL, cube } from '../../../common'
import dat from 'dat.gui'

const { gl, program } = initGL('vs', 'fs')

const positionLocation = 0

const lineBufferData: number[] = []

// gui
const gui = new dat.GUI()
const line = gui.addFolder('Line')
const line_num = { number: 10 }
line.add(line_num, 'number', 2, 100)

// buffer
const buffer = gl.createBuffer()

const init = () => {
    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(lineBufferData),
        gl.STATIC_DRAW
    )

    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 2 * 4, 0)
}

const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.drawArrays(gl.LINE_STRIP, 0, lineBufferData.length / 2)

    requestAnimationFrame(draw)
}

init()
requestAnimationFrame(draw)
