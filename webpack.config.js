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
            }
        ]
    },
    devtool: '#eval-source-map',
    output:{
        filename: 'transformed.js',
        path: __dirname + '/dist/'
    },
    plugins: [HTMLWebpackPluginConfig],
    node: {
        fs: "empty"
    }
};