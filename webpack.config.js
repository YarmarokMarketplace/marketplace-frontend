const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main-[contenthash:8].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader'
                    ,
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                },
                {
                    loader: 'ts-loader',
                }
                ]
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: ['@babel/preset-env', '@babel/preset-react'],
            //         },
            //     },
            // },
            {
                test: /\.(png)$/,
                use: [
                    { loader: 'file-loader' }
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })],
    devServer: {
        open: true
    }

}