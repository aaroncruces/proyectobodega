const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpack = require("webpack");
module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/dev"),
    //Para React Router
    publicPath: "/",
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      WP_URL: '"http://localhost:5000"',
    }),
  ],
});
