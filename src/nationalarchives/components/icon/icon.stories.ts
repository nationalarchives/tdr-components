import "./_index.scss";
import render from "./story.njk";

export default {
  title: "TDR/Icon",
  args: {
    iconType: "cross",
    iconSize: "xl",
    fill: "#174E75",
  },
  argTypes: {
    iconType: {
      control: "select",
      options: [
        "cross",
        "check",
        "chevron",
        "download",
        "exit",
        "external-link",
        "info",
        "lock",
        "person",
        "quote",
        "search",
        "warning",
      ],
    },
    iconSize: {
      control: "select",
      options: {
        Small: "s",
        Medium: "m",
        Large: "l",
        "X Large": "xl",
        "XX Large": "xxl",
        "XXX Large": "xxxl",
      },
    },
  },
};

const createCard = (args): string => {
  return render({
    params: { ...args },
  });
};

const Template = ({ ...args }): string => {
  return createCard({ ...args });
};

export const Default = Template.bind({});
