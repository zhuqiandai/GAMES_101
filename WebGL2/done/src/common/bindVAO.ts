export type GeometryT = {
    vertexPositions: Float32Array
    indices: Float32Array
    vertexNormals: Float32Array
    vertexTextureCoords: Float32Array
}

function bindVAO(
    gl: WebGL2RenderingContext,
    vao: WebGLVertexArrayObject,
    posLoc: number,
    geometry: GeometryT
) {
    gl.bindVertexArray(vao)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, geometry.vertexPositions, gl.STATIC_DRAW)

    const indiceBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW)

    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(posLoc)

    gl.bindVertexArray(null)

    return {
        count: geometry.indices.length,
    }
}

export default bindVAO
