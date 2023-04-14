import "./_index.scss";
import render from "./story.njk";
import { Header } from "govuk-frontend";

export default {
  title: "TDR/Header",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isSignedIn: false,
  },
  argTypes: {
    isSignedIn: {
      description: "Is the header showing the signed-in menu items?",
    },
  },
  decorators: [
    (storyFn) => {
      // Create an element that centres element with margin.
      const wrapper = document.createElement("div");
      wrapper.classList.add("js-enabled");
      const parser = new DOMParser();
      const doc = parser.parseFromString(storyFn(), "text/html");
      wrapper.append(...doc.body.children);

      var $header = wrapper.querySelector('[data-module="govuk-header"]');
      if ($header) {
        new Header($header).init();
      }

      return wrapper;
    },
  ],
};

const createHeader = (args) => {
  return render({
    params: { ...args },
  });
};

const Template = ({ label, ...args }) => {
  return createHeader({ label, ...args });
};

export const Default = Template.bind({});
export const SignedIn = Template.bind({});
SignedIn.args = {
  isSignedIn: true,
};

export const WithHiddenMenu = Template.bind({});
WithHiddenMenu.args = {
  isSignedIn: true,
  withHiddenMenu: true,
};
WithHiddenMenu.argTypes = {
  withHiddenMenu: {
    description:
      "If there is more than one menu item, use the hidden menu feature",
  },
};
