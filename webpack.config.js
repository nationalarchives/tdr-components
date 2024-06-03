const path = require("path");

module.exports = {
  entry: "./src/nationalarchives/index.ts",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.json", // Use tsconfig.json for TypeScript compilation options
          onlyCompileBundledFiles: true, // Only compile files referenced by the entry file
        },
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "package", "dist")
  },
};
