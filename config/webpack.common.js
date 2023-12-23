/* eslint-disable */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const usingTypescript = fs.existsSync(path.resolve(appDirectory, "tsconfig.json"));

const fileExtensions = [".js", ".ts", ".tsx", ".jsx"];

const fileExists = (pathName, fileName) => {
  const extension = fileExtensions.find((ext) =>
    fs.existsSync(path.resolve(appDirectory, `${pathName}${fileName}${ext}`))
  );

  return extension;
};

const resolveEntry = (pathName, fileName) => {
  const extension = fileExists(pathName, fileName);

  // Fallback to index.js
  return extension
    ? path.resolve(appDirectory, `${pathName}${fileName}${extension}`)
    : path.resolve(appDirectory, `${pathName}${fileName}.js`);
};

const requiresPostcss = fs.existsSync(path.resolve(appDirectory, "postcss.config.js"));

module.exports = {
  entry: {
    main: resolveEntry("src/", "index"),
    ...(fs.pathExistsSync(path.resolve(appDirectory, "background"))
      ? { background: resolveEntry("background/", "index") }
      : {}),
    ...(fileExists("src/", "content") ? { content: resolveEntry("src/", "content") } : {}),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../", "build"),
    clean: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../", "public", "index.html"),
      filename: "index.html",
      chunks: ["main"],
      cache: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        exclude: [path.resolve(__dirname, "../", "background")],
        use: ["style-loader", "css-loader", ...(requiresPostcss ? ["postcss-loader"] : [])],
      },
      {
        test: /\.svg$/,
        exclude: [path.resolve(__dirname, "../", "background")],
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: [path.resolve(__dirname, "../", "background")],
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: fileExtensions.filter((ext) => usingTypescript || !ext.includes("ts")),
  },
};
