function createProgram(
    canvas: HTMLCanvasElement,
    gl: WebGL2RenderingContext,
    width: number,
    height: number,
    vs: string,
    fs: string
) {
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    gl.viewport(0, 0, canvas.width, canvas.height)

    const program = gl.createProgram()

    const vshader = gl.createShader(gl.VERTEX_SHADER)
    const fshader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vshader || !fshader) {
        console.log('Shader create compile failed')
    }

    if (program && vshader && fshader) {
        gl.shaderSource(vshader, vs)
        gl.compileShader(vshader)
        gl.attachShader(program, vshader)

        gl.shaderSource(fshader, fs)
        gl.compileShader(fshader)
        gl.attachShader(program, fshader)

        gl.linkProgram(program)

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log(gl.getShaderInfoLog(vshader))
            console.log(gl.getShaderInfoLog(fshader))
        }
    }

    return program
}

export default createProgram
