const path =require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry:'./src/scripts/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'    
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
            use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader'] 
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
            test: /\.(img|jpg|jpeg|png|svg|webp)/,
            use:'file-loader?name=/images/[name].[ext]'
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}