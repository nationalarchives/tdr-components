const path = require("path")
const fs = require("fs")

module.exports = {
  entry: "./app/all.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: { onlyCompileBundledFiles: true, transpileOnly: true }
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "public"),
  },
}
