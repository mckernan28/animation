const webpack = require("webpack");

const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');

module.exports = {
    entry: './script.js',
    output: {
        path:path.join(__dirname, "public"),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new DashboardPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 9000,
    }
};