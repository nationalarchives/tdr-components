/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color|fill)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
