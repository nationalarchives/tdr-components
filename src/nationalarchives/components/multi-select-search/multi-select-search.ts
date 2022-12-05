type MutliSelectConfig = {
  filter: {
    textSelected?: string;
    textSingle?: string;
    textMultiple?: string;
  };
};

export class MultiSelectSearch {
  private readonly container: HTMLElement;
  private readonly list: HTMLElement;
  private readonly inputs: NodeListOf<HTMLInputElement>;
  private readonly filter: HTMLInputElement;
  private readonly filterCount: HTMLElement;
  private readonly selectedCount: HTMLElement;
  private config: MutliSelectConfig;

  private timeoutId: number;
  private labels: string[];
  private visibleItems: number[];

  constructor(rootElement: HTMLElement) {
    this.container = rootElement.querySelector(".js-container") as HTMLElement;
    this.list = rootElement.querySelector("ul") as HTMLElement;
    this.inputs = rootElement.querySelectorAll("input[type=checkbox]");
    this.filter = rootElement.querySelector(".js-filter") as HTMLInputElement;
    this.filterCount = rootElement.querySelector(
      ".js-filter-count"
    ) as HTMLElement;
    this.selectedCount = rootElement.querySelector(
      ".js-selected-count"
    ) as HTMLElement;

    this.labels = [];
    for (let i = 0; i < this.list.children.length; i++) {
      this.labels.push(
        this.cleanString(this.list.children[i].textContent || "")
      );
    }
  }

  initialise: (config?: MutliSelectConfig) => void = (config) => {
    this.config = Object.assign({}, config, {
      filter: {
        textSelected: "selected",
        textSingle: "displayed",
        textMultiple: "displayed",
      },
    });

    this.filter.addEventListener("keyup", (ev: Event) => {
      if (ev instanceof KeyboardEvent) {
        this.handleKeyUp(ev);
      }
    });

    // Attach listener to update checked count
    this.list.addEventListener("change", () => {
      this.updateSelectedCount();
      this.updateFilteredCount();
    });

    this.updateSelectedCount();
    this.updateFilteredCount();

    // Will not use for now because it requires using
    // inline styles for setting up height.
    // this.setupHeight();
  };

  handleKeyUp: (ev: KeyboardEvent) => void = (ev) => {
    ev.stopPropagation();
    if (ev.key !== "Enter") {
      clearTimeout(this.timeoutId);
      this.timeoutId = window.setTimeout(() => {
        this.filterItems();
        this.updateFilteredCount();
      }, 300);
    } else {
      ev.preventDefault(); // prevents forms from being submitted when user presses ENTER
    }
  };

  cleanString: (searchText: string) => string = (searchText) => {
    searchText = searchText.replace(/&/g, "and");
    searchText = searchText.replace(/[’',:–-]/g, ""); // remove punctuation characters
    searchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape special characters
    return searchText.trim().replace(/\s\s+/g, " ").toLowerCase(); // replace multiple spaces with one
  };

  filterItems: (ev?: Event) => void = (ev) => {
    const filterBy = this.cleanString(this.filter.value);
    const visibleItems = this.getSelectedItems();

    let i = 0;
    for (i = 0; i < this.list.children.length; i++) {
      // If found by filter.
      if (this.labels[i].search(filterBy) !== -1) {
        visibleItems.push(i);
      }
    }

    // Hide all
    for (i = 0; i < this.list.children.length; i++) {
      (this.list.children[i] as HTMLElement).classList.add("is-hidden");
    }

    // Show checked and found by filter
    for (i = 0; i < visibleItems.length; i++) {
      (this.list.children[visibleItems[i]] as HTMLElement).classList.remove(
        "is-hidden"
      );
    }
  };
  /*
   * Updates a visible element with the amount of checked items
   */
  updateSelectedCount: () => void = () => {
    this.getSelectedItems();
    if (this.selectedCount)
      this.selectedCount.textContent = `${
        this.getSelectedItems().length
      } selected`;
  };

  /*
   * Updates a hidden/screen reader span with the amount of displayed and checked items
   */
  updateFilteredCount: () => void = () => {
    const numChecked: number = this.getSelectedItems().length;
    const numVisible: number = this.getVisibleItems().length;

    const singleMultipleString =
      numVisible === 1
        ? this.config.filter.textSingle
        : this.config.filter.textMultiple;

    const output = `${numVisible} ${singleMultipleString}, ${numChecked} ${this.config.filter.textSelected}`;

    this.filterCount.innerHTML = output;
  };

  getAbsoluteHeight: (el: HTMLElement) => number = (el) => {
    const styles: CSSStyleDeclaration = window.getComputedStyle(el);
    const margin =
      parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

    return Math.ceil(el.offsetHeight + margin);
  };

  setupHeight: () => void = () => {
    const containerHeight: number = this.container.clientHeight;
    const listHeight: number = this.getAbsoluteHeight(this.list);

    // Resize if the list is only slightly bigger than its container
    if (listHeight < containerHeight + 50) {
      this.container.style.height = listHeight + "px";
      return;
    }

    // Resize to cut last item cleanly in half
    const visibleItems: HTMLElement[] = this.getVisible(this.list.children);
    const lastVisibleItem: HTMLElement = visibleItems.pop() as HTMLElement;
    const position = lastVisibleItem.offsetTop;
    const height = position + lastVisibleItem.clientHeight / 1.5;
    this.container.style.height = height + "px";
  };

  private readonly isVisible: (listItem: HTMLElement) => boolean = (
    listItem
  ) => {
    const containerHeight = this.container.clientHeight;
    const containerOffsetTop = this.container.getBoundingClientRect().top;
    const distanceFromTopOfContainer = listItem.getBoundingClientRect().top;
    return distanceFromTopOfContainer - containerOffsetTop < containerHeight;
  };

  private readonly getVisible: (list: HTMLCollection) => HTMLElement[] = (
    list
  ) => {
    return Array.from(list).filter(this.isVisible) as HTMLElement[];
  };

  private readonly getSelectedItems: () => number[] = () => {
    const selectedIndexes: number[] = [];
    Array.from(this.inputs).forEach((input, i) => {
      if (input.checked == true) selectedIndexes.push(i);
    });
    return selectedIndexes;
  };

  private readonly getVisibleItems: () => number[] = () => {
    const visibleItems: number[] = [];
    for (let i = 0; i < this.list.children.length; i++) {
      if (
        (this.list.children[i] as HTMLElement).classList.contains(
          "is-hidden"
        ) === false
      ) {
        visibleItems.push(i);
      }
    }

    return visibleItems;
  };
}
