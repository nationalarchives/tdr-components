export enum InputType {
  radios = "radios",
  checkboxes = "checkboxes",
}

export enum InputTypeHtmlAttrValue {
  radios = "radio",
  checkboxes = "checkbox",
}

export class NestedNavigation {
  private readonly tree: HTMLUListElement;
  private readonly treeItems: NodeListOf<HTMLElement>;
  private currentFocus: HTMLLIElement | null;
  private fileSelected: HTMLElement | null;
  private rememberExpanded: Boolean = false;

  constructor(tree: HTMLUListElement) {
    this.tree = tree;
    this.treeItems = this.tree.querySelectorAll("[role=treeitem]");
    this.currentFocus = null;
    this.rememberExpanded = tree.dataset.rememberExpanded == "true";
  }

  getCurrentFocus: () => HTMLLIElement | null = () => {
    return this.currentFocus;
  };

  getTree: () => HTMLUListElement = () => {
    return this.tree;
  };

  initialiseFormListeners: (inputType: InputType) => void = (inputType) => {
    if (this.tree !== null) {
      this.tree.addEventListener("keydown", (ev: Event) => {
        if (ev instanceof KeyboardEvent) {
          this.handleKeyDown(ev, inputType);
        }
      });
    }

    // Radio button directory expander icons don't need an explicit
    // click event listener because the whole li/row is a clickable expander.
    // A checkbox directory li/row has two functions, select and open so the
    // expander has to have it's own event listener for opening.
    const buttons = this.tree.querySelectorAll(
      `.js-tree__expander--${InputType.checkboxes}`
    );
    Array.from(buttons).forEach((expander, _, __) => {
      (expander as HTMLElement).addEventListener("click", (ev) => {
        let el: HTMLElement = ev.currentTarget as HTMLElement;
        if (el.id.includes("expander") === false) {
          el = el.previousElementSibling as HTMLElement;
        }
        this.handleExpanders(el, inputType);
        ev.preventDefault();
        ev.stopPropagation();
      });
    });

    // All nodes start open so need hiding on first load.
    this.tree.querySelectorAll('[role="group"]').forEach((value, _, __) => {
      if (value.id.includes(inputType)) {
        this.updateExpanded(value as HTMLInputElement, inputType);
      }
    });

    this.tree.querySelectorAll("[role=treeitem]").forEach((treeItem, _, __) => {
      // We do not want the radio buttons directories to be selectable.
      if (
        inputType == InputType.radios &&
        treeItem.id.includes("folder") === true
      )
        return;
      if (treeItem.id.includes(inputType)) {
        treeItem.addEventListener("click", (ev) => {
          if (
            ev.currentTarget instanceof HTMLLIElement &&
            !(ev.target instanceof HTMLLabelElement)
          ) {
            this.setSelected(ev.currentTarget, inputType);
            this.setFocusToItem(ev.currentTarget);
          }
          ev.stopImmediatePropagation();
        });
      }
    });

    // Hide all inputs from SR so that they don't conflict with
    // the tree role
    this.removeFocusFromInputs(inputType);

    // Set the first item as focusable
    const firstSelected: HTMLLIElement | null =
      this.tree.querySelector("[role=treeitem]");
    if (firstSelected) {
      firstSelected.tabIndex = 0;
      this.currentFocus = firstSelected;
    }
  };

  removeFocusFromInputs: (inputType: InputType) => void = (inputType) => {
    const inputs: NodeListOf<HTMLInputElement> = this.tree.querySelectorAll(
      `input[type=${InputTypeHtmlAttrValue[inputType]}]`
    );

    inputs.forEach((input) => {
      input.tabIndex = -1;
      input.setAttribute("aria-hidden", "true");
    });
  };

  updateFocus: (element?: HTMLLIElement | null) => void = (element) => {
    if (element != null) {
      this.setFocusToItem(element);
    } else {
      this.setFocusToItem(this.tree.firstElementChild as HTMLLIElement);
    }
  };

  updateExpanded: (value: HTMLInputElement, inputType: InputType) => void = (
    value,
    inputType
  ) => {
    const id = value.getAttribute("id");
    if (id !== null) {
      const expanded = this.getExpanded(inputType);
      if (!expanded.includes(id.replace("node-group", "list"))) {
        (value.parentNode as HTMLElement).setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  };

  getExpanded: (inputType: InputType) => string[] = (inputType) => {
    const storageItem = localStorage.getItem(`${inputType}-state`);
    if (storageItem !== null) {
      return JSON.parse(storageItem).expanded;
    } else {
      return [];
    }
  };

  allChildren: (
    ul: HTMLUListElement,
    elements: HTMLLIElement[]
  ) => HTMLLIElement[] = (ul, elements) => {
    for (let i = ul.children.length - 1; i >= 0; i--) {
      const item: HTMLLIElement | null = ul.children.item(
        i
      ) as HTMLLIElement | null;
      if (item !== null) {
        if (item.nodeName === "LI") {
          elements.push(item);
        }
        // If children include a UL/role=group then get children
        Array.from(item.children)
          .filter((el) => el.nodeName === "UL")
          .forEach((el) => this.allChildren(el as HTMLUListElement, elements));
      }
    }
    return elements;
  };

  toggleNode: (li: HTMLLIElement, id: string, inputType: InputType) => void = (
    li,
    id,
    inputType
  ) => {
    const expanded = this.getExpanded(inputType);

    if (li.getAttribute("aria-expanded") === "false") {
      // Expand
      li.setAttribute("aria-expanded", "true");
      expanded.push(id);
    } else {
      // Collapse
      li.setAttribute("aria-expanded", "false");
      expanded.splice(expanded.indexOf(id));
    }
    if (this.rememberExpanded == true)
      localStorage.setItem(`${inputType}-state`, JSON.stringify({ expanded }));
  };

  displaySelected: (filename: string) => void = (filename) => {
    this.fileSelected =
      this.fileSelected || document.getElementById(`${this.tree.id}-selected`);

    filename = filename === "" ? "No file selected" : filename;
    if (this.fileSelected != null) this.fileSelected.textContent = filename;
  };

  setSelected: (li: HTMLLIElement, inputType: InputType) => void = (
    li,
    inputType
  ) => {
    // If this is a radio directory do not select, toggle instead
    if (li.querySelectorAll("ul").length > 0 && inputType == InputType.radios) {
      this.toggleNode(li as HTMLLIElement, li.id, InputType.radios);
      return;
    }

    // Set the aria attribute and input
    const isSelected: boolean = li.getAttribute("aria-selected") === "true";
    li.setAttribute("aria-selected", !isSelected ? "true" : "false");
    const input = li.querySelector("input");
    if (input) input.checked = !isSelected;

    const label = li.querySelector("label");
    this.displaySelected(
      isSelected ? "" : (label!.firstChild?.textContent?.trim() as string)
    );

    // If checkbox then we need to deselect a mixed state
    if (inputType === InputType.checkboxes) {
      li.setAttribute("aria-checked", !isSelected ? "true" : "false");
    }

    // If radio directory and we're not deselecting a selected radio
    if (inputType === InputType.radios && !isSelected) {
      // For radio buttons, deselect all others
      this.tree.querySelectorAll("li[aria-selected=true]").forEach((el) => {
        if (el.id !== li.id) {
          el.setAttribute("aria-selected", "false");
          const input = el.querySelector("input");
          if (input) input.checked = false;
        }
      });
    }

    // Only traverse down and set parents for checkboxes
    if (inputType === InputType.checkboxes) {
      // If this is a node with children, traverse down
      if (li.querySelectorAll("ul").length > 0) {
        const childrenGroup: HTMLUListElement | null = document.querySelector(
          `#${inputType}-node-group-${li.id.replace(`${inputType}-list-`, "")}`
        );
        if (childrenGroup != null) {
          const children = this.allChildren(childrenGroup, []);
          for (const child of children) {
            child.setAttribute("aria-selected", !isSelected ? "true" : "false");
            child.setAttribute("aria-checked", !isSelected ? "true" : "false");
            const itemCheckbox = child.getElementsByTagName(
              "input"
            )[0] as HTMLInputElement;
            if (itemCheckbox) itemCheckbox.checked = !isSelected;
          }
        }
      }
      // Traverse up
      const parentGroup: HTMLUListElement | null = li.closest("[role=group]");
      this.setParentState(parentGroup);
    }
  };

  setParentState: (ul: HTMLUListElement | null) => void = (ul) => {
    // Gets all descendant checkboxes & sets UL parent checkbox accordingly
    if (ul !== null) {
      const all = this.allChildren(ul, []);
      const countChecked = all.filter(
        (a) => a.getAttribute("aria-selected") === "true"
      ).length;
      const parentLI: HTMLLIElement | undefined | null =
        ul.parentNode as HTMLLIElement;
      if (parentLI !== null) {
        if (ul.getAttribute("role") !== "tree") {
          if (countChecked > 0 && countChecked < all.length) {
            parentLI.setAttribute("aria-checked", "mixed");
          }
          // All children checked
          if (countChecked === all.length) {
            parentLI.setAttribute("aria-checked", "true");
            parentLI.setAttribute("aria-selected", "true");
          }
          // None checked
          if (countChecked === 0) {
            parentLI.setAttribute("aria-selected", "false");
            parentLI.setAttribute("aria-checked", "false");
          }
          const nextEl: HTMLUListElement | null | undefined =
            ul.parentElement?.closest("[role=group]");
          if (nextEl != null) {
            this.setParentState(nextEl);
          }
        }
      }
    }
  };

  setFocusToItem: (element?: HTMLLIElement | null) => void = (element) => {
    Array.from(this.treeItems).forEach((item) => {
      (item as HTMLElement).tabIndex = -1;
    });
    if (element != null) {
      element.tabIndex = 0;
      element.focus();
      this.currentFocus = element;
    }
  };

  setFocusToLastExpandedChild: (li: HTMLLIElement | null) => void = (li) => {
    // Does last child have children?
    if (li && li.getAttribute("aria-expanded") === "true") {
      const lastChild: HTMLLIElement | null = li.querySelector(
        ":scope > ul > li:last-child"
      );
      this.setFocusToLastExpandedChild(lastChild);
    } else if (li) {
      // Set to this li
      this.setFocusToItem(li);
    }
  };

  setFocusToPreviousItem: (input: HTMLLIElement | null) => void = (input) => {
    if (input != null) {
      const li: HTMLLIElement | null = input.closest("li");
      // Do you have a sibling
      if (li?.previousElementSibling != null) {
        this.setFocusToLastExpandedChild(
          li.previousElementSibling as HTMLLIElement
        );
      } else if (li?.parentElement != null) {
        // Go to parent
        this.setFocusToItem(li.parentElement.closest("li") as HTMLLIElement);
      }
    }
  };

  setFocusToNextParent: (ul: HTMLUListElement) => void = (ul) => {
    if (ul.getAttribute("role") != "tree") {
      const parent: HTMLLIElement = ul.closest("li") as HTMLLIElement;
      if (parent?.nextElementSibling != null) {
        this.setFocusToItem(parent.nextElementSibling as HTMLLIElement);
      } else {
        this.setFocusToNextParent(parent.parentElement as HTMLUListElement);
      }
    }
  };

  setFocusToNextItem: (input: HTMLLIElement | null) => void = (input) => {
    if (input != null) {
      const li: HTMLLIElement | null = input.closest("li");
      if (li !== null) {
        // Do you have a child
        if (li.getAttribute("aria-expanded") === "true") {
          // go to first child
          const firstChild: HTMLLIElement | null = li.querySelector("ul > li");
          if (firstChild !== null) {
            this.setFocusToItem(firstChild);
          }
        } else {
          // Do you have a sibling?
          if (li.nextElementSibling !== null) {
            // Go to next sibling
            this.setFocusToItem(li.nextElementSibling as HTMLLIElement);
          } else if (li.parentElement !== null) {
            // Go to parents next sibling
            this.setFocusToNextParent(li.parentElement as HTMLUListElement);
          }
        }
      }
    }
  };

  handleKeyDown: (ev: KeyboardEvent, inputType: InputType) => void = (
    ev,
    inputType
  ) => {
    let doPrevent = false;

    switch (ev.key) {
      case "Enter":
      case " ":
        // Check or uncheck checkbox
        this.setSelected(this.currentFocus as HTMLLIElement, inputType);
        this.setFocusToItem(this.currentFocus);
        doPrevent = true;
        break;

      case "ArrowUp":
        // Moves focus to the previous node that is focusable without opening or closing a node.
        this.setFocusToPreviousItem(this.currentFocus);
        doPrevent = true;
        break;

      case "ArrowDown":
        // Moves focus to the next node that is focusable without opening or closing a node.
        this.setFocusToNextItem(this.currentFocus);
        doPrevent = true;
        break;

      case "ArrowRight":
        this.processArrowRightEvent(ev, inputType);
        doPrevent = true;
        break;

      case "ArrowLeft":
        this.processArrowLeftEvent(ev, inputType);
        doPrevent = true;
        // When focus is on a closed `tree`, does nothing.
        break;

      case "Home":
        // Moves focus to the first node in the tree without opening or closing a node.
        this.setFocusToItem(this.tree.firstElementChild as HTMLLIElement);
        doPrevent = true;
        break;

      case "End": {
        this.processEndEvent(ev);
        doPrevent = true;
        break;
      }
      default:
        break;
    }

    if (doPrevent === true) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };

  private readonly processEndEvent: (ev: KeyboardEvent) => void = (ev) => {
    // Moves focus to the last node in the tree that is focusable without opening the node.
    let lastLi: HTMLLIElement | null = this.tree
      .lastElementChild as HTMLLIElement;
    while (lastLi?.getAttribute("aria-expanded") === "true") {
      lastLi = lastLi.lastElementChild?.lastElementChild as HTMLLIElement;
    }
    this.setFocusToItem(lastLi);
    ev.preventDefault();
  };

  private readonly processArrowLeftEvent: (
    ev: KeyboardEvent,
    inputType: InputType
  ) => void = (ev, inputType) => {
    if (this.currentFocus?.getAttribute("aria-expanded") === "true") {
      // When focus is on an open node, closes the node.
      this.toggleNode(this.currentFocus, this.currentFocus.id, inputType);
    } else if (this.currentFocus?.getAttribute("role") !== "tree") {
      // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
      const parent = this.currentFocus?.parentElement;
      if (parent != null) {
        this.setFocusToItem(parent.closest("li") as HTMLLIElement);
      }
    }
    ev.preventDefault();
  };

  private readonly processArrowRightEvent: (
    ev: KeyboardEvent,
    inputType: InputType
  ) => void = (ev, inputType) => {
    if (this.currentFocus?.getAttribute("aria-expanded") === "false") {
      // When focus is on a closed node, opens the node; focus does not move.
      this.toggleNode(this.currentFocus, this.currentFocus.id, inputType);
    } else if (this.currentFocus?.getAttribute("aria-expanded") === "true") {
      // When focus is on an open node, moves focus to the first child node.
      this.setFocusToNextItem(this.currentFocus);
    }
    // When focus is on an end node (a tree item with no children), does nothing.
    ev.preventDefault();
  };

  handleExpanders: (target: Element, inputType: InputType) => void = (
    target: Element,
    inputType
  ) => {
    const newId = target.id.replace("expander-", "node-group-");
    const nodeGroup: HTMLUListElement | null = this.tree.querySelector(
      `#${newId}`
    );

    if (nodeGroup !== null) {
      const parent: HTMLLIElement | null =
        nodeGroup.parentNode as HTMLLIElement;
      if (parent != null) {
        this.toggleNode(parent, target.id.replace("expander-", ""), inputType);
        this.setFocusToItem(parent);
      }
    }
  };
}
