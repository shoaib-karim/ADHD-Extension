/* eslint-disable */
const { merge } = require("webpack-merge");
const DotenvPlugin = require("dotenv-webpack");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new DotenvPlugin({
      path: path.resolve(__dirname, "../.env.production"),
      silent: true,
    }),
    new DotenvPlugin({
      path: path.resolve(__dirname, "../.env"),
      silent: true,
    }),
  ],
});
