module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
