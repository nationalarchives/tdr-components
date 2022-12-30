import { NestedNavigation } from "./nested-navigation";

const createKeyboardEvent: (key: string) => KeyboardEvent = (key) => {
  const event: KeyboardEvent = document.createEvent("KeyboardEvent");
  Object.defineProperty(event, "key", { value: key, writable: false });
  return event;
};

const createInputElement: (checked?: boolean) => HTMLInputElement = (
  checked
) => {
  const id = "2a209671-7d21-42ae-9ded-b2e8fb64133a";
  const input: HTMLInputElement = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", `expander-${id}`);
  if (checked !== undefined) {
    input.checked = checked;
  }
  return input;
};

const createListElement: (ariaExpanded: string) => HTMLLIElement = (
  ariaExpanded
) => {
  const li: HTMLLIElement | null = document.createElement("li");
  const id = (Math.random() + 1).toString(36).substring(7);
  li.setAttribute("aria-expanded", ariaExpanded);
  li.setAttribute("role", "node");
  li.setAttribute("id", id);
  return li;
};

const createNestedNavigation: (
  navOption: Partial<NestedNavigation>,
  element?: HTMLLIElement | undefined,
  tree?: HTMLUListElement | undefined
) => NestedNavigation = (navOption, element, tree) => {
  const el = tree != null ? tree : document.createElement("ul");
  const navigation = new NestedNavigation(el, [el]);
  if (element != null) {
    navigation.setFocusToItem(element);
  }
  for (const navOptionKey in navOption) {
    navigation[navOptionKey] = navOption[navOptionKey];
  }
  return navigation;
};

describe.each(["checkboxes", "radios"])(
  "Nested Navigation %s",
  (classNameValue) => {
    const inputType = document.createElement("input");
    const inputTypeValue =
      classNameValue === "checkboxes" ? "checkbox" : "radio";
    inputType.id = "input-type";
    inputType.value = inputTypeValue;

    const className = document.createElement("input");
    className.id = "class-name";
    className.value = classNameValue;
    document.body.appendChild(inputType);
    document.body.appendChild(className);

    describe("handleKeyDown", () => {
      it("should select the focused item when enter is pressed", () => {
        const li = document.createElement("li");

        const setSelected = jest.fn();
        const nestedNavigation = createNestedNavigation({ setSelected }, li);

        const event = createKeyboardEvent("Enter");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setSelected).toHaveBeenCalledWith(li, classNameValue);
      });

      it("should select the focused item when space is pressed", () => {
        const li = document.createElement("li");
        const setSelected = jest.fn();

        const nestedNavigation = createNestedNavigation({ setSelected }, li);
        const event = createKeyboardEvent(" ");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setSelected).toHaveBeenCalledWith(li, classNameValue);
      });

      it("should focus on the previous item when ArrowUp is pressed", () => {
        const li = document.createElement("li");
        const setFocusToPreviousItem = jest.fn();

        const nestedNavigation = createNestedNavigation(
          { setFocusToPreviousItem },
          li
        );
        const event = createKeyboardEvent("ArrowUp");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setFocusToPreviousItem).toHaveBeenCalledWith(li);
      });

      it("should focus on the input when ArrowDown is pressed", () => {
        const li = document.createElement("li");
        const setFocusToNextItem = jest.fn();

        const nestedNavigation = createNestedNavigation(
          { setFocusToNextItem },
          li
        );

        const event = createKeyboardEvent("ArrowDown");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setFocusToNextItem).toHaveBeenCalledWith(li);
      });

      it("should open the node when ArrowRight is pressed and the node is closed", () => {
        const li = document.createElement("li");
        li.setAttribute("id", "test-id");
        li.setAttribute("aria-expanded", "false");
        const toggleNode = jest.fn();

        const nestedNavigation = createNestedNavigation({ toggleNode }, li);
        const event = createKeyboardEvent("ArrowRight");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(toggleNode).toHaveBeenCalledWith(li, "test-id", classNameValue);
      });

      it("should focus on the checkbox when ArrowRight is pressed and the node is open", () => {
        const li = document.createElement("li");
        li.setAttribute("aria-expanded", "true");
        const setFocusToNextItem = jest.fn();

        const nestedNavigation = createNestedNavigation(
          { setFocusToNextItem },
          li
        );

        const event = createKeyboardEvent("ArrowRight");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setFocusToNextItem).toHaveBeenCalledWith(li);
      });

      it("should focus on the parent element when ArrowLeft is pressed and the node is closed", () => {
        const li = createListElement("false");
        const parentLi: HTMLLIElement = createListElement("true");
        parentLi.appendChild(li);
        const setFocusToItem = jest.fn();

        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);

        const event = createKeyboardEvent("ArrowLeft");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setFocusToItem).toHaveBeenCalledWith(parentLi);
      });

      it("should toggle the list element when ArrowLeft is pressed and the node is open", () => {
        const li = document.createElement("li");
        li.setAttribute("aria-expanded", "true");
        li.setAttribute("id", "test-id");
        const toggleNode = jest.fn();

        const nestedNavigation = createNestedNavigation({ toggleNode }, li);
        const event = createKeyboardEvent("ArrowLeft");
        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(toggleNode).toHaveBeenCalledWith(li, "test-id", classNameValue);
      });

      it("should set the focus to the first child when Home is pressed", () => {
        const li = document.createElement("li");
        const tree = document.createElement("ul");
        tree.appendChild(li);
        const nestedNavigation = new NestedNavigation(tree, [tree]);
        const event = createKeyboardEvent("Home");

        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(nestedNavigation.getCurrentFocus()).toEqual(li);
      });

      it("should set the focus to the last expanded child when End is pressed", () => {
        const setFocusToItem = jest.fn();
        const li = document.createElement("li");
        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);

        nestedNavigation.getTree().appendChild(li);
        const event = createKeyboardEvent("Home");

        nestedNavigation.handleKeyDown(event, classNameValue);

        expect(setFocusToItem).toHaveBeenCalledWith(li);
      });
    });

    describe("handleExpanders", () => {
      it("should toggle the correct elements", () => {
        const toggleNode = jest.fn();
        const li = document.createElement("li");
        const setFocusToItem = jest.fn();
        const nestedNavigation = createNestedNavigation(
          { setFocusToItem, toggleNode },
          li
        );
        const input = createInputElement();
        const ul = document.createElement("ul");
        ul.setAttribute("id", input.id.replace("expander-", "node-group-"));
        li.appendChild(ul);
        document.body.appendChild(li);

        nestedNavigation.handleExpanders(input, classNameValue);

        expect(toggleNode).toHaveBeenCalledWith(
          li,
          input.id.replace("expander-", ""),
          classNameValue
        );
        expect(setFocusToItem).toHaveBeenCalledWith(li);

        document.body.removeChild(li);
      });
    });

    describe("setFocusToNextItem", () => {
      it("should focus on the next child when the element has a child", () => {
        const li = createListElement("true");
        const ul = document.createElement("ul");
        const childLi = document.createElement("li");
        ul.appendChild(childLi);
        li.appendChild(ul);
        const setFocusToItem = jest.fn();
        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);

        nestedNavigation.setFocusToNextItem(li);
        expect(setFocusToItem).toHaveBeenCalledWith(childLi);
      });

      it("should focus on the next sibling if there is a sibling but no children", () => {
        const li = createListElement("false");
        const liSibling = document.createElement("li");
        const parent = document.createElement("div");
        parent.appendChild(li);
        parent.appendChild(liSibling);
        const setFocusToItem = jest.fn();

        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);
        nestedNavigation.setFocusToNextItem(li);

        expect(setFocusToItem).toHaveBeenCalledWith(liSibling);
      });

      it("should focus on the sibling of the parent if there are no children or siblings", () => {
        const parentDiv = document.createElement("div");
        const parentLi = document.createElement("li");
        const parentSiblingLi = document.createElement("li");
        const parentUl = document.createElement("ul");
        parentLi.appendChild(parentUl);
        const li = createListElement("false");
        parentUl.appendChild(li);
        parentDiv.append(parentLi);
        parentDiv.append(parentSiblingLi);
        const setFocusToItem = jest.fn();

        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);
        nestedNavigation.setFocusToNextItem(li);

        expect(setFocusToItem).toHaveBeenCalledWith(parentSiblingLi);
      });
    });

    describe("setFocusToPreviousItem", () => {
      it("should focus on the siblings last child if there is a sibling and it is expanded", () => {
        const li = createListElement("true");
        const parentDiv = document.createElement("div");
        const siblingLi = document.createElement("li");
        siblingLi.setAttribute("aria-expanded", "true");
        const siblingChildUl = document.createElement("ul");
        const siblingChildLi = document.createElement("li");
        siblingChildUl.appendChild(siblingChildLi);
        siblingLi.appendChild(siblingChildUl);

        parentDiv.append(siblingLi);
        parentDiv.append(li);
        const setFocusToItem = jest.fn();

        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);
        nestedNavigation.setFocusToPreviousItem(li);

        expect(setFocusToItem).toHaveBeenCalledWith(siblingChildLi);
      });

      it("should focus on the previous sibling if there is a sibling and it is not expanded", () => {
        const li = createListElement("true");
        const parentDiv = document.createElement("div");
        const siblingLi = document.createElement("li");
        siblingLi.setAttribute("aria-expanded", "false");

        parentDiv.append(siblingLi);
        parentDiv.append(li);
        const setFocusToItem = jest.fn();

        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);
        nestedNavigation.setFocusToPreviousItem(li);

        expect(setFocusToItem).toHaveBeenCalledWith(siblingLi);
      });

      it("should go to the parent if it exists and there are no siblings", () => {
        const parentUl = document.createElement("ul");
        const parentLi = document.createElement("li");
        parentLi.appendChild(parentUl);
        const li = createListElement("true");
        parentUl.appendChild(li);
        const setFocusToItem = jest.fn();

        const nestedNavigation = createNestedNavigation({ setFocusToItem }, li);
        nestedNavigation.setFocusToPreviousItem(li);

        expect(setFocusToItem).toHaveBeenCalledWith(parentLi);
      });
    });

    describe("setFocusToItem", () => {
      it("should focus on the input checkbox", () => {
        const li = document.createElement("li");
        const spy = jest.spyOn(li, "focus");
        const nestedNavigation = createNestedNavigation({}, li);
        nestedNavigation.setFocusToItem(li);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe("setParentState", () => {
      it("should set the parent checkbox to indeterminate if some but not all children are checked", () => {
        const listOne = document.createElement("li");
        listOne.setAttribute("aria-selected", "true");
        const listTwo = document.createElement("li");
        const listThree = document.createElement("li");
        const allChildren = jest.fn(() => [listOne, listTwo, listThree]);
        const childUl = document.createElement("ul");
        const li = document.createElement("li");
        li.appendChild(childUl);

        const nestedNavigation = createNestedNavigation({ allChildren });
        nestedNavigation.setParentState(childUl);

        expect(li.getAttribute("aria-checked")).toEqual("mixed");
        expect(li.getAttribute("aria-selected")).toBeNull();
      });

      it("should set the parent checkbox to checked if all children are checked", () => {
        const listOne = document.createElement("li");
        listOne.setAttribute("aria-selected", "true");
        const listTwo = document.createElement("li");
        listTwo.setAttribute("aria-selected", "true");
        const allChildren = jest.fn(() => [listOne, listTwo]);
        const childUl = document.createElement("ul");

        const li = document.createElement("li");
        li.appendChild(childUl);

        const nestedNavigation = createNestedNavigation({ allChildren });
        nestedNavigation.setParentState(childUl);

        expect(li.getAttribute("aria-checked")).toEqual("true");
        expect(li.getAttribute("aria-selected")).toEqual("true");
      });

      it("should set the parent checkbox to unchecked if no children are checked", () => {
        const allChildren = jest.fn();
        allChildren.mockImplementation(() => [
          document.createElement("li"),
          document.createElement("li"),
        ]);
        const childUl = document.createElement("ul");
        const li = document.createElement("li");
        li.appendChild(childUl);

        const nestedNavigation = createNestedNavigation({ allChildren });
        nestedNavigation.setParentState(childUl);

        expect(li.getAttribute("aria-checked")).toEqual("false");
        expect(li.getAttribute("aria-selected")).toEqual("false");
      });
    });

    describe("toggleNode", () => {
      it("should set expanded to false and remove the id from local storage if the node is expanded", () => {
        const input = createInputElement();
        const li = createListElement("true");
        const getExpanded = jest.fn().mockImplementation(() => [input.id]);
        const nestedNavigation = createNestedNavigation({ getExpanded });
        const spy = jest.spyOn(Storage.prototype, "setItem");

        nestedNavigation.toggleNode(
          li,
          input.id.replace("expander-", ""),
          classNameValue
        );

        const expectedResult = JSON.stringify({ expanded: [] });
        expect(spy).toHaveBeenCalledWith(
          `${classNameValue}-state`,
          expectedResult
        );
        expect(li.getAttribute("aria-expanded")).toEqual("false");
      });

      it("should set expanded to true and remove the id from local storage if the node is collapsed", () => {
        const input = createInputElement();
        const id = input.id.replace("expander-", "");
        const li = createListElement("false");
        const getExpanded = jest.fn().mockImplementation(() => []);
        const nestedNavigation = createNestedNavigation({ getExpanded });
        const spy = jest.spyOn(Storage.prototype, "setItem");

        nestedNavigation.toggleNode(li, id, classNameValue);
        const expectedResult = JSON.stringify({ expanded: [id] });
        expect(spy).toHaveBeenCalledWith(
          `${classNameValue}-state`,
          expectedResult
        );
        expect(li.getAttribute("aria-expanded")).toEqual("true");
      });
    });

    describe("allChildren", () => {
      it("should return all children", () => {
        const parentUl = document.createElement("ul");
        const topLevelList = [
          createListElement("true"),
          createListElement("true"),
          createListElement("true"),
        ];
        const childUl = document.createElement("ul");
        const childLi = [
          createListElement("true"),
          createListElement("true"),
          createListElement("true"),
        ];
        childLi.forEach((value) => childUl.appendChild(value));

        topLevelList[0].appendChild(childUl);
        topLevelList.forEach((li) => parentUl.appendChild(li));

        const nestedNavigation = createNestedNavigation({});
        const children = nestedNavigation.allChildren(parentUl, []);
        const mapFn: (el: HTMLLIElement) => string = (el) => el.id;
        const allListElements = topLevelList.concat(childLi).map(mapFn).sort();

        expect(allListElements).toEqual(children.map(mapFn).sort());
      });
    });

    describe("getExpanded", () => {
      it("returns the current local state", () => {
        const ids = [
          "cd10c8b0-45ab-4ffa-9e9f-9e6367564fc0",
          "053d6e54-0ec2-44f9-85fc-90d075c25599",
        ];
        jest
          .spyOn(Storage.prototype, "getItem")
          .mockImplementation((_) => JSON.stringify({ expanded: ids }));
        const nestedNavigation = createNestedNavigation({});
        const expanded = nestedNavigation.getExpanded(classNameValue);

        expect(expanded).toEqual(ids);
      });
    });

    describe("updateExpanded", () => {
      it("keeps the item visible if it is in the expanded list", () => {
        const input = createInputElement();
        const li = createListElement("true");
        const id = input.id.replace("expander-", `${classNameValue}-list-`);
        const getExpanded = jest.fn().mockImplementation(() => [id]);
        input.id = input.id.replace("expander", `${classNameValue}-node-group`);

        const nestedNavigation = createNestedNavigation({ getExpanded });
        nestedNavigation.updateExpanded(input, classNameValue);

        expect(li.getAttribute("aria-expanded")).toEqual("true");
      });

      it("hides the item if it is not in the expanded list", () => {
        const input = createInputElement();
        const li = createListElement("true");
        li.appendChild(input);
        const getExpanded = jest.fn().mockImplementation(() => []);
        input.id = input.id.replace("expander", "node-group");

        const nestedNavigation = createNestedNavigation({ getExpanded });
        nestedNavigation.updateExpanded(input, classNameValue);

        expect(li.getAttribute("aria-expanded")).toEqual("false");
      });
    });

    describe("initialiseFormListeners", () => {
      it("should add keydown event listeners", () => {
        const events: { keydown?: EventListenerOrEventListenerObject[] } = {};
        const ul = document.createElement("ul");
        ul.setAttribute("role", "tree");

        ul.addEventListener = jest.fn((event, callback) => {
          events[event] = callback;
        });
        document.body.appendChild(ul);
        const nestedNavigation = createNestedNavigation({}, undefined, ul);
        nestedNavigation.initialiseFormListeners(classNameValue);

        expect(events.keydown?.length).toEqual(1);
      });

      it("should add click event listeners to the buttons", () => {
        const events: { [key: string]: EventListenerOrEventListenerObject[] } =
          {};

        const ul = document.createElement("ul");
        ul.setAttribute("role", "tree");
        const button = document.createElement("button");
        button.classList.add(`js-tree__expander--${classNameValue}`);
        button.addEventListener = jest.fn((event, callback) => {
          events[event] = [callback];
        });
        ul.appendChild(button);
        document.body.appendChild(ul);
        const nestedNavigation = createNestedNavigation({});
        nestedNavigation.initialiseFormListeners(classNameValue);

        expect(events.click?.length).toEqual(1);
      });

      it("should update the expanded state for the checkboxes", () => {
        const input = createInputElement();
        input.setAttribute("role", "group");
        input.id = classNameValue;
        document.body.appendChild(input);
        const updateExpanded = jest.fn();
        const nestedNavigation = createNestedNavigation({ updateExpanded });
        nestedNavigation.initialiseFormListeners(classNameValue);

        expect(updateExpanded).toHaveBeenCalledWith(input, classNameValue);
      });

      it("should add a focus handler to the checkboxes", () => {
        const events: { [key: string]: EventListenerOrEventListenerObject[] } =
          {};

        const ul = document.createElement("ul");
        ul.setAttribute("role", "tree");

        ul.addEventListener = jest.fn((event, callback) => {
          events[event] = [callback];
        });
        document.body.appendChild(ul);
        const nestedNavigation = new NestedNavigation(ul, [ul]);
        nestedNavigation.initialiseFormListeners(classNameValue);

        expect(events.focus?.length).toEqual(1);
      });

      it("should replace the checkboxes with spans", () => {
        const input = createInputElement();
        const li = createListElement("true");
        const ul = document.createElement("ul");
        ul.setAttribute("role", "tree");
        const label = document.createElement("label");
        li.appendChild(input);
        li.appendChild(label);
        li.setAttribute("class", `govuk-${classNameValue}__item`);
        ul.appendChild(li);
        document.body.appendChild(ul);
        const replaceCheckboxWithSpan = jest.fn();

        const nestedNavigation = createNestedNavigation({
          replaceCheckboxWithSpan,
        });
        nestedNavigation.initialiseFormListeners(classNameValue);

        expect(replaceCheckboxWithSpan).toHaveBeenCalledWith(input, label);
      });
    });

    describe("getTree", () => {
      it("should get the tree", () => {
        const el = document.createElement("ul");
        const navigation = new NestedNavigation(el, [el]);

        expect(navigation.getTree()).toEqual(el);
      });
    });

    describe("updateFocus", () => {
      it("should focus on the item if the item is present", () => {
        const setFocusToItem = jest.fn();
        const nestedNavigation = createNestedNavigation({ setFocusToItem });
        const li = document.createElement("li");
        nestedNavigation.updateFocus(li);
        expect(setFocusToItem).toHaveBeenCalledWith(li);
      });

      it("should focus on the first tree element if the item is not present", () => {
        const setFocusToItem = jest.fn();
        const tree = document.createElement("ul");
        const li = document.createElement("li");
        tree.appendChild(li);
        const nestedNavigation = new NestedNavigation(tree, [tree]);
        nestedNavigation.setFocusToItem = setFocusToItem;

        nestedNavigation.updateFocus();
        expect(setFocusToItem).toHaveBeenCalledWith(li);
      });
    });

    describe("replaceCheckboxWithSpan", () => {
      it("should replace checkboxes and labels with span elements", () => {
        const input = createInputElement();
        const li = createListElement("true");
        const label = document.createElement("label");
        label.setAttribute("test", "test-label-value");
        label.textContent = "Test content";
        li.appendChild(input);
        li.appendChild(label);
        const nestedNavigation = createNestedNavigation({});

        nestedNavigation.replaceCheckboxWithSpan(input, label);
        const checkboxSpan = li.children.item(0);
        const labelSpan = li.children.item(1);

        expect(checkboxSpan?.tagName).toEqual("SPAN");
        expect(labelSpan?.tagName).toEqual("SPAN");
        expect(checkboxSpan?.id).toEqual(input.id);
        expect(labelSpan?.getAttribute("test")).toEqual("test-label-value");
        expect(labelSpan?.textContent).toEqual("Test content");
      });
    });
  }
);

describe.each([true, false])("setSelected", (state) => {
  it(`should set itself and parent checkboxes to ${state.toString()} for a closed node`, () => {
    const li = createListElement("false");
    const currentSelection = state ? "false" : "true";
    li.setAttribute("aria-selected", currentSelection);
    const ul = document.createElement("ul");
    ul.setAttribute("role", "group");
    ul.appendChild(li);
    const setParentState = jest.fn();
    const nestedNavigation = createNestedNavigation({ setParentState });
    nestedNavigation.setSelected(li, "checkboxes");

    expect(setParentState).toHaveBeenCalledWith(ul);
    expect(li.getAttribute("aria-selected")).toEqual(state.toString());
  });

  it(`should set itself and child checkboxes to ${state.toString()} for an open node`, () => {
    const li = createListElement("true");
    li.setAttribute("aria-selected", (!state).toString());
    const setParentState = jest.fn();
    const childUl = document.createElement("ul");
    childUl.id = `checkboxes-node-group-${li.id}`;
    li.appendChild(childUl);
    document.body.appendChild(li);
    const childCheckboxOne = createInputElement();
    const childCheckboxTwo = createInputElement();
    const allChildren = jest
      .fn()
      .mockImplementation(() => [childCheckboxOne, childCheckboxTwo]);

    const nestedNavigation = createNestedNavigation({
      setParentState,
      allChildren,
    });
    nestedNavigation.setSelected(li, "checkboxes");

    expect(li.getAttribute("aria-checked")).toEqual(state.toString());
    expect(childCheckboxOne.getAttribute("aria-checked")).toEqual(
      state.toString()
    );
    expect(childCheckboxOne.getAttribute("aria-selected")).toEqual(
      state.toString()
    );
    expect(childCheckboxTwo.getAttribute("aria-checked")).toEqual(
      state.toString()
    );
    expect(childCheckboxTwo.getAttribute("aria-selected")).toEqual(
      state.toString()
    );

    document.body.removeChild(li);
  });
});
