import { NestedNavigation, InputType } from "../src/nationalarchives";
import { MultiSelectSearch } from "../src/nationalarchives";

window.onload = () => {
  const checkboxTreeItems: NodeListOf<HTMLUListElement> =
    document.querySelectorAll("#checkbox-tree");
  const checkboxTree: HTMLUListElement | null =
    document.querySelector("#checkbox-tree");
  const treeItemList: HTMLUListElement[] = [];
  if (checkboxTree != null) {
    checkboxTreeItems.forEach((item) => treeItemList.push(item));
    const nestedNavigation = new NestedNavigation(checkboxTree, treeItemList);

    nestedNavigation.initialiseFormListeners(InputType.checkboxes);
  }

  const radioTreeItems: NodeListOf<HTMLUListElement> =
    document.querySelectorAll("#radio-tree");
  const radioTree: HTMLUListElement | null =
    document.querySelector("#radio-tree");
  const radioTreeItemList: HTMLUListElement[] = [];
  if (radioTree != null) {
    radioTreeItems.forEach((item) => radioTreeItemList.push(item));
    const nestedNavigation = new NestedNavigation(radioTree, radioTreeItemList);

    nestedNavigation.initialiseFormListeners(InputType.radios);

  const multiSelects: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-module=multi-select-search]");
  if (multiSelects != null) {
    multiSelects.forEach((ms) => {
      const multiSelectSearch = new MultiSelectSearch(ms);
      multiSelectSearch.initialise();
    });
  }
};
