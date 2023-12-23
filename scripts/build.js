("use strict");

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const webpack = require("webpack");

const config = require("../config/webpack.production");

const compiler = webpack(config);

console.log(chalk.bold("Compiling production version of extension\n"));
console.log("...Building React application");

compiler.run(async (err, stats) => {
  let hadErrors = false;
  if (err) {
    console.log(chalk.red("An error occured while creating the production build:\n"));
    console.error(err);
    hadErrors = true;
  } else if (stats.hasErrors()) {
    const statsJson = stats.toJson();
    console.log(chalk.red("An error occured while creating the production build:\n"));
    statsJson.errors.forEach((error) => {
      console.error(error.message);
    });
    hadErrors = true;
  } else {
    console.log("Finished building!\n");
    console.log("...Copying extension files");
    // If it succeeded, finish the rest of the prep
    await fs.promises.copyFile(
      path.join(__dirname, "../manifest.json"),
      path.join(__dirname, "../build/manifest.json")
    );
    await fs.copy(path.join(__dirname, "../icons"), path.join(__dirname, "../build/icons"));
    if (fs.existsSync(path.resolve(__dirname, `../src/content.css`))) {
      await fs.promises.copyFile(
        path.join(__dirname, "../src/content.css"),
        path.join(__dirname, "../build/content.css")
      );
    }
    if (fs.existsSync(path.resolve(__dirname, `../devtools.js`))) {
      await fs.promises.copyFile(
        path.join(__dirname, "../devtools.js"),
        path.join(__dirname, "../build/devtools.js")
      );
    }
    if (fs.pathExistsSync(path.resolve(__dirname, "../static"))) {
      await fs.copy(path.join(__dirname, "../static"), path.join(__dirname, "../build/static"));
    }
    console.log("Finished copying extension files!\n");
  }

  compiler.close((closeErr) => {
    if (closeErr) {
      console.log(chalk.red("An error occured while trying to close the webpack compiler."));
      console.log(closeErr);
      return;
    }

    if (!hadErrors) {
      console.log(chalk.green("Production version of extension is ready!"));
    }
  });
});
