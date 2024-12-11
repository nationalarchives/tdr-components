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

// Add the required GOV.UK Frontend classes to the body
if (typeof window !== 'undefined' && document.body) {
  document.body.className +=
    ' js-enabled' +
    ('noModule' in HTMLScriptElement.prototype
      ? ' govuk-frontend-supported'
      : '');
}

export default preview;
