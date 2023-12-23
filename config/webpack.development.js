const { merge } = require("webpack-merge");
const fs = require("fs-extra");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const DotenvPlugin = require("dotenv-webpack");

const appDirectory = fs.realpathSync(process.cwd());

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new DotenvPlugin({
      path: path.resolve(__dirname, "../.env.development"),
      silent: true,
    }),
    new DotenvPlugin({
      path: path.resolve(__dirname, "../.env"),
      silent: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: "./icons", to: "./icons" },
        { from: "./manifest.json" },
        ...(fs.existsSync(path.resolve(appDirectory, `src/content.css`)) ? [{from: "./src/content.css"}] : []),
        ...(fs.existsSync(path.resolve(appDirectory, `devtools.js`)) ? [{from: "./devtools.js"}] : []),
        ...(fs.pathExistsSync(path.resolve(appDirectory, "static")) ? [{from: "./static", to: "./static"}] : []),
      ]
    }),
  ],
  devtool: "cheap-module-source-map",
});
