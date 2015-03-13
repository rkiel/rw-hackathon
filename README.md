Create package.json

    npm init

Install application modules

    npm install react@0.12.1 --save
    npm install flux@2.0.1 --save
    npm install events@1.0.2 --save

Install development modules

    npm install webpack --save-dev
    npm install jsx-loader --save-dev

Configure webpack

    module.exports = {
      entry: "./app/App.js",
      output: {
        filename: "public/bundle.js"
      },
      module: {
        loaders: [
          {test: /\.js$/, loader: 'jsx-loader'}
        ]
      }
    };

