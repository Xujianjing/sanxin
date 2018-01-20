const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    'entry': {
        bundle: './main.js'
    },
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(woff|eot|svg|ttf)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    devServer: {
        port: 8080,
        open: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new ExtractTextPlugin({filename: 'css/[name].[hash:5].css', allChunks: true})
    ],
    devtool: 'eval-source-map'
};
