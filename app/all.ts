import { NestedNavigation, InputType } from "../src/nationalarchives";
import { MultiSelectSearch } from "../src/nationalarchives";

window.onload = () => {
  const checkboxTrees: NodeListOf<HTMLUListElement> =
    document.querySelectorAll("#checkbox-tree");
  checkboxTrees.forEach((tree) => {
    const nestedNavigation = new NestedNavigation(tree);
    nestedNavigation.initialiseFormListeners(InputType.checkboxes);
  });

  const radioTrees: NodeListOf<HTMLUListElement> =
    document.querySelectorAll("#radio-tree");
  radioTrees.forEach((tree) => {
    const nestedNavigation = new NestedNavigation(tree);
    nestedNavigation.initialiseFormListeners(InputType.radios);
  });

  const multiSelects: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-module=multi-select-search]");
  if (multiSelects != null) {
    multiSelects.forEach((ms) => {
      const multiSelectSearch = new MultiSelectSearch(ms);
      multiSelectSearch.initialise();
    });
  }
};
