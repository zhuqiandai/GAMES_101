import { createProgram, cube, sphere } from '../../../common'

const vsSource = `#version 300 es
    layout(location = 0) in vec3 aPosition;

    uniform mat4 modelMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 projectionMatrix;

    void main () {
        gl_Position = vec4(aPosition, 1.0); 
    }
`

const fsSource = `#version 300 es
    precision mediump float;

    out vec4 fragColor;

    void main () {
        vec3 color = vec3(0.7, 0.7, 0.7);
        fragColor = vec4(color, 1.0);
    }
`
const { vertexPositions: cubePositions, indices: cubeIndices } = cube()

const { vertexPositions: spherePositions, indices: sphereIndices } = sphere(
    0.5,
    32,
    16
)

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

const cubeVAO = gl.createVertexArray()
const sphereVAO = gl.createVertexArray()

const draw = (time: number) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.bindVertexArray(sphereVAO)
    gl.drawElements(gl.TRIANGLES, spherePositions.length, gl.UNSIGNED_SHORT, 0)
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

    // sphere vao
    gl.bindVertexArray(sphereVAO)

    const sphereBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, spherePositions, gl.STATIC_DRAW)

    const sphereIndiceBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphereIndiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphereIndices, gl.STATIC_DRAW)

    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(positionLocation)

    gl.bindVertexArray(null)
}

init()
requestAnimationFrame(draw)
