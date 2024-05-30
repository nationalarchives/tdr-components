import render from "./story.njk";
import { ButtonDisabled } from "./button-disabled";

export default {
  title: "TDR/Button (disabled)",
  args: {
    label: "Continue",
    reasonDisabled:
      "Your files are currently being checked. Once completed you can continue with your transfer",
  },
  decorators: [
    (storyFn) => {
      const wrapper = document.createElement("div");
      const parser = new DOMParser();
      const doc = parser.parseFromString(storyFn() as string, "text/html");
      wrapper.append(...doc.body.children);

      document.addEventListener(
        "DOMContentLoaded",
        (event) => {
          // new ButtonDisabled();
          console.log("Dom content loaded, init");
          const buttons = wrapper.querySelectorAll(
            '[data-tdr-module="button-disabled"]',
          );
          buttons.forEach((button) => {
            const buttonDisabled = new ButtonDisabled(button as HTMLElement);
            buttonDisabled.initialiseListeners();
          });
        },
        { once: true },
      );

      return wrapper;
    },
  ],
};

const createButton = (args):string => {
  return render({
    params: { ...args },
  });
};

const Template = ({ label, ...args }):string => {
  return createButton({ label, ...args });
};

export const Default = Template.bind({});
Default.args = {};
