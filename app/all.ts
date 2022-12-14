import { NestedNavigation } from "../src/nationalarchives";
import { MultiSelectSearch } from "../src/nationalarchives";

window.onload = () => {
  const treeItems: NodeListOf<HTMLUListElement> =
    document.querySelectorAll("[role=tree]");
  const tree: HTMLUListElement | null = document.querySelector("[role=tree]");
  const treeItemList: HTMLUListElement[] = [];
  if (tree != null) {
    treeItems.forEach((item) => treeItemList.push(item));
    const nestedNavigation = new NestedNavigation(tree, treeItemList);
    nestedNavigation.initialiseFormListeners();
  }

  const multiSelects: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-module=multi-select-search]");
  if (multiSelects != null) {
    multiSelects.forEach((ms) => {
      const multiSelectSearch = new MultiSelectSearch(ms);
      multiSelectSearch.initialise();
    });
  }
};
