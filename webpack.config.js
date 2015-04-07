module.exports = {
  entry: {
    navbar:     "./app/Navbar.js",
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
