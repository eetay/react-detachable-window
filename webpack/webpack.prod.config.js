var path = require('path')
module.exports = {
  mode: 'production',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, '../src')
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
  },
  externals: {
    'react': 'commonjs react',
    'react-dom': 'commonjs react-dom'
  }
}