import createProgram from './createProgram'

function initGL(vs: string, fs: string, width?: number, height?: number) {
    const vsSource = document.getElementById(vs)?.textContent as string
    const fsSource = document.getElementById(fs)?.textContent as string

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext

    const program = createProgram(
        canvas,
        gl,
        width ?? 800,
        height ?? 800,
        vsSource,
        fsSource
    ) as WebGL2RenderingContext

    return {
        gl,
        program,
    }
}

export default initGL
