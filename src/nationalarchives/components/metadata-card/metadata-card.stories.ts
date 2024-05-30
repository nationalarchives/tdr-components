import "../card/_index.scss";
import render from "./story.njk";
import { within, userEvent , expect } from "@storybook/test";

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

const createCard = (args):string => {
  return render({
    params: { ...args },
  });
};

const Template = ({ ...args }):string  => {
  return createCard({ ...args });
};

// Function to emulate pausing between interactions
async function sleep(ms: number): Promise<void>  {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = {
  error: true,
  metadataState: "incomplete",
};

const open = async (canvas): Promise<void> => {
  await userEvent.click(
    canvas.getByText("What descriptive metadata you can provide") as Element
  );
  await sleep(1000);
  await expect(canvas.getByText("Description")).toBeVisible();
  await expect(canvas.getByText("Date of the record")).toBeVisible();
  await expect(canvas.getByText("Language")).toBeVisible();
};

export const OpenDetails = Template.bind({});
OpenDetails.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  await open(canvas);
};

export const OpenAndClosedDetails = Template.bind({});
OpenAndClosedDetails.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  await open(canvas);

  await userEvent.click(
    canvas.getByText("What descriptive metadata you can provide"),
  );

  await expect(canvas.getByText("Description")).not.toBeVisible();
  await expect(canvas.getByText("Date of the record")).not.toBeVisible();
  await expect(canvas.getByText("Language")).not.toBeVisible();
};
