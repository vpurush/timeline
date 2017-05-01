var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html'
});

module.exports = {
    entry: __dirname + '/app/container/app.js',
    module:{
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?retainLines=true'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                loader: 'file-loader?name=/font/[name].[ext]'
            }
        ]
    },
    devtool: '#eval-source-map',
    output:{
        filename: 'transformed.js',
        path: __dirname + '/dist/',
        publicPath: 'http://localhost:8080/',
    },
    plugins: [HTMLWebpackPluginConfig],
    node: {
        fs: "empty"
    }
};