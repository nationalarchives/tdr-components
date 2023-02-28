// .storybook/test-runner.js
const { getStoryContext } = require("@storybook/test-runner");
const { injectAxe, checkA11y, configureAxe } = require("axe-playwright");
/*
 * See https://storybook.js.org/docs/react/writing-tests/test-runner#test-hook-api-experimental
 * to learn more about the test-runner hooks API.
 */
module.exports = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    // https://github.com/storybookjs/test-runner#getstorycontext
    // Get entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not test a11y for stories that disable a11y
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }

    // Apply story-level a11y rules
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });

    await checkA11y(page, "#root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};
