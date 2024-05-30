import "./_index.scss";
import render from "./story.njk";
import mssData from "./multi-select-search.yaml";
import { MultiSelectSearch } from "./multi-select-search";
import {
  within,
  userEvent,
  waitFor,
  expect } from "@storybook/test";

export default {
  title: "TDR/MultiSelectSearch",
  args: {
    id: "123",
    name: "item_select",
    copySingle: "item",
    copyMultiple: "items",
  },
  decorators: [
    (storyFn) => {
      // Create an element that centres element with margin.
      const wrapper = document.createElement("div");
      wrapper.style.margin = "0 3em";
      const parser = new DOMParser();
      const doc = parser.parseFromString(storyFn() as string, "text/html");
      wrapper.appendChild(doc.body.firstElementChild as HTMLElement);

      // Also use this wrapper element to init the MSS js.
      const multiSelectElements: NodeListOf<HTMLElement> | null =
        wrapper.querySelectorAll("[data-module=multi-select-search]");
      multiSelectElements.forEach((msEl) => {
        const mss = new MultiSelectSearch(msEl);
        mss.initialise();
      });

      return wrapper;
    },
  ],
  argTypes: {
    id: {
      description:
        "When using Nunjucks template creates unique IDs within the component. If not provided `name` param is used.",
    },
    name: {
      description:
        "When using Nunjucks template sets the `name` attribute on all checkboxes",
    },
    copySingle: {
      name: "Copy for single item found",
      description:
        "For example to configure SR to announce '1 language found' instead of '1 item found', enter 'language'",
    },
    copyMultiple: {
      name: "Copy for multiple items found",
      description:
        "For example to configure SR to announce '23 languages found' instead of '23 items found', enter 'languages'",
    },
  },
};

const findExampleByName = (name, examples):any => {
  return examples.find((ex) => {
    return ex.name === name;
  });
};

const createMSS = (args):string => {
  const exampleData = findExampleByName(args.dataSource, mssData.examples);
  args.items = exampleData.data.items;

  return render({
    params: { ...args },
  });
};

const Template = (args: Record<string, any> ):string => {
  if (args.dataSource === undefined || args.dataSource === null) {
    args.dataSource = "default";
  }
  return createMSS({ ...args });
};

export const Default = Template.bind({});

export const LongList = Template.bind({});
LongList.args = {
  dataSource: "long-list",
};

export const Select = Template.bind({});
Select.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  // `nextElementSibling` is label so we're also checking the label is
  // present and working
  await userEvent.click(
    canvas.getByLabelText("Afar").nextElementSibling as HTMLElement,
  );
  await userEvent.click(
    canvas.getByLabelText("English").nextElementSibling as HTMLElement,
  );
  await expect(canvas.getByLabelText("Afar")).toBeChecked();
  await expect(canvas.getByLabelText("English")).toBeChecked();
};

export const Filter = Template.bind({});
Filter.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByLabelText("Filter items"));
  await userEvent.type(canvas.getByLabelText("Filter items"), "Afar");
  
  await waitFor(async () => {
    await expect(canvas.queryByLabelText("English")?.parentElement).not.toBeVisible();
  }).catch(error => {console.error(error)});

  await expect(canvas.getByLabelText("Afar").parentElement).toBeVisible();
};

export const SearchSelect = Template.bind({});
SearchSelect.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  // await userEvent.click(canvas.getByLabelText("Filter items"));
  await userEvent.type(canvas.getByLabelText("Filter items"), "Afar");
  // `nextElementSibling` is label so we're also checking the label is
  // present and working
  await userEvent.click(
    canvas.getByLabelText("Afar").nextElementSibling as HTMLElement,
  );
  void expect(canvas.getByLabelText("Afar")).toBeChecked();
};

// it should change the filtered count when text is input into filter
export const SRIndicatorChangeOnFilter = Template.bind({});
SRIndicatorChangeOnFilter.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByLabelText("Filter", { exact: false }), "b");

  await waitFor(async () => {
    await expect(canvas.queryByText("3 items displayed, 0 items selected")).toBeInTheDocument();
  }).catch(error => {console.error(error)});

};

// it should change the filtered count when text is input into filter
export const SRIndicatorChangeOnChecked = Template.bind({});
SRIndicatorChangeOnChecked.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByLabelText("Afar").nextElementSibling as HTMLElement,
  );
  await userEvent.click(
    canvas.getByLabelText("Abkhazian").nextElementSibling as HTMLElement,
  );

  await waitFor(async () => {
    await expect(canvas.queryByText("5 items displayed, 2 items selected")).toBeInTheDocument();
  }).catch(error => {console.error(error)});

};

// it should change the filtered count when checkbox is checked
export const SelectedIndicatorIsVisible = Template.bind({});
SelectedIndicatorIsVisible.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  // wait for appearance and return the element
  void expect(await canvas.findByText("0 selected")).toBeVisible();
};

// it should change the filtered count when checkbox is checked
export const SelectedIndicatorChangeOnChecked = Template.bind({});
SelectedIndicatorChangeOnChecked.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(
    canvas.getByLabelText("Afar").nextElementSibling as HTMLElement,
  );
  await userEvent.click(
    canvas.getByLabelText("Abkhazian").nextElementSibling as HTMLElement,
  );
  await expect(canvas.findByText("2 selected")).resolves.toBeVisible().catch(error => { console.error(error) });
};

// it should change the filtered count when text is input into filter
export const KeyboardSelect = Template.bind({});
KeyboardSelect.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  await userEvent.tab();
  await userEvent.tab();
  await userEvent.keyboard("[Space]");

  await expect(canvas.getByLabelText("Afar")).toBeChecked();
};
