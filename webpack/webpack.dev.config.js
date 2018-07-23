var path = require('path')
module.exports = {
  mode: 'development',
  entry: [
    './examples/src/index.js'
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js'
    //libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../examples/src')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1'],
        plugins: ['transform-class-properties']
      }
    },{
      test: /\.(scss|css)$/,
      loaders: ['style-loader', 'css-loader?modules=true&camelCase=true']
    }]
  },/*
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom'
  },*/
  devServer: {
    contentBase: path.join(__dirname,'../examples/src'),
    host: '127.0.0.1',
    port: 8080
  }
}