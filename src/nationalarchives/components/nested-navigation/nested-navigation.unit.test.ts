import {NestedNavigation} from "./nested-navigation";

const createInputElement: () => HTMLInputElement = () => {
  const id = "2a209671-7d21-42ae-9ded-b2e8fb64133a"
  const input: HTMLInputElement = document.createElement("input")
  input.setAttribute("id",  `expander-${id}`)
  return input
}

const createListElement: (ariaExpanded: string, role: string, element: HTMLElement) => HTMLLIElement = (ariaExpanded, role, element) => {
  const li: HTMLLIElement = document.createElement("li")
  li.setAttribute("aria-expanded", ariaExpanded)
  li.setAttribute("role", role)
  li.appendChild(element)
  return li
}

const createNestedNavigation: (navOption: Partial<NestedNavigation>) => NestedNavigation = navOption => {
  const el = document.createElement("ul")
  const navigation = new NestedNavigation(el)
  for (let navOptionKey in navOption) {
    navigation[navOptionKey] = navOption[navOptionKey]
  }
  return navigation
}

describe('Nested Navigation', () => {
  it('should call setCheckbox when enter is pressed', async () => {
    const input: HTMLInputElement = createInputElement()

    const setCheckbox = jest.fn()
    const nestedNavigation = createNestedNavigation({setCheckbox})
    nestedNavigation.handleKeyDown("Enter", input)

    expect(setCheckbox).toHaveBeenCalledWith(input)
  })

  it('should call setCheckbox when space is pressed', async () => {
    const input: HTMLInputElement = createInputElement()
    const setCheckbox = jest.fn()

    const nestedNavigation = createNestedNavigation({setCheckbox})
    nestedNavigation.handleKeyDown(" ", input)

    expect(setCheckbox).toHaveBeenCalledWith(input)
  })

  it('should call setFocusToPreviousItem when ArrowUp is pressed', async () => {
    const input: HTMLInputElement = createInputElement()
    const setFocusToPreviousItem = jest.fn()

    const nestedNavigation = createNestedNavigation({setFocusToPreviousItem})
    nestedNavigation.handleKeyDown("ArrowUp", input)

    expect(setFocusToPreviousItem).toHaveBeenCalledWith(input)
  })

  it('should call setFocusToNextItem when ArrowDown is pressed', async () => {
    const input: HTMLInputElement = createInputElement()
    const setFocusToNextItem = jest.fn()

    const nestedNavigation = createNestedNavigation({setFocusToNextItem})
    nestedNavigation.handleKeyDown("ArrowDown", input)

    expect(setFocusToNextItem).toHaveBeenCalledWith(input)
  })

  it('should call toggleNode when ArrowRight is pressed and the node is closed', async () => {
    const input = createInputElement()
    const li: HTMLLIElement = createListElement("false", "node", input)
    const toggleNode = jest.fn()

    const nestedNavigation = createNestedNavigation({toggleNode})
    nestedNavigation.handleKeyDown("ArrowRight", input)

    expect(toggleNode).toHaveBeenCalledWith(li, input.id.replace("expander-", ""))
  })

  it('should call setFocusToNextItem when ArrowRight is pressed and the node is open', async () => {
    const input: HTMLInputElement = createInputElement()
    createListElement("true", "node", input)
    const setFocusToNextItem = jest.fn()

    const nestedNavigation = createNestedNavigation({setFocusToNextItem})
    nestedNavigation.handleKeyDown("ArrowRight", input)

    expect(setFocusToNextItem).toHaveBeenCalledWith(input)
  })

  it('should call setFocusToItem when ArrowLeft is pressed and the node is closed', async () => {
    const input: HTMLInputElement = createInputElement()
    const li: HTMLLIElement = createListElement("false", "node", input)
    const parentLi: HTMLLIElement = createListElement("false", "node", li)
    const setFocusToItem = jest.fn()

    const nestedNavigation = createNestedNavigation({setFocusToItem})
    nestedNavigation.handleKeyDown("ArrowLeft", input)

    expect(setFocusToItem).toHaveBeenCalledWith(parentLi)
  })

  it('should call toggleNode when ArrowLeft is pressed and the node is open', async () => {
    const input: HTMLInputElement = createInputElement()
    const li = createListElement("true", "node", input)
    const toggleNode = jest.fn()

    const nestedNavigation = createNestedNavigation({toggleNode})
    nestedNavigation.handleKeyDown("ArrowLeft", input)

    expect(toggleNode).toHaveBeenCalledWith(li, input.id.replace("expander-", ""))
  })

  it('Sets the focus to the first child when Home is pressed', async () => {
    const setFocusToItem = jest.fn()
    const input = createInputElement()
    const nestedNavigation = createNestedNavigation({setFocusToItem})
    const tree = nestedNavigation.getTree()
    const firstChild = document.createElement("li")
    tree.appendChild(firstChild)

    nestedNavigation.handleKeyDown("Home", input)

    expect(setFocusToItem).toHaveBeenCalledWith(firstChild)
  })

  it('Sets the focus to the last expanded child when End is pressed', async () => {
    const setFocusToItem = jest.fn()
    const input = createInputElement()
    const nestedNavigation = createNestedNavigation({setFocusToItem})
    const li = createListElement("true", "node", input)
    const ul = document.createElement("ul")
    const childInput = createInputElement()
    const childLi = createListElement("false", "node", childInput)
    ul.appendChild(childLi)
    li.appendChild(ul)
    nestedNavigation.getTree().appendChild(li)

    nestedNavigation.handleKeyDown("End", input)

    expect(setFocusToItem).toHaveBeenCalledWith(childLi)
  })

  it("Toggles the correct elements when handleExpanders is called", async () => {
    const toggleNode = jest.fn()
    const setFocusToItem = jest.fn()
    const nestedNavigation = createNestedNavigation({setFocusToItem, toggleNode})
    const input = createInputElement()
    const li = createListElement("true", "node", input)
    const ul = document.createElement("ul")
    ul.setAttribute("id", input.id.replace("expander-", "node-group-"))
    li.appendChild(ul)
    document.body.appendChild(li)

    nestedNavigation.handleExpanders(input)

    expect(toggleNode).toHaveBeenCalledWith(li, input.id.replace("expander-", ""))
    expect(setFocusToItem).toHaveBeenCalledWith(li)

    document.body.removeChild(li)
  })

})
