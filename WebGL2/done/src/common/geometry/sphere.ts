// @ts-nocheck

function sphere(radius = 0.5, slices = 32, stacks = 16) {
    radius = radius || 0.5
    slices = slices || 32
    stacks = stacks || 16
    var vertexCount = (slices + 1) * (stacks + 1)
    var vertices = new Float32Array(3 * vertexCount)
    var normals = new Float32Array(3 * vertexCount)
    var texCoords = new Float32Array(2 * vertexCount)
    var indices = new Uint16Array(2 * slices * stacks * 3)
    var du = (2 * Math.PI) / slices
    var dv = Math.PI / stacks
    var i, j, u, v, x, y, z
    var indexV = 0
    var indexT = 0
    for (i = 0; i <= stacks; i++) {
        v = -Math.PI / 2 + i * dv
        for (j = 0; j <= slices; j++) {
            u = j * du
            x = Math.cos(u) * Math.cos(v)
            y = Math.sin(u) * Math.cos(v)
            z = Math.sin(v)
            vertices[indexV] = radius * x
            normals[indexV++] = x
            vertices[indexV] = radius * y
            normals[indexV++] = y
            vertices[indexV] = radius * z
            normals[indexV++] = z
            texCoords[indexT++] = j / slices
            texCoords[indexT++] = i / stacks
        }
    }
    var k = 0
    for (j = 0; j < stacks; j++) {
        var row1 = j * (slices + 1)
        var row2 = (j + 1) * (slices + 1)
        for (i = 0; i < slices; i++) {
            indices[k++] = row1 + i
            indices[k++] = row2 + i + 1
            indices[k++] = row2 + i
            indices[k++] = row1 + i
            indices[k++] = row1 + i + 1
            indices[k++] = row2 + i + 1
        }
    }
    return {
        vertexPositions: vertices,
        vertexNormals: normals,
        vertexTextureCoords: texCoords,
        indices: indices,
    }
}

export default sphere
