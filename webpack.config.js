const webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: {
        content_script: path.join(__dirname, 'src/content_script.ts'),
        background: path.join(__dirname, 'src/background.ts')
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                exclude: /node_modules/,
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [

        // pack common vender files
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        // exclude locale files in moment
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // minify
        new webpack.optimize.UglifyJsPlugin()
    ]
};