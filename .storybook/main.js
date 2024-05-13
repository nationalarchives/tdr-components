/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  typescript: {
    check: false,
    checkOptions: {},
    skipCompiler: false,
  },
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
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/nationalarchives/components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public", "../assets"],
  features: {
    interactionsDebugger: true,
    buildStoriesJson: true,
  },
};
export default config;
