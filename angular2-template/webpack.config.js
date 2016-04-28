module.exports = {
  devtool: "eval-source-map",
  entry: "./app/index",
  output: {
    path: __dirname + "/app/app",
    publicPath: 'dist/',
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [
        {
            // Typescript loader
            test: /\.ts/, loaders: ['ts'], exclude: /node_modules/
        }
    ]
  },
  devServer: {
    // root folder to serve the app
    contentBase: './app',

    //Logging
    stats: {
        colors: true,
    },
  }
};
