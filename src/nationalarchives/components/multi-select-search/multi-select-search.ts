interface MultiSelectConfig {
  copySingle?: string;
  copyMultiple?: string;
}

export class MultiSelectSearch {
  private readonly container: HTMLElement | null;
  private readonly list: HTMLElement;
  private readonly inputs: NodeListOf<HTMLInputElement>;
  private readonly filter: HTMLInputElement | null;
  private readonly filterCount: HTMLElement | null;
  private readonly selectedCount: HTMLElement | null;
  private readonly config: MultiSelectConfig;

  private timeoutId: null | ReturnType<typeof setTimeout> = null;
  private readonly labels: string[];

  constructor(rootElement: HTMLElement) {
    this.container = rootElement.querySelector(".js-container");
    this.list = rootElement.querySelector("ul") as HTMLElement;
    this.inputs = rootElement.querySelectorAll("input[type=checkbox]");
    this.filter = rootElement.querySelector("input[type=text]");
    this.filterCount = rootElement.querySelector(".js-filter-count");
    this.selectedCount = rootElement.querySelector(".js-selected-count");
    this.config = {
      // Adding spaces here to avoid multiple spaces when there is empty values
      copySingle: rootElement.dataset.copySingle?.trim() ?? "",
      copyMultiple: rootElement.dataset.copyMultiple?.trim() ?? "",
    };

    this.labels = [];
    for (let i = 0; i < this.list.children.length; i++) {
      this.labels.push(
        this.cleanString(this.list.children[i].textContent ?? ""),
      );
    }

    rootElement.setAttribute("data-module-active", "true");
  }

  initialise: () => void = () => {
    this.filter?.addEventListener("keyup", (ev: Event) => {
      if (ev instanceof KeyboardEvent) {
        this.handleKeyUp(ev);
      }
    });

    // Attach listener to update checked count
    this.list.addEventListener("change", this.processInputChange);

    const numChecked: number = this.getSelectedItems().length;
    const numVisible: number = this.getVisibleItems().length;
    if (this.selectedCount !== null) {
      this.updateSelectedCount(this.selectedCount, numChecked);
    }

    if (this.filterCount !== null) {
      this.updateFilteredCount(this.filterCount, numChecked, numVisible);
    }

    // Will not use for now because it requires using
    // inline styles for setting up height.
    // this.setupHeight();
  };

  handleKeyUp: (ev: KeyboardEvent) => void = (ev) => {
    ev.stopPropagation();
    if (ev.key !== "Enter") {
      clearTimeout(Number(this.timeoutId));
      this.timeoutId = setTimeout(this.processKeyUpTimeout, 300);
    } else {
      // prevents form from being submitted when user presses ENTER
      ev.preventDefault();
    }
  };

  cleanString: (searchText: string) => string = (searchText) => {
    searchText = searchText.replace(/&/g, "and");
    searchText = searchText.replace(/[’',:–-]/g, ""); // remove punctuation characters
    searchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape special characters
    return searchText.trim().replace(/\s\s+/g, " ").toLowerCase(); // replace multiple spaces with one
  };

  filterItems: (filterBy: string, listItems: HTMLCollection) => void = (
    filterText,
    listItems,
  ) => {
    const filterBy = this.cleanString(filterText);
    const visibleItems = this.getSelectedItems();
    let i = 0;
    for (i = 0; i < listItems.length; i++) {
      // If found by filter.
      if (this.labels[i].search(filterBy) !== -1) {
        visibleItems.push(i);
      }
    }
    // Hide all
    for (i = 0; i < listItems.length; i++) {
      (this.list.children[i] as HTMLElement).classList.add("is-hidden");
    }

    // Show checked and found by filter
    for (i = 0; i < visibleItems.length; i++) {
      (this.list.children[visibleItems[i]] as HTMLElement).classList.remove(
        "is-hidden",
      );
    }
  };

  /*
   * Updates a visible element with the amount of checked items
   */
  updateSelectedCount: (el: HTMLElement, numChecked: number) => void = (
    el,
    numChecked,
  ) => {
    el.textContent = `${numChecked} selected`;
  };

  /*
   * Updates a hidden/screen reader span with the amount of displayed and checked items
   */
  updateFilteredCount: (
    el: HTMLElement,
    numChecked: number,
    numVisible: number,
  ) => void = (el, numChecked, numVisible) => {
    const displayedCopy =
      numVisible === 1
        ? `${this.config.copySingle} displayed`
        : `${this.config.copyMultiple} displayed`;

    const selectedCopy =
      numChecked === 1
        ? `${this.config.copySingle} selected`
        : `${this.config.copyMultiple} selected`;

    const output = `${numVisible} ${displayedCopy}, ${numChecked} ${selectedCopy}`;

    el.innerHTML = output;
  };

  setupHeight: () => void = () => {
    if (this.container === null) return;
    const containerHeight: number = this.container.clientHeight;
    const listHeight: number = this.getAbsoluteHeight(this.list);

    // Resize if the list is only slightly bigger than its container
    if (listHeight < containerHeight + 50) {
      this.container.style.height = listHeight + "px";
      return;
    }

    // Resize to cut last item cleanly in half
    const visibleItems: HTMLElement[] = this.getInViewport(this.list.children);
    const lastVisibleItem: HTMLElement | undefined = visibleItems.pop();
    if (lastVisibleItem !== undefined) {
      const position = lastVisibleItem?.offsetTop;
      const height = position + lastVisibleItem.clientHeight / 1.5;
      this.container.style.height = height + "px";
    }
  };

  getAbsoluteHeight: (el: HTMLElement) => number = (el) => {
    const styles: CSSStyleDeclaration = window.getComputedStyle(el);
    const margin =
      parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);

    return Math.ceil(el.offsetHeight + margin);
  };

  isInViewport: (listItem: HTMLElement) => boolean = (listItem) => {
    if (this.container === null) return false;
    const containerHeight = this.container.clientHeight;
    const containerOffsetTop = this.container.getBoundingClientRect().top;
    const distanceFromTopOfContainer = listItem.getBoundingClientRect().top;
    return distanceFromTopOfContainer - containerOffsetTop < containerHeight;
  };

  getInViewport: (list: HTMLCollection) => HTMLElement[] = (list) => {
    return Array.from(list).filter(this.isInViewport) as HTMLElement[];
  };

  getSelectedItems: () => number[] = () => {
    const selectedIndexes: number[] = [];
    Array.from(this.inputs).forEach((input, i) => {
      if (input.checked) selectedIndexes.push(i);
    });
    return selectedIndexes;
  };

  getVisibleItems: () => number[] = () => {
    const visibleItems: number[] = [];
    for (let i = 0; i < this.list.children.length; i++) {
      if (
        !(this.list.children[i] as HTMLElement).classList.contains("is-hidden")
      ) {
        visibleItems.push(i);
      }
    }

    return visibleItems;
  };

  private readonly processKeyUpTimeout: () => void = () => {
    if (this.filter === null) return;
    this.filterItems(this.filter.value, this.list.children);

    const numChecked: number = this.getSelectedItems().length;
    const numVisible: number = this.getVisibleItems().length;

    if (this.filterCount !== null) {
      this.updateFilteredCount(this.filterCount, numChecked, numVisible);
    }
  };

  private readonly processInputChange: () => void = () => {
    const numChecked: number = this.getSelectedItems().length;
    const numVisible: number = this.getVisibleItems().length;
    if (this.selectedCount !== null) {
      this.updateSelectedCount(this.selectedCount, numChecked);
    }
    if (this.filterCount !== null) {
      this.updateFilteredCount(this.filterCount, numChecked, numVisible);
    }
  };
}
