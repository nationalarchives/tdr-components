import { NestedNavigation } from './nested-navigation'

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

const createListElement: (ariaExpanded: string, element: HTMLElement) => HTMLLIElement = (ariaExpanded, element) => {
  const li: HTMLLIElement | null = document.createElement('li')
  li.setAttribute('aria-expanded', ariaExpanded)
  li.setAttribute('role', 'node')
  li.appendChild(element)
  return li
}

const createNestedNavigation: (navOption: Partial<NestedNavigation>) => NestedNavigation = navOption => {
  const el = document.createElement('ul')
  const navigation = new NestedNavigation(el)
  for (const navOptionKey in navOption) {
    navigation[navOptionKey] = navOption[navOptionKey]
  }
  return navigation
}

describe('Nested Navigation', () => {
  describe('handleKeyDown', () => {
    it('should check or uncheck the checkbox when enter is pressed', () => {
      const input: HTMLInputElement = createInputElement()

      const setCheckbox = jest.fn()
      const nestedNavigation = createNestedNavigation({ setCheckbox })
      nestedNavigation.handleKeyDown('Enter', input)

      expect(setCheckbox).toHaveBeenCalledWith(input)
    })

    it('should check or uncheck the checkbox when space is pressed', () => {
      const input: HTMLInputElement = createInputElement()
      const setCheckbox = jest.fn()

      const nestedNavigation = createNestedNavigation({ setCheckbox })
      nestedNavigation.handleKeyDown(' ', input)

      expect(setCheckbox).toHaveBeenCalledWith(input)
    })

    it('should focus on the previous item when ArrowUp is pressed', () => {
      const input: HTMLInputElement = createInputElement()
      const setFocusToPreviousItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToPreviousItem })
      nestedNavigation.handleKeyDown('ArrowUp', input)

      expect(setFocusToPreviousItem).toHaveBeenCalledWith(input)
    })

    it('should focus on the input when ArrowDown is pressed', () => {
      const input: HTMLInputElement = createInputElement()
      const setFocusToNextItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToNextItem })
      nestedNavigation.handleKeyDown('ArrowDown', input)

      expect(setFocusToNextItem).toHaveBeenCalledWith(input)
    })

    it('should open the node when ArrowRight is pressed and the node is closed', () => {
      const input = createInputElement()
      const li: HTMLLIElement = createListElement('false', input)
      const toggleNode = jest.fn()

      const nestedNavigation = createNestedNavigation({ toggleNode })
      nestedNavigation.handleKeyDown('ArrowRight', input)

      expect(toggleNode).toHaveBeenCalledWith(li, input.id.replace('expander-', ''))
    })

    it('should focus on the checkbox when ArrowRight is pressed and the node is open', () => {
      const input: HTMLInputElement = createInputElement()
      createListElement('true', input)
      const setFocusToNextItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToNextItem })
      nestedNavigation.handleKeyDown('ArrowRight', input)

      expect(setFocusToNextItem).toHaveBeenCalledWith(input)
    })

    it('should focus on the parent element when ArrowLeft is pressed and the node is closed', () => {
      const input: HTMLInputElement = createInputElement()
      const li: HTMLLIElement = createListElement('false', input)
      const parentLi: HTMLLIElement = createListElement('true', li)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      nestedNavigation.handleKeyDown('ArrowLeft', input)

      expect(setFocusToItem).toHaveBeenCalledWith(parentLi)
    })

    it('should toggle the list element when ArrowLeft is pressed and the node is open', () => {
      const input: HTMLInputElement = createInputElement()
      const li = createListElement('true', input)
      const toggleNode = jest.fn()

      const nestedNavigation = createNestedNavigation({ toggleNode })
      nestedNavigation.handleKeyDown('ArrowLeft', input)

      expect(toggleNode).toHaveBeenCalledWith(li, input.id.replace('expander-', ''))
    })

    it('should set the focus to the first child when Home is pressed', () => {
      const setFocusToItem = jest.fn()
      const input = createInputElement()
      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      const tree = nestedNavigation.getTree()
      const firstChild = document.createElement('li')
      tree.appendChild(firstChild)

      nestedNavigation.handleKeyDown('Home', input)

      expect(setFocusToItem).toHaveBeenCalledWith(firstChild)
    })

    it('should set the focus to the last expanded child when End is pressed', () => {
      const setFocusToItem = jest.fn()
      const input = createInputElement()
      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      const li = createListElement('true', input)
      const ul = document.createElement('ul')
      const childInput = createInputElement()
      const childLi = createListElement('false', childInput)
      ul.appendChild(childLi)
      li.appendChild(ul)
      nestedNavigation.getTree().appendChild(li)

      nestedNavigation.handleKeyDown('End', input)

      expect(setFocusToItem).toHaveBeenCalledWith(childLi)
    })
  })

  describe('handleExpanders', () => {
    it('should toggle the correct elements', () => {
      const toggleNode = jest.fn()
      const setFocusToItem = jest.fn()
      const nestedNavigation = createNestedNavigation({ setFocusToItem, toggleNode })
      const input = createInputElement()
      const li = createListElement('true', input)
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
      const li = createListElement('true', input)
      const ul = document.createElement('ul')
      const childLi = document.createElement('li')
      ul.appendChild(childLi)
      li.appendChild(ul)
      const setFocusToItem = jest.fn()
      const nestedNavigation = createNestedNavigation({ setFocusToItem })

      nestedNavigation.setFocusToNextItem(input)
      expect(setFocusToItem).toHaveBeenCalledWith(childLi)
    })

    it('should focus on the next sibling if there is a sibling but no children', () => {
      const input = createInputElement()
      const li = createListElement('false', input)
      const liSibling = document.createElement('li')
      const parent = document.createElement('div')
      parent.appendChild(li)
      parent.appendChild(liSibling)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      nestedNavigation.setFocusToNextItem(input)

      expect(setFocusToItem).toHaveBeenCalledWith(liSibling)
    })

    it('should focus on the sibling of the parent if there are no children or siblings', () => {
      const parentDiv = document.createElement('div')
      const parentLi = document.createElement('li')
      const parentSiblingLi = document.createElement('li')
      const parentUl = document.createElement('ul')
      parentLi.appendChild(parentUl)
      const input = createInputElement()
      const li = createListElement('false', input)
      parentUl.appendChild(li)
      parentDiv.append(parentLi)
      parentDiv.append(parentSiblingLi)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      nestedNavigation.setFocusToNextItem(input)

      expect(setFocusToItem).toHaveBeenCalledWith(parentSiblingLi)
    })
  })

  describe('setFocusToPreviousItem', () => {
    it('should focus on the siblings last child if there is a sibling and it is expanded', () => {
      const input = createInputElement()
      const li = createListElement('true', input)
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

      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      nestedNavigation.setFocusToPreviousItem(input)

      expect(setFocusToItem).toHaveBeenCalledWith(siblingChildLi)
    })

    it('should focus on the previous sibling if there is a sibling and it is not expanded', () => {
      const input = createInputElement()
      const li = createListElement('true', input)
      const parentDiv = document.createElement('div')
      const siblingLi = document.createElement('li')
      siblingLi.setAttribute('aria-expanded', 'false')

      parentDiv.append(siblingLi)
      parentDiv.append(li)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      nestedNavigation.setFocusToPreviousItem(input)

      expect(setFocusToItem).toHaveBeenCalledWith(siblingLi)
    })

    it('should go the parent if it exists and there are no siblings', () => {
      const parentUl = document.createElement('ul')
      const parentLi = document.createElement('li')
      parentLi.appendChild(parentUl)
      const input = createInputElement()
      const li = createListElement('true', input)
      parentUl.appendChild(li)
      const setFocusToItem = jest.fn()

      const nestedNavigation = createNestedNavigation({ setFocusToItem })
      nestedNavigation.setFocusToPreviousItem(input)

      expect(setFocusToItem).toHaveBeenCalledWith(parentLi)
    })
  })

  describe('setFocusToItem', () => {
    it('should focus on the input checkbox', () => {
      const input = createInputElement()
      const li = createListElement('true', input)
      const spy = jest.spyOn(input, 'focus')
      const nestedNavigation = createNestedNavigation({})
      nestedNavigation.setFocusToItem(li)

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('setParentState', () => {
    it('should set the parent checkbox to indeterminate if some but not all children are checked', () => {
      const allCheckboxes = jest.fn()
      allCheckboxes.mockImplementation(() => [createInputElement(), createInputElement(true)])
      const childUl = document.createElement('ul')
      const input = createInputElement()
      const li = createListElement('true', input)
      li.appendChild(childUl)

      const nestedNavigation = createNestedNavigation({ allCheckboxes })
      nestedNavigation.setParentState(childUl)

      expect(input.indeterminate).toBeTruthy()
      expect(input.checked).toBeFalsy()
    })

    it('should set the parent checkbox to checked if all children are checked', () => {
      const allCheckboxes = jest.fn()
      allCheckboxes.mockImplementation(() => [createInputElement(true), createInputElement(true)])
      const childUl = document.createElement('ul')
      const input = createInputElement()
      const li = createListElement('true', input)
      li.appendChild(childUl)

      const nestedNavigation = createNestedNavigation({ allCheckboxes })
      nestedNavigation.setParentState(childUl)

      expect(input.indeterminate).toBeFalsy()
      expect(input.checked).toBeTruthy()
    })

    it('should set the parent checkbox to unchecked if no children are checked', () => {
      const allCheckboxes = jest.fn()
      allCheckboxes.mockImplementation(() => [createInputElement(), createInputElement()])
      const childUl = document.createElement('ul')
      const input = createInputElement()
      const li = createListElement('true', input)
      li.appendChild(childUl)

      const nestedNavigation = createNestedNavigation({ allCheckboxes })
      nestedNavigation.setParentState(childUl)

      expect(input.indeterminate).toBeFalsy()
      expect(input.checked).toBeFalsy()
    })
  })

  describe.each([true, false])('setCheckbox', (state) => {
    it(`should set itself and parent checkboxes to ${state.toString()} for a closed node`, () => {
      const input = createInputElement()
      const li = createListElement('false', input)
      const currentSelection = state ? 'false' : 'true'
      li.setAttribute('aria-selected', currentSelection)
      const ul = document.createElement('ul')
      ul.setAttribute('role', 'group')
      ul.appendChild(li)
      const setParentState = jest.fn()
      const nestedNavigation = createNestedNavigation({ setParentState })
      nestedNavigation.setCheckbox(input)

      expect(setParentState).toHaveBeenCalledWith(ul)
      expect(li.getAttribute('aria-selected')).toEqual(state.toString())
    })

    it(`should set itself and child checkboxes to ${state.toString()} for an open node`, () => {
      const input = createInputElement(state)
      const li = createListElement('true', input)
      const setParentState = jest.fn()
      const childUl = document.createElement('ul')
      childUl.id = `node-group-${input.id}`
      li.appendChild(childUl)
      document.body.appendChild(li)
      const childCheckboxOne = createInputElement()
      const childCheckboxTwo = createInputElement()
      const allCheckboxes = jest.fn().mockImplementation(() => [childCheckboxOne, childCheckboxTwo])

      const nestedNavigation = createNestedNavigation({ setParentState, allCheckboxes })
      nestedNavigation.setCheckbox(input)

      expect(childCheckboxOne.checked).toEqual(state)
      expect(childCheckboxTwo.checked).toEqual(state)

      document.body.removeChild(li)
    })
  })

  describe('toggleNode', () => {
    it('should set expanded to false and remove the id from local storage if the node is expanded', () => {
      const input = createInputElement()
      const li = createListElement('true', input)
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
      const li = createListElement('false', input)
      const getExpanded = jest.fn().mockImplementation(() => [])
      const nestedNavigation = createNestedNavigation({ getExpanded })
      const spy = jest.spyOn(Storage.prototype, 'setItem')

      nestedNavigation.toggleNode(li, id)
      const expectedResult = JSON.stringify({ expanded: [id] })
      expect(spy).toHaveBeenCalledWith('state', expectedResult)
      expect(li.getAttribute('aria-expanded')).toEqual('true')
    })
  })

  describe('allCheckboxes', () => {
    it('should return all checkboxes', () => {
      const parentUl = document.createElement('ul')
      const topLevelInputs = [createInputElement(), createInputElement(), createInputElement()]
      const childInputs = [createInputElement(), createInputElement(), createInputElement()]
      const topLevelList = topLevelInputs
        .map(el => createListElement('true', el))
      const childUl = document.createElement('ul')
      const childLi = childInputs.map(el => createListElement('true', el))
      childLi.forEach(value => childUl.appendChild(value))

      topLevelList[0].appendChild(childUl)
      topLevelList.forEach(li => parentUl.appendChild(li))

      const nestedNavigation = createNestedNavigation({})
      const checkBoxes = nestedNavigation.allCheckboxes(parentUl, [])
      expect(topLevelInputs.concat(childInputs)).toEqual(checkBoxes)
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
      const li = createListElement('true', input)
      const id = input.id.replace('expander-', '')
      const getExpanded = jest.fn().mockImplementation(() => [id])
      input.id = input.id.replace('expander', 'node-group')

      const nestedNavigation = createNestedNavigation({ getExpanded })
      nestedNavigation.updateExpanded(input)

      expect(li.getAttribute('aria-expanded')).toEqual('true')
    })

    it('hides the item if it is not in the expanded list', () => {
      const input = createInputElement()
      const li = createListElement('true', input)
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
      const navigation = new NestedNavigation(el)

      expect(navigation.getTree()).toEqual(el)
    })
  })
})
