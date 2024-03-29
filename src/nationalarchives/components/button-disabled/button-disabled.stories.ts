import render from "./story.njk";
import { ButtonDisabled } from "./button-disabled";

export default {
  title: "TDR/Button (disabled)",
  args: {
    label: "Continue",
    reasonDisabled: "Your files are currently being checked. Once completed you can continue with your transfer"
  },
  decorators: [
    (storyFn) => {
      const wrapper = document.createElement("div");
      const parser = new DOMParser();
      const doc = parser.parseFromString(storyFn(), "text/html");
      wrapper.append(...doc.body.children);

      document.addEventListener("DOMContentLoaded", (event) => {
        const buttons : NodeListOf<HTMLElement> = wrapper.querySelectorAll('[data-tdr-module="button-disabled"]')
        buttons.forEach((button)=>{
          const buttonDisabled = new ButtonDisabled(button);
          buttonDisabled.initialiseListeners();
        })
      }, { once : true });

      return wrapper;
    },
  ]
};

const createButton = (args) => {
  return render({
    params: { ...args },
  });
};

const Template = ({ label, ...args }) => {
  return createButton({ label, ...args });
};

export const Default = Template.bind({});
Default.args = {
};
