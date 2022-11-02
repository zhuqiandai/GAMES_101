const CopyPlugin = require('copy-webpack-plugin')
const { resolve } = require('path')
const path = require('path')

module.exports = {
    entry: {
        index: './src/main.ts',
    },

    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
        clean: true,
    },

    devServer: {
        static: {
            directory: resolve(__dirname, ''),
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },
                { from: 'src/main.html' },
            ],
        }),
    ],

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    target: 'web',
    mode: 'production',
}
