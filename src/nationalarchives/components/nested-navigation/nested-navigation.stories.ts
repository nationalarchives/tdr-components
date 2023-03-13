import "./_index.scss";
import render from "./story.njk";
import treeData from "./nested-navigation.yaml";
import { NestedNavigation, InputType } from "./nested-navigation";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "TDR/Tree View",
  args: {},
  decorators: [
    (storyFn) => {
      // Create an element that centres element with margin.
      const wrapper = document.createElement("div");
      wrapper.style.margin = "0 3em";
      const parser = new DOMParser();
      const doc = parser.parseFromString(storyFn(), "text/html");
      wrapper.appendChild(doc.body.firstElementChild as HTMLElement);

      // Also use this wrapper element to init the MSS js.
      const trees: NodeListOf<HTMLUListElement> =
        wrapper.querySelectorAll("[role=tree]");
      trees.forEach((tree) => {
        const nestedNavigation = new NestedNavigation(tree);
        if (tree.hasAttribute("aria-multiselectable")) {
          nestedNavigation.initialiseFormListeners(InputType.checkboxes);
        } else {
          nestedNavigation.initialiseFormListeners(InputType.radios);
        }
      });

      return wrapper;
    },
  ],
  argTypes: {
    dataSource: {
      options: ["default", "No folders"],
      control: { type: "radio" },
    },
    inputType: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

const findExampleByName = (name, examples) => {
  return examples.find((ex) => {
    return ex.name == name;
  });
};

const createTree = (args) => {
  const exampleData = findExampleByName(args.dataSource, treeData.examples);
  return render({
    params: {
      items: exampleData.data.items,
      inputType: args.inputType || "checkbox",
    },
  });
};

const Template = ({ ...args }) => {
  if (!args.dataSource) args.dataSource = "default";
  return createTree({ ...args });
};

export const SingleSelectExample = Template.bind({});
SingleSelectExample.args = {
  inputType: "radio",
};
SingleSelectExample.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // should load the page with the directories collapsed, i.e. children invisible
  await expect(canvas.getByText("Vanilla cake.xlsx")).not.toBeVisible();

  // should load the page with root elements visible
  await expect(canvas.getByText("Baking-powder Nov 1999.docx")).toBeVisible();
};

export const ExpandNodeAndFocus = Template.bind({});
ExpandNodeAndFocus.args = {
  inputType: "radio",
};
// should expand the node when the expander is clicked
ExpandNodeAndFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getAllByText("Expand")[0]);

  await expect(canvas.getByText("Vanilla cake.xlsx")).toBeVisible();

  await expect(
    canvas.getByRole("treeitem", { name: /Old recipes/ })
  ).toHaveFocus();
};

export const SelectInputAndFocus = Template.bind({});
SelectInputAndFocus.args = {
  inputType: "radio",
};
SelectInputAndFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Click label
  await userEvent.click(canvas.getByText("Baking-powder Nov 1999.docx"));

  await expect(
    canvas.getByLabelText("Baking-powder Nov 1999.docx")
  ).toHaveFocus();
};

export const SelectTreeItemAndFocus = Template.bind({});
SelectTreeItemAndFocus.args = {
  inputType: "radio",
};
SelectTreeItemAndFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Click label
  await userEvent.click(
    canvas.getByRole("treeitem", { name: /Baking-powder Nov 2020/ })
  );

  await expect(
    canvas.getByRole("treeitem", { name: /Baking-powder Nov 2020/ })
  ).toHaveFocus();
};

export const ExpandSelectAndFocus = Template.bind({});
ExpandSelectAndFocus.args = {
  inputType: "radio",
};
// should expand the node when the expander is clicked
ExpandSelectAndFocus.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getAllByText("Expand")[0]);

  await userEvent.click(canvas.getByLabelText("Vanilla cake.xlsx"));

  await expect(
    canvas.getByRole("treeitem", { name: "Vanilla cake.xlsx" })
  ).toHaveFocus();
};

export const MultipleSelectExample = Template.bind({});
MultipleSelectExample.args = {
  inputType: "checkbox",
};

export const MultipleSelectChildSetsParentToIndeterminate = Template.bind({});
MultipleSelectChildSetsParentToIndeterminate.args = {
  inputType: "checkbox",
};
MultipleSelectChildSetsParentToIndeterminate.play = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);

  // Expand arrow for Cupcakes
  await userEvent.click(canvas.getAllByText("Expand")[3]);
  // Expand arrow for Non dairy
  await userEvent.click(canvas.getAllByText("Expand")[4]);

  await userEvent.click(canvas.getByText("Coffee and walnut.gif"));

  // Cannot run a test on indeterminate states because we're using
  // aria-checked incorrectly. It needs to be on the checkbox not the
  // parent tree element.
  // await expect(
  //   canvas.getByRole("treeitem", { name: /^Non dairy/ })
  // ).toBePartiallyChecked();
  // await expect(
  //   canvas.getByRole("treeitem", { name: /^Cupcakes/ })
  // ).toBePartiallyChecked();
};

//  should select the last child when end is pressed on the expanded root node
export const MultipleSelectParentSelectsAllChildren = Template.bind({});
MultipleSelectParentSelectsAllChildren.args = {
  inputType: "checkbox",
};
MultipleSelectParentSelectsAllChildren.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Expand arrow for Cupcakes
  await userEvent.click(canvas.getAllByText("Expand")[3]);
  // Expand arrow for Non dairy
  await userEvent.click(canvas.getAllByText("Expand")[4]);
  await userEvent.click(canvas.getByText("Cupcakes") as Element);

  await expect(canvas.getByLabelText("Red velvet.pptx")).toBeChecked();
  await expect(canvas.getByLabelText("Non dairy")).toBeChecked();
  await expect(canvas.getByLabelText("Carrot cake.pptx")).toBeChecked();
  await expect(canvas.getByLabelText("Vegan banana.png")).toBeChecked();
  await expect(
    canvas.getByLabelText("Lemon and poppyseed gf.json")
  ).toBeChecked();
  await expect(canvas.getByLabelText("Coffee and walnut.gif")).toBeChecked();
};

// should expand the node when the right arrow is pressed on the closed parent node
export const KeyboardNavigateDown = Template.bind({});
KeyboardNavigateDown.args = {
  inputType: "radio",
};
// should expand the node when the expander is clicked
KeyboardNavigateDown.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.tab();
  await userEvent.keyboard("[ArrowDown]");

  await expect(
    canvas.getByRole("treeitem", { name: "Baking-powder Nov 1999.docx" })
  ).toHaveFocus();
};

// should expand the node when the right arrow is pressed on the closed parent node
export const KeyboardNavigateSelect = Template.bind({});
KeyboardNavigateSelect.args = {
  inputType: "radio",
};
// should expand the node when the expander is clicked
KeyboardNavigateSelect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.tab();
  await userEvent.keyboard("[ArrowDown]");
  await userEvent.keyboard("[Space]");

  await expect(
    canvas.getByRole("treeitem", { name: "Baking-powder Nov 1999.docx" })
  ).toBeChecked();
};

// should expand the node when the right arrow is pressed on the closed parent node
export const KeyboardNavigateSelectAndDeselect = Template.bind({});
KeyboardNavigateSelectAndDeselect.args = {
  inputType: "radio",
};
// should expand the node when the expander is clicked
KeyboardNavigateSelectAndDeselect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.tab();
  await userEvent.keyboard("[ArrowDown]");
  await userEvent.keyboard("[Space]");

  await expect(
    canvas.getByRole("treeitem", { name: "Baking-powder Nov 1999.docx" })
  ).toBeChecked();

  await userEvent.keyboard("[Enter]");

  await expect(
    canvas.getByRole("treeitem", { name: "Baking-powder Nov 1999.docx" })
  ).not.toBeChecked();
};

// // should expand the node when the right arrow is pressed on the closed parent node
export const KeyboardNavigateOpenWithRightArrow = Template.bind({});
KeyboardNavigateOpenWithRightArrow.args = {
  inputType: "radio",
};
KeyboardNavigateOpenWithRightArrow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.tab();
  await userEvent.keyboard("[ArrowDown]");
  await userEvent.keyboard("[ArrowDown]");
  await userEvent.keyboard("[ArrowDown]");
  await userEvent.keyboard("[ArrowRight]");

  await expect(
    canvas.getByRole("treeitem", { name: "Mixing.xlsx" })
  ).toBeVisible();
};

// should select the first child when the right arrow is pressed on the expanded parent node
export const KeyboardNavigateMoveDownWithRightArrow = Template.bind({});
KeyboardNavigateMoveDownWithRightArrow.args = {
  inputType: "radio",
};
KeyboardNavigateMoveDownWithRightArrow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(
    canvas.getByText("Cake Basics").parentElement as Element
  );

  await userEvent.keyboard("[ArrowRight]");

  await expect(
    canvas.getByRole("treeitem", { name: "Mixing.xlsx" })
  ).toHaveFocus();
};

// should select the first child when the right arrow is pressed on the expanded parent node
export const KeyboardNavigateMoveUpWithLeftArrow = Template.bind({});
KeyboardNavigateMoveUpWithLeftArrow.args = {
  inputType: "radio",
};
KeyboardNavigateMoveUpWithLeftArrow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText("Cake Basics"));
  await userEvent.click(canvas.getByText("Mixing.xlsx"));
  await userEvent.keyboard("[ArrowLeft]");

  await expect(
    canvas.getByRole("treeitem", { name: /Cake Basics/ })
  ).toHaveFocus();
};

// should select the first child when the right arrow is pressed on the expanded parent node
export const KeyboardNavigateCloseWithLeftArrow = Template.bind({});
KeyboardNavigateCloseWithLeftArrow.args = {
  inputType: "radio",
};
KeyboardNavigateCloseWithLeftArrow.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText("Cake Basics"));
  await userEvent.keyboard("[ArrowLeft]");

  await expect(canvas.getByText("Mixing.xlsx")).not.toBeVisible();
};

//  should select the last child when end is pressed on the expanded root node
export const KeyboardNavigateToEnd = Template.bind({});
KeyboardNavigateToEnd.args = {
  inputType: "radio",
};
KeyboardNavigateToEnd.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText("Cupcakes"));
  await userEvent.keyboard("[End]");

  await expect(
    canvas.getByRole("treeitem", { name: "Carrot cake.pptx" })
  ).toHaveFocus();
};

//  should select the last child when end is pressed on the expanded root node
export const KeyboardNavigateToHome = Template.bind({});
KeyboardNavigateToHome.args = {
  inputType: "radio",
};
KeyboardNavigateToHome.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText("Cupcakes"));
  await userEvent.click(
    canvas.getByRole("treeitem", { name: "Carrot cake.pptx" })
  );
  await userEvent.keyboard("[Home]");

  await expect(
    canvas.getByRole("treeitem", { name: /Old recipes/ })
  ).toHaveFocus();
};
