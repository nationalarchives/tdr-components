import "./_index.scss";
import render from "./story.njk";

export default {
  title: "TDR/Card",
  args: {
    error: false,
    copy: "This is a basic card.",
  },
  argTypes: {},
};

const createCard = (args):string => {
  return render({
    params: { ...args },
  });
};

const Template = ({ ...args }):string => {
  return createCard({ ...args });
};

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
};
