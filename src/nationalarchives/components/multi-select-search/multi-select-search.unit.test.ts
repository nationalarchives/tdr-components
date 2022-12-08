import { MultiSelectSearch } from "./multi-select-search";

const createMultiSelectSearch: (
  element: HTMLElement,
  options?: Partial<MultiSelectSearch>
) => MultiSelectSearch = (root, options) => {
  const multiSelectSearch = new MultiSelectSearch(root);

  for (const key in options) {
    multiSelectSearch[key] = options[key];
  }
  return multiSelectSearch;
};

const createKeyboardEvent: (key: string) => KeyboardEvent = (key) => {
  const event: KeyboardEvent = document.createEvent("KeyboardEvent");
  Object.defineProperty(event, "key", { value: key, writable: false });
  return event;
};

const createInputElement: (
  checked: boolean,
  id?: string
) => HTMLInputElement = (isChecked = false, id: string) => {
  const input: HTMLInputElement = document.createElement("input");
  input.setAttribute("type", "checkbox");
  if (isChecked !== undefined) {
    input.checked = isChecked;
  }
  if (id) input.id = id;
  return input;
};

const createListOfInputs: (
  inputsChecked: boolean[],
  inputsVisible?: boolean[],
  labels?: string[]
) => HTMLUListElement = (inputsChecked, inputsVisible, labels) => {
  const ul: HTMLUListElement = document.createElement("ul");

  inputsChecked.forEach((checked, i) => {
    const li: HTMLLIElement = document.createElement("li");

    if (labels && labels[i]) {
      const label: HTMLLabelElement = document.createElement("label");
      label.textContent = labels[i];
      label.setAttribute("for", i.toString());
      li.appendChild(label);
    }

    if (inputsVisible && inputsVisible[i] === false) {
      li.classList.add("is-hidden");
    }

    li.appendChild(createInputElement(checked, i.toString()));
    ul.appendChild(li);
  });

  return ul;
};

describe("Multi Select Search", () => {
  describe("getSelectedItems", () => {
    it("should return the correct amount of selected checkboxes", () => {
      const root = document.createElement("div");
      const ul: HTMLUListElement = createListOfInputs([true, false, true]);
      root.appendChild(ul);

      const mss = createMultiSelectSearch(root);
      // Returns the index of input element
      const selectedItems: number[] = mss.getSelectedItems();
      expect(selectedItems.length).toEqual(2);
    });

    it("should return the selected checkboxes by array index", () => {
      const root = document.createElement("div");
      const ul: HTMLUListElement = createListOfInputs([
        true,
        false,
        false,
        false,
        false,
        true,
      ]);
      root.appendChild(ul);

      const mss = createMultiSelectSearch(root);
      // Returns the index of input element
      const selectedItems: number[] = mss.getSelectedItems();
      expect(selectedItems[1]).toEqual(5);
    });
  });

  describe("getVisibleItems", () => {
    it("should return the correct amount of visible checkboxes", () => {
      const root = document.createElement("div");
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false],
        [false, false, true]
      );
      root.appendChild(ul);
      const mss = createMultiSelectSearch(root);
      const visibleItems: number[] = mss.getVisibleItems();

      // There is only 1 visible item
      expect(visibleItems.length).toEqual(1);
    });

    it("should return the visible checkboxes by array index", () => {
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false, false, false],
        [false, true, false, false, true]
      );
      root.appendChild(ul);
      const mss = createMultiSelectSearch(root);
      // Returns the index of list element
      const visibleItems: number[] = mss.getVisibleItems();

      // The 2nd visible item in array is the index
      expect(visibleItems[1]).toEqual(4);
    });
  });

  describe("updateFilteredCount", () => {
    it("should update filtered count element", () => {
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false, false, false],
        [false, true, false, false, true]
      );
      root.appendChild(ul);
      const updateFilteredCount = jest.fn();

      const mss = createMultiSelectSearch(root, { updateFilteredCount });
      mss.initialise();

      expect(updateFilteredCount).toHaveBeenCalled();
    });

    it("should update filtered count element with correct text", () => {
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false, false, false],
        [false, true, false, false, true]
      );
      const filterCountEl = document.createElement("span");
      filterCountEl.classList.add("js-filter-count");
      root.appendChild(ul);
      root.appendChild(filterCountEl);

      // const updateFilteredCount = jest.fn();
      const mss = createMultiSelectSearch(root);
      mss.initialise();

      expect(filterCountEl.textContent).toEqual("2 displayed, 0 selected");
    });
  });

  describe("updateSelectedCount", () => {
    it("should update selected count element", () => {
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false, false, false],
        [false, true, false, false, true]
      );
      root.appendChild(ul);
      const updateSelectedCount = jest.fn();

      const mss = createMultiSelectSearch(root, { updateSelectedCount });
      mss.initialise();

      expect(updateSelectedCount).toHaveBeenCalled();
    });
    it("should update selected count element with correct text", () => {
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs([
        true,
        true,
        false,
        false,
        true,
      ]);
      const selectedCountEl = document.createElement("span");
      selectedCountEl.classList.add("js-selected-count");
      root.appendChild(ul);
      root.appendChild(selectedCountEl);

      const mss = createMultiSelectSearch(root);
      mss.initialise();

      expect(selectedCountEl.textContent).toEqual("3 selected");
    });
  });

  describe("filterItems", () => {
    it("should hide items in list", () => {
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false, false, false],
        [true, true, true, true, true],
        ["Abkhazian", "Afar", "Bengali", "Bislama", "English"]
      );
      root.appendChild(ul);
      // console.log(ul.children[0].textContent);
      const mss = createMultiSelectSearch(root);
      mss.initialise();
      mss.filterItems("Bisl", ul.children);

      const visibleItems: number[] = mss.getVisibleItems();
      expect(visibleItems[0]).toEqual(3);
    });
  });

  describe("handleKeyUp", () => {
    it("should hide items when triggered by keyboard event", () => {
      jest.useFakeTimers();
      const root = document.createElement("div");
      // no checked and 2 visible
      const ul: HTMLUListElement = createListOfInputs(
        [false, false, false, false, false],
        [true, true, true, true, true],
        ["Abkhazian", "Afar", "Bengali", "Bislama", "English"]
      );

      const filterInput = document.createElement("input");
      filterInput.setAttribute("type", "text");
      filterInput.value = "bis";

      root.appendChild(ul);
      root.appendChild(filterInput);

      const mss = createMultiSelectSearch(root);
      mss.initialise();

      mss.handleKeyUp(createKeyboardEvent("b"));
      mss.handleKeyUp(createKeyboardEvent("i"));
      mss.handleKeyUp(createKeyboardEvent("s"));

      jest.runAllTimers();

      const visibleItems: number[] = mss.getVisibleItems();
      expect(visibleItems[0]).toEqual(3);
      // expect(setTimeout).toHaveBeenCalledTimes(3);
      jest.useRealTimers()
    });
  });
});
