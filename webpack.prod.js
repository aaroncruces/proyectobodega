const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const webpack = require("webpack");

const PATHS = {
  src: path.join(__dirname, "src_client"),
};
module.exports = merge(common, {
  mode: "production",
  stats: { warnings: false },
  optimization: {
    sideEffects: false, //cuidado!
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist_client"),
    //Para React Router
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new webpack.DefinePlugin({
      WP_URL: '""',
    }),
  ],
});
