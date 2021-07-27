const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    home: "./src_client/index.tsx",
    //vendor: ["./src_client/vendor.ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src_client/index.html",
      favicon: "./src_client/styling/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
              configFile: path.resolve(__dirname, "tsconfig.cliente.json"),
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
  },
  //Para React Router
  devServer: {
    historyApiFallback: true,
  },
};
