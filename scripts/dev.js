("use strict");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

const config = require("../config/webpack.development");

const PORT = process.env.PORT || 3000;
const NO_HOT_RELOAD = ["background", "content"];

for (let entry in config.entry) {
  if (!NO_HOT_RELOAD.includes(entry)) {
    config.entry[entry] = [
      "webpack/hot/dev-server",
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${PORT}`,
    ].concat(config.entry[entry]);
  }
}

const compiler = webpack(config);

const devServerConfig = {
  https: false,
  hot: true,
  client: false,
  host: "localhost",
  port: PORT,
  static: {
    directory: path.join(__dirname, "../build"),
  },
  devMiddleware: {
    publicPath: `http://localhost:${PORT}/`,
    writeToDisk: true,
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  allowedHosts: "all",
};

const server = new WebpackDevServer(devServerConfig, compiler);

server.startCallback(() => {
  console.log(`Dev server running on port ${PORT}`);
});