module.exports = {
  entry: {
    timesheet:  "./app/Timesheet.js",
    basketball: "./app/basketball/App.js"
  },
  output: {
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'jsx-loader'}
    ]
  }
};
