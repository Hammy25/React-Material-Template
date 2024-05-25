const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Defining usesfull variables
// Get the directory of the app
const appDirectory = __dirname;

// Function for getting absolute path
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Enviroment host name
const host = process.env.HOST || "localhost";

// Required for babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    // Serve index.html as the base
    static: resolveAppPath("public"),
    // Enable compression
    compress: true,
    // Enable hot reloading
    hot: true,
    host,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath("public/index.html"),
      title: "Development",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});
