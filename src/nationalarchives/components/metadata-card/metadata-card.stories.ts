import "../card/_index.scss";
import render from "./story.njk";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";

export default {
  title: "TDR/MetadataCard",
  args: {
    error: false,
    metadataState: "Not entered",
  },
  argTypes: {
    metadataState: {
      options: ["Not entered", "Entered", "Incomplete"],
      control: { type: "radio" },
    },
  },
};

const createCard = (args) => {
  return render({
    params: { ...args },
  });
};

const Template = ({ ...args }) => {
  return createCard({ ...args });
};

// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
  metadataState: "incomplete",
};

const open = async (canvas) => {
  await userEvent.click(
    canvas.getByText("What descriptive metadata you can provide"),
  );
  await sleep(1000);
  await expect(canvas.getByText("Description")).toBeVisible();
  await expect(canvas.getByText("Date of the record")).toBeVisible();
  await expect(canvas.getByText("Language")).toBeVisible();
};

export const OpenDetails = Template.bind({});
OpenDetails.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  open(canvas);
};

export const OpenAndClosedDetails = Template.bind({});
OpenAndClosedDetails.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await open(canvas);

  await userEvent.click(
    canvas.getByText("What descriptive metadata you can provide"),
  );

  await expect(canvas.getByText("Description")).not.toBeVisible();
  await expect(canvas.getByText("Date of the record")).not.toBeVisible();
  await expect(canvas.getByText("Language")).not.toBeVisible();
};
