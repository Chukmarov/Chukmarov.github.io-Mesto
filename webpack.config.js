const path =require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry:'./src/scripts/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'    
    },

    module:{
        rules: 
        [
            {
            test: /\.js$/, 
            use: { loader: "babel-loader" }, 
            exclude: /node_modules/ 
            },

             {
            test: /\.css$/, 
            use: [
                MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{
                            importLoaders: 2
                        }
                    },
                 'postcss-loader'
                ] 
            },

            {
            test: /\.(woff|woff2|ttf)$/,
            use:{
                loader: 'file-loader',
                    options: {
                        name:'./fonts/[name].[ext]'
                    },
                } 
            },

            {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            use: {
                loader: 'file-loader',
                options: {
                name: './images/[name].[ext]',
                        esModule: false //вот оно
                }
            }
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new WebpackMd5Hash()
    ]
}