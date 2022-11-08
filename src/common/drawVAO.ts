function drawVAO(
    gl: WebGL2RenderingContext,
    vao: WebGLVertexArrayObject,
    count: number
) {
    gl.bindVertexArray(vao)
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0)
    gl.bindVertexArray(null)
}

export default drawVAO