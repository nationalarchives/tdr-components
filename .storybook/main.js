/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "@whitespace/storybook-addon-html",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  staticDirs: ["../public", "../assets"],
  features: {
    interactionsDebugger: true,
    buildStoriesJson: true,
  },
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
  webpackFinal: (config) => {
    // Override browserslist settings here
    // config.target = ["web", "es5"];

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
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            additionalData: `
              @import "node_modules/govuk-frontend/govuk/base";
            `,
            implementation: require("sass"),
          },
        },
      ],
    });

    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
