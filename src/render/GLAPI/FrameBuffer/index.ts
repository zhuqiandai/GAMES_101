import { initGL, cube } from '../../../common'

const { gl, program, canvas } = initGL('vs', 'fs')
const { program: frameProgram } = initGL('vsframe', 'fsframe')

const {
    vertexPositions: cubePositions,
    indices: cubeIndices,
    vertexTextureCoords: cubeTexCoords,
} = cube()

const positionLocation = 0
const texCoordLocation = 1
const samplerLocation = gl.getUniformLocation(program, 'uSampler')

const cubeVAO = gl.createVertexArray()

// buffer
const texture = gl.createTexture()
const texCoordBuffer = gl.createBuffer()
const textureUnit = 0

const frameBuffer = gl.createFramebuffer()
const renderBuffer = gl.createRenderbuffer()

const FRAME_WIDTH = 1024
const FRAME_HEIGHT = 1024

const initFrameBuffer = () => {
    // 1. color attachments
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.activeTexture(gl.TEXTURE0 + textureUnit)
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        FRAME_WIDTH,
        FRAME_HEIGHT,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
    )
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    // 2. depth attachments and stenticl attachments
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer)
    gl.renderbufferStorage(
        gl.RENDERBUFFER,
        gl.DEPTH24_STENCIL8,
        FRAME_WIDTH,
        FRAME_HEIGHT
    )

    // 3. bind to framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer)
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
    )
    gl.framebufferRenderbuffer(
        gl.FRAMEBUFFER,
        gl.DEPTH_ATTACHMENT,
        gl.RENDERBUFFER,
        renderBuffer
    )

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.bindTexture(gl.TEXTURE_2D, null)
    gl.bindRenderbuffer(gl.RENDERBUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
}

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

    // texture coord
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, cubeTexCoords, gl.STATIC_DRAW)

    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(texCoordLocation)

    initFrameBuffer()
}

const draw = (time: number) => {
    // frame program
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer)

    gl.useProgram(frameProgram)

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.viewport(0, 0, FRAME_WIDTH, FRAME_HEIGHT)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.bindVertexArray(cubeVAO)
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    // normal program
    gl.useProgram(program)

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(samplerLocation, textureUnit)

    gl.bindVertexArray(cubeVAO)
    gl.drawElements(gl.TRIANGLES, cubeIndices.length, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)

    requestAnimationFrame(draw)
}

init()
requestAnimationFrame(draw)
