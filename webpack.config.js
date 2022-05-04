const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')

const isDevelopment = process.env.NODE_ENV != 'production'

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'public'),
        hot: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bunble.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve('babel-loader'),
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [require.resolve('style-loader'), require.resolve('css-loader'), require.resolve('sass-loader')],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean)

}