import "./_index.scss";
import render from "./story.njk";
import { Header, ServiceNavigation } from "govuk-frontend";

export default {
  title: "TDR/Header",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    serviceName: "Transfer Digital Records",
    showSignIn: false,
  },
  argTypes: {
    showSignIn: {
      description: "Show or hide the 'Sign in' link",
    },
  },
  decorators: [
    (storyFn) => {
      // Create an element that centres element with margin.
      const wrapper = document.createElement("div");
      const parser = new DOMParser();
      const doc = parser.parseFromString(storyFn() as string, "text/html");
      wrapper.append(...doc.body.children);
      const header = wrapper.querySelector('[data-module="govuk-header"]');
      if (header !== null) {
        // Necessary because of the order in which decorators are
        // applied. If the timeout isn't present Header() will not
        // find any navigation items.
        setTimeout(() => {
          new Header(header);
        }, 0);
      }

      const serviceNavigation = wrapper.querySelector(
        '[data-module="govuk-service-navigation"]',
      );
      if (serviceNavigation !== null) {
        // Necessary because of the order in which decorators are
        // applied. If the timeout isn't present Header() will not
        // find any navigation items.
        setTimeout(() => {
          new ServiceNavigation(serviceNavigation);
          // createAll(ServiceNavigation, undefined, serviceNavigation)
        }, 0);
      }

      return wrapper;
    },
  ],
};

const createHeader = (args): string => {
  return render({
    params: { ...args },
  });
};

const Template = ({ label, ...args }): string => {
  return createHeader({ label, ...args });
};

export const Default = Template.bind({});
export const SignInOnly = Template.bind({});
SignInOnly.args = {
  showSignIn: true,
};

export const WithMenuItemsInMainHeader = Template.bind({});

WithMenuItemsInMainHeader.args = {
  showSignIn: true,
  showMenu: true,
  menuItems: ["Account", "Transfers"], // Default list of values
};

WithMenuItemsInMainHeader.argTypes = {
  menuItems: {
    description:
      "If there is any menu items, we hide the menu on smaller viewports",
    control: "array",
  },
};

export const WithExtraServiceMenu = Template.bind({});

WithExtraServiceMenu.args = {
  showSignIn: true,
  showMenu: false,
  showExtraServiceMenu: true,
  menuItems: ["Account", "Transfers", "Guidance"], // Default list of values
};
