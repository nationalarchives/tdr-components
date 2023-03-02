import "./_index.scss";
import render from "./story.njk";

export default {
  title: "TDR/Header",
  parameters: {
    layout: "fullscreen",
  },
  args: {
    showSignOut: false,
  },
  argTypes: {
    showSignOut: {
      description: "Is the header showing the sign-out link?",
    },
  },
};

const createCard = (args) => {
  return render({
    params: { ...args },
  });
};

const Template = ({ label, ...args }) => {
  return createCard({ label, ...args });
};

export const Default = Template.bind({});
export const SignedIn = Template.bind({});
SignedIn.args = {
  showSignOut: true,
};
