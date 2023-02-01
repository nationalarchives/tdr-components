import { NestedNavigation, InputType } from "../src/nationalarchives";
import { MultiSelectSearch } from "../src/nationalarchives";

window.onload = () => {
  const trees: NodeListOf<HTMLUListElement> =
    document.querySelectorAll("[role=tree]");
  trees.forEach((tree) => {
    const nestedNavigation = new NestedNavigation(tree);
    if (tree.hasAttribute("aria-multiselectable")) {
      nestedNavigation.initialiseFormListeners(InputType.checkboxes);
    } else {
      nestedNavigation.initialiseFormListeners(InputType.radios);
    }
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
