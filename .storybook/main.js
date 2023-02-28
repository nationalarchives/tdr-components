const path = require("path");

module.exports = {
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.njk$/,
      use: "simple-nunjucks-loader",
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "yaml-loader",
    });

    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });

    return config;
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/nationalarchives/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/html",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  features: {
    interactionsDebugger: true,
    buildStoriesJson: true,
  },
  staticDirs: ["../public"],
};
