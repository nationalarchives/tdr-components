// import "govuk-frontend/govuk/components/inset-text";
import "../icon/_index.scss";
import "./_index.scss";
import iconStory from "../icon/icon.stories";
import render from "./story.njk";

export default {
  title: "TDR/Alert",
  args: {
    alertType: "info",
    withIcon: false,
    headingText: "",
    bodyText:
      "Once uploaded, we will check your metadata for errors. There will be a chance to review and re-upload the metadata before completing the transfer.",
    headingSize: "l",
    iconType: "info",
  },
  argTypes: {
    iconType: {
      control: "select",
      options: [...iconStory.argTypes.iconType.options],
    },
    headingSize: { control: "select", options: { Large: "l", Small: "s" } },
    alertType: {
      control: "select",
      options: {
        Neutral: "default",
        Information: "info",
        Success: "success",
        Error: "error",
      },
    },
  },
};

console.log({ ...iconStory.argTypes.iconType });

const create = (args): string => {
  return render({
    test: "something",
    params: { ...args },
  });
};

const Template = ({ ...args }): string => {
  return create({ ...args });
};

export const Default = Template.bind({});

export const WithHeading = Template.bind({});
WithHeading.args = {
  alertType: "info",
  withIcon: false,
  headingSize: "l",
  headingText: "Leaving and returning to this transfer",
  bodyText:
    'You can leave this transfer and return to upload your metadata once you have completed your template. In progress transfers are accessible from the <a class="govuk-link" href="#">View Transfers</a> page.',
  iconType: "exit",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  alertType: "info",
  withIcon: true,
  headingSize: "l",
  headingText: "Leaving and returning to this transfer",
  bodyText:
    'You can leave this transfer and return to upload your metadata once you have completed your template. In progress transfers are accessible from the <a class="govuk-link" href="#">View Transfers</a> page.',
  iconType: "exit",
};

export const Neutral = Template.bind({});
Neutral.args = {
  alertType: "default",
  withIcon: true,
  headingSize: "l",
  headingText: "Your review is in progress",
  bodyText:
    "When the review is complete you will receive an email to <strong>jesse@ons.gov.uk</strong> with further instructions.",
  iconType: "search",
};

export const Error = Template.bind({});
Error.args = {
  alertType: "error",
  withIcon: true,
  headingSize: "l",
  headingText: "We found issues in your metadata",
  bodyText: "We have emailed guidance to <strong>jesse@ons.gov.uk</strong>",
  iconType: "warning",
};

export const Success = Template.bind({});
Success.args = {
  alertType: "success",
  withIcon: true,
  headingSize: "l",
  headingText: "You can now complete your transfer",
  bodyText:
    "The metadata you submitted has been reviewed and no issues were found.",
  iconType: "check",
};
