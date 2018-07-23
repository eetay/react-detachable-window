var path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
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