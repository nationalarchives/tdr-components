import { NestedNavigation } from './nested-navigation'

const createKeyboardEvent: (key: string) => KeyboardEvent = key => {
  const event: KeyboardEvent = document.createEvent("KeyboardEvent")
  Object.defineProperty(event, "key", { value: key, writable: false })
  return event
}

const createInputElement: (checked?: boolean) => HTMLInputElement = (checked) => {
  const id = '2a209671-7d21-42ae-9ded-b2e8fb64133a'
  const input: HTMLInputElement = document.createElement('input')
  input.setAttribute('type', 'checkbox')
  input.setAttribute('id', `expander-${id}`)
  if (checked !== undefined) {
    input.checked = checked
  }
  return input
}

const createListElement: (ariaExpanded: string) => HTMLLIElement = (ariaExpanded) => {
  const li: HTMLLIElement | null = document.createElement('li')
  const id = (Math.random() + 1).toString(36).substring(7)
  li.setAttribute('aria-expanded', ariaExpanded)
  li.setAttribute('role', 'node')
  li.setAttribute("id", id)
  return li
}

const createNestedNavigation: (navOption: Partial<NestedNavigation>, element?: HTMLLIElement | undefined) => NestedNavigation = (navOption, element) => {
  const el = document.createElement('ul')
  const navigation = new NestedNavigation(el, [el])
  if(element) {
    navigation.setFocusToItem(element)
  }
  for (const navOptionKey in navOption) {
    navigation[navOptionKey] = navOption[navOptionKey]
  }
  return navigation
}

describe('Nested Navigation', () => {
  describe('handleKeyDown', () => {
    it('should select the focused item when enter is pressed', () => {
      const li = document.createElement("li")

      const setSelected = jest.fn()
      const nestedNavigation = createNestedNavigation({ setSelected }, li)

      const event = createKeyboardEvent('Enter')
      nestedNavigation.handleKeyDown(event)

      expect(setSelected).toHaveBeenCalledWith(li)
    })

    it('should select the focused item when space is pressed', () => {
      const li = document.createElement("li")
      const setSelected = jest.fn()

      const nestedNavigation = createNestedNavigation({ setSelected }, li)
      const event = createKeyboardEvent(' ')
      nestedNavigation.handleKeyDown(event)

      expect(setSelected).toHaveBeenCalledWith(li)
    })

    it('should focus on the previous item when ArrowUp is pressed', () => {
      const li = document.createElement("li")
      const setFocusToPreviousItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToPreviousItem }, li)
      const event = createKeyboardEvent('ArrowUp')
      nestedNavigation.handleKeyDown(event)

      expect(setFocusToPreviousItem).toHaveBeenCalledWith(li)
    })

    it('should focus on the input when ArrowDown is pressed', () => {
      const li = document.createElement("li")
      const setFocusToNextItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToNextItem }, li)

      const event = createKeyboardEvent('ArrowDown')
      nestedNavigation.handleKeyDown(event)

      expect(setFocusToNextItem).toHaveBeenCalledWith(li)
    })

    it('should open the node when ArrowRight is pressed and the node is closed', () => {
      const li = document.createElement("li")
      li.setAttribute("id", "test-id")
      li.setAttribute("aria-expanded", "false")
      const toggleNode = jest.fn()

      const nestedNavigation = createNestedNavigation({ toggleNode }, li)
      const event = createKeyboardEvent('ArrowRight')
      nestedNavigation.handleKeyDown(event)

      expect(toggleNode).toHaveBeenCalledWith(li, "test-id")
    })

    it('should focus on the checkbox when ArrowRight is pressed and the node is open', () => {
      const li = document.createElement("li")
      li.setAttribute("aria-expanded", "true")
      const setFocusToNextItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToNextItem }, li)

      const event = createKeyboardEvent('ArrowRight')
      nestedNavigation.handleKeyDown(event)

      expect(setFocusToNextItem).toHaveBeenCalledWith(li)
    })

    it('should focus on the parent element when ArrowLeft is pressed and the node is closed', () => {
      const li = document.createElement("li")
      li.setAttribute("aria-expanded", "false")
      const parentLi: HTMLLIElement = createListElement('true')
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)

      const event = createKeyboardEvent('ArrowLeft')
      nestedNavigation.handleKeyDown(event)

      expect(setFocusToItem).toHaveBeenCalledWith(parentLi)
    })

    it('should toggle the list element when ArrowLeft is pressed and the node is open', () => {
      const li = document.createElement("li")
      li.setAttribute("aria-expanded", "true")
      li.setAttribute("id", "test-id")
      const toggleNode = jest.fn()

      const nestedNavigation = createNestedNavigation({ toggleNode }, li)
      const event = createKeyboardEvent('ArrowLeft')
      nestedNavigation.handleKeyDown(event)

      expect(toggleNode).toHaveBeenCalledWith(li, "test-id")
    })

    it('should set the focus to the first child when Home is pressed', () => {
      const li = document.createElement("li")
      const tree = document.createElement("ul")
      tree.appendChild(li)
      const nestedNavigation = new NestedNavigation(tree, [tree])
      const event = createKeyboardEvent('Home')

      nestedNavigation.handleKeyDown(event)

      expect(nestedNavigation.getCurrentFocus()).toEqual(li)
    })

    it('should set the focus to the last expanded child when End is pressed', () => {
      const setFocusToItem = jest.fn()
      const li = document.createElement("li")
      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)

      nestedNavigation.getTree().appendChild(li)
      const event = createKeyboardEvent('Home')

      nestedNavigation.handleKeyDown(event)

      expect(setFocusToItem).toHaveBeenCalledWith(li)
    })
  })

  describe('handleExpanders', () => {
    it('should toggle the correct elements', () => {
      const toggleNode = jest.fn()
      const li = document.createElement("li")
      const setFocusToItem = jest.fn()
      const nestedNavigation = createNestedNavigation({ setFocusToItem, toggleNode }, li)
      const input = createInputElement()
      const ul = document.createElement('ul')
      ul.setAttribute('id', input.id.replace('expander-', 'node-group-'))
      li.appendChild(ul)
      document.body.appendChild(li)

      nestedNavigation.handleExpanders(input)

      expect(toggleNode).toHaveBeenCalledWith(li, input.id.replace('expander-', ''))
      expect(setFocusToItem).toHaveBeenCalledWith(li)

      document.body.removeChild(li)
    })
  })

  describe('setFocusToNextItem', () => {
    it('should focus on the next child when the element has a child', () => {
      const input = createInputElement()
      const li = createListElement('true')
      const ul = document.createElement('ul')
      const childLi = document.createElement('li')
      ul.appendChild(childLi)
      li.appendChild(ul)
      const setFocusToItem = jest.fn()
      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)

      nestedNavigation.setFocusToNextItem(li)
      expect(setFocusToItem).toHaveBeenCalledWith(childLi)
    })

    it('should focus on the next sibling if there is a sibling but no children', () => {
      const input = createInputElement()
      const li = createListElement('false')
      const liSibling = document.createElement('li')
      const parent = document.createElement('div')
      parent.appendChild(li)
      parent.appendChild(liSibling)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)
      nestedNavigation.setFocusToNextItem(li)

      expect(setFocusToItem).toHaveBeenCalledWith(liSibling)
    })

    it('should focus on the sibling of the parent if there are no children or siblings', () => {
      const parentDiv = document.createElement('div')
      const parentLi = document.createElement('li')
      const parentSiblingLi = document.createElement('li')
      const parentUl = document.createElement('ul')
      parentLi.appendChild(parentUl)
      const input = createInputElement()
      const li = createListElement('false')
      parentUl.appendChild(li)
      parentDiv.append(parentLi)
      parentDiv.append(parentSiblingLi)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)
      nestedNavigation.setFocusToNextItem(li)

      expect(setFocusToItem).toHaveBeenCalledWith(parentSiblingLi)
    })
  })

  describe('setFocusToPreviousItem', () => {
    it('should focus on the siblings last child if there is a sibling and it is expanded', () => {
      const input = createInputElement()
      const li = createListElement('true')
      const parentDiv = document.createElement('div')
      const siblingLi = document.createElement('li')
      siblingLi.setAttribute('aria-expanded', 'true')
      const siblingChildUl = document.createElement('ul')
      const siblingChildLi = document.createElement('li')
      siblingChildUl.appendChild(siblingChildLi)
      siblingLi.appendChild(siblingChildUl)

      parentDiv.append(siblingLi)
      parentDiv.append(li)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)
      nestedNavigation.setFocusToPreviousItem(li)

      expect(setFocusToItem).toHaveBeenCalledWith(siblingChildLi)
    })

    it('should focus on the previous sibling if there is a sibling and it is not expanded', () => {
      const input = createInputElement()
      const li = createListElement('true')
      const parentDiv = document.createElement('div')
      const siblingLi = document.createElement('li')
      siblingLi.setAttribute('aria-expanded', 'false')

      parentDiv.append(siblingLi)
      parentDiv.append(li)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)
      nestedNavigation.setFocusToPreviousItem(li)

      expect(setFocusToItem).toHaveBeenCalledWith(siblingLi)
    })

    it('should go the parent if it exists and there are no siblings', () => {
      const parentUl = document.createElement('ul')
      const parentLi = document.createElement('li')
      parentLi.appendChild(parentUl)
      const input = createInputElement()
      const li = createListElement('true')
      parentUl.appendChild(li)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem }, li)
      nestedNavigation.setFocusToPreviousItem(li)

      expect(setFocusToItem).toHaveBeenCalledWith(parentLi)
    })
  })

  describe('setFocusToItem', () => {
    it('should focus on the input checkbox', () => {
      const li = document.createElement("li")
      const spy = jest.spyOn(li, 'focus')
      const nestedNavigation = createNestedNavigation({}, li)
      nestedNavigation.setFocusToItem(li)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('setParentState', () => {
    it('should set the parent checkbox to indeterminate if some but not all children are checked', () => {
      const listOne = document.createElement("li")
      listOne.setAttribute("aria-selected", "true")
      const listTwo = document.createElement("li")
      const listThree = document.createElement("li")
      const allChildren = jest.fn(() => [listOne, listTwo, listThree])
      const childUl = document.createElement('ul')
      const li = document.createElement("li")
      li.appendChild(childUl)

      const nestedNavigation = createNestedNavigation({ allChildren })
      nestedNavigation.setParentState(childUl)

      expect(li.getAttribute("aria-checked")).toEqual("mixed")
      expect(li.getAttribute("aria-selected")).toBeNull()
    })

    it('should set the parent checkbox to checked if all children are checked', () => {
      const listOne = document.createElement("li")
      listOne.setAttribute("aria-selected", "true")
      const listTwo = document.createElement("li")
      listTwo.setAttribute("aria-selected", "true")
      const allChildren = jest.fn(() => [listOne, listTwo])
      const childUl = document.createElement('ul')

      const li = document.createElement("li")
      li.appendChild(childUl)

      const nestedNavigation = createNestedNavigation({ allChildren })
      nestedNavigation.setParentState(childUl)

      expect(li.getAttribute("aria-checked")).toEqual("true")
      expect(li.getAttribute("aria-selected")).toEqual("true")
    })

    it('should set the parent checkbox to unchecked if no children are checked', () => {
      const allChildren = jest.fn()
      allChildren.mockImplementation(() => [document.createElement("li"), document.createElement("li")])
      const childUl = document.createElement('ul')
      const li = document.createElement("li")
      li.appendChild(childUl)

      const nestedNavigation = createNestedNavigation({ allChildren })
      nestedNavigation.setParentState(childUl)

      expect(li.getAttribute("aria-checked")).toEqual("false")
      expect(li.getAttribute("aria-selected")).toEqual("false")
    })
  })

  describe.each([true, false])('setSelected', (state) => {
    it(`should set itself and parent checkboxes to ${state.toString()} for a closed node`, () => {
      const input = createInputElement()
      const li = createListElement('false')
      const currentSelection = state ? 'false' : 'true'
      li.setAttribute('aria-selected', currentSelection)
      const ul = document.createElement('ul')
      ul.setAttribute('role', 'group')
      ul.appendChild(li)
      const setParentState = jest.fn()
      const nestedNavigation = createNestedNavigation({ setParentState })
      nestedNavigation.setSelected(li)

      expect(setParentState).toHaveBeenCalledWith(ul)
      expect(li.getAttribute('aria-selected')).toEqual(state.toString())
    })

    it(`should set itself and child checkboxes to ${state.toString()} for an open node`, () => {
      const input = createInputElement(state)
      const li = createListElement('true')
      const setParentState = jest.fn()
      const childUl = document.createElement('ul')
      childUl.id = `node-group-${input.id}`
      li.appendChild(childUl)
      document.body.appendChild(li)
      const childCheckboxOne = createInputElement()
      const childCheckboxTwo = createInputElement()
      const allChildren = jest.fn().mockImplementation(() => [childCheckboxOne, childCheckboxTwo])

      const nestedNavigation = createNestedNavigation({ setParentState, allChildren })
      nestedNavigation.setSelected(li)

      expect(childCheckboxOne.checked).toEqual(state)
      expect(childCheckboxTwo.checked).toEqual(state)

      document.body.removeChild(li)
    })
  })

  describe('toggleNode', () => {
    it('should set expanded to false and remove the id from local storage if the node is expanded', () => {
      const input = createInputElement()
      const li = createListElement('true')
      const getExpanded = jest.fn().mockImplementation(() => [input.id])
      const nestedNavigation = createNestedNavigation({ getExpanded })
      const spy = jest.spyOn(Storage.prototype, 'setItem')

      nestedNavigation.toggleNode(li, input.id.replace('expander-', ''))

      const expectedResult = JSON.stringify({ expanded: [] })
      expect(spy).toHaveBeenCalledWith('state', expectedResult)
      expect(li.getAttribute('aria-expanded')).toEqual('false')
    })

    it('should set expanded to true and remove the id from local storage if the node is collapsed', () => {
      const input = createInputElement()
      const id = input.id.replace('expander-', '')
      const li = createListElement('false')
      const getExpanded = jest.fn().mockImplementation(() => [])
      const nestedNavigation = createNestedNavigation({ getExpanded })
      const spy = jest.spyOn(Storage.prototype, 'setItem')

      nestedNavigation.toggleNode(li, id)
      const expectedResult = JSON.stringify({ expanded: [id] })
      expect(spy).toHaveBeenCalledWith('state', expectedResult)
      expect(li.getAttribute('aria-expanded')).toEqual('true')
    })
  })

  describe('allChildren', () => {
    it('should return all children', () => {
      const parentUl = document.createElement('ul')
      const topLevelList = [
        createListElement("true"), createListElement("true"), createListElement("true")
      ]
      const childUl = document.createElement('ul')
      const childLi = [
        createListElement("true"), createListElement("true"), createListElement("true")
      ]
      childLi.forEach(value => childUl.appendChild(value))

      topLevelList[0].appendChild(childUl)
      topLevelList.forEach(li => parentUl.appendChild(li))

      const nestedNavigation = createNestedNavigation({})
      const children = nestedNavigation.allChildren(parentUl, [])
      const mapFn: (el: HTMLLIElement) => string = el => el.id
      const allListElements = topLevelList.concat(childLi).map(mapFn).sort()

      expect(allListElements).toEqual(children.map(mapFn).sort())
    })
  })

  describe('getExpanded', () => {
    it('returns the current local state', () => {
      const ids = ['cd10c8b0-45ab-4ffa-9e9f-9e6367564fc0', '053d6e54-0ec2-44f9-85fc-90d075c25599']
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation((_) => JSON.stringify({ expanded: ids }))
      const nestedNavigation = createNestedNavigation({})
      const expanded = nestedNavigation.getExpanded()

      expect(expanded).toEqual(ids)
    })
  })

  describe('updateExpanded', () => {
    it('keeps the item visible if it is in the expanded list', () => {
      const input = createInputElement()
      const li = createListElement('true')
      const id = input.id.replace('expander-', '')
      const getExpanded = jest.fn().mockImplementation(() => [id])
      input.id = input.id.replace('expander', 'node-group')

      const nestedNavigation = createNestedNavigation({ getExpanded })
      nestedNavigation.updateExpanded(input)

      expect(li.getAttribute('aria-expanded')).toEqual('true')
    })

    it('hides the item if it is not in the expanded list', () => {
      const input = createInputElement()
      const li = createListElement('true')
      const getExpanded = jest.fn().mockImplementation(() => [])
      input.id = input.id.replace('expander', 'node-group')

      const nestedNavigation = createNestedNavigation({ getExpanded })
      nestedNavigation.updateExpanded(input)

      expect(li.getAttribute('aria-expanded')).toEqual('false')
    })
  })

  describe('initialiseFormListeners', () => {
    it('should add keydown event listeners', () => {
      const events: { keydown?: EventListenerOrEventListenerObject[] } = {}

      const ul = document.createElement('ul')
      ul.setAttribute('role', 'tree')
      ul.addEventListener = jest.fn((event, callback) => {
        events[event] = callback
      })
      document.body.appendChild(ul)
      const nestedNavigation = createNestedNavigation({})
      nestedNavigation.initialiseFormListeners()

      expect(events.keydown?.length).toEqual(1)
    })

    it('should add click event listeners to the buttons', () => {
      const events: { [key: string]: EventListenerOrEventListenerObject[] } = {}

      const ul = document.createElement('ul')
      ul.setAttribute('role', 'tree')
      const button = document.createElement('button')
      button.addEventListener = jest.fn((event, callback) => {
        events[event] = [callback]
      })
      ul.appendChild(button)
      document.body.appendChild(ul)
      const nestedNavigation = createNestedNavigation({})
      nestedNavigation.initialiseFormListeners()

      expect(events.click?.length).toEqual(1)
    })

    it('should update the expanded state for the checkboxes', () => {
      const input = createInputElement()
      input.setAttribute('role', 'group')
      document.body.appendChild(input)
      const updateExpanded = jest.fn()
      const nestedNavigation = createNestedNavigation({ updateExpanded })
      nestedNavigation.initialiseFormListeners()

      expect(updateExpanded).toHaveBeenCalledWith(input)
    })

    it('should add a change handler to the checkboxes', () => {
      const events: { [key: string]: EventListenerOrEventListenerObject[] } = {
        change: []
      }
      const addEvent: (event, callback) => void = (event, callback) => {
        const callbackList: EventListenerOrEventListenerObject[] = events[event]
        callbackList.push(callback)
        events[event] = callbackList
      }

      const ul = document.createElement('ul')
      ul.setAttribute('role', 'tree')
      const inputOne = createInputElement()
      const inputTwo = createInputElement()
      inputOne.addEventListener = jest.fn((event, callback) => {
        addEvent(event, callback)
      })
      inputTwo.addEventListener = jest.fn((event, callback) => {
        addEvent(event, callback)
      })
      ul.appendChild(inputOne)
      ul.appendChild(inputTwo)
      document.body.appendChild(ul)

      const nestedNavigation = createNestedNavigation({})
      nestedNavigation.initialiseFormListeners()

      expect(events.change.length).toEqual(2)
    })
  })

  describe('getTree', () => {
    it('should get the tree', () => {
      const el = document.createElement('ul')
      const navigation = new NestedNavigation(el, [el])

      expect(navigation.getTree()).toEqual(el)
    })
  })
})
