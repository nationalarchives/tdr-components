export class NestedNavigation {
  private readonly tree: HTMLUListElement
  private readonly treeItems: HTMLUListElement[]
  private currentFocus: HTMLLIElement

  constructor (tree: HTMLUListElement, treeItems: HTMLUListElement[]) {
    this.tree = tree
    this.treeItems = treeItems
  }

  getCurrentFocus: () => HTMLLIElement = () => {
    return this.currentFocus
  }

  getTree: () => HTMLUListElement = () => {
    return this.tree
  }

  initialiseFormListeners: () => void = () => {
    const tree = document.querySelector('[role=tree]')
    if (tree !== null) {
      tree.addEventListener('keydown', (ev: KeyboardEvent) => {
        this.handleKeyDown(ev)
        ev.preventDefault()
      })
    }

    const button = document.querySelectorAll('[role=tree] button')
    button.forEach((expander, _, __) => {
      expander.addEventListener('click', (ev) => {
        this.handleExpanders(ev.target as HTMLElement)
        ev.preventDefault()
      })
    })

    // All nodes start open so need hiding on first load.
    document.querySelectorAll('[role="group"]').forEach((value, _, __) => {
      this.updateExpanded(value as HTMLInputElement)
    })

    document
      .querySelectorAll('[role=treeitem]')
      .forEach((treeItem, _, __) => {
        treeItem.addEventListener('click', (ev) => {
          if (ev.currentTarget instanceof HTMLLIElement) {
            this.setSelected(ev.currentTarget)
            this.setFocusToItem(ev.currentTarget)
          }
          ev.stopImmediatePropagation()
        })
      })

    document
      .querySelectorAll('[role=tree] .govuk-checkboxes__item')
      .forEach((checkbox: HTMLElement) => {
        const input: HTMLInputElement | null = checkbox.querySelector('input')
        const label: HTMLLabelElement | null = checkbox.querySelector('label')
        if ((input != null) && (label != null)) {
          this.replaceCheckboxWithSpan(input, label)
        }
      })

    this.tree.addEventListener('focus', () => {
      const firstSelected: HTMLLIElement | null = document.querySelector(
        '[role=treeitem][aria-selected=true]'
      )
      this.updateFocus(firstSelected)
    })
  }

  replaceCheckboxWithSpan: (input: HTMLInputElement, label: HTMLLabelElement) => void = (input, label) => {
    const spanInput = document.createElement('span')
    for (const name of input.getAttributeNames()) {
      if (!['type'].includes(name)) {
        const inputAttribute = input.getAttribute(name)
        if (inputAttribute != null) {
          spanInput.setAttribute(name, inputAttribute)
        }
      }
      spanInput.setAttribute('aria-hidden', 'true')
    }

    input.parentElement?.appendChild(spanInput)
    input.remove()

    const spanLabel = document.createElement('span')
    for (const name of label.getAttributeNames()) {
      if (!['for'].includes(name)) {
        const labelAttribute = label.getAttribute(name)
        if (labelAttribute != null) {
          spanLabel.setAttribute(name, labelAttribute)
        }
      }
    }
    if (label.textContent != null) {
      spanLabel.appendChild(document.createTextNode(label.textContent))
    }
    if (label.parentElement != null) {
      label.parentElement.appendChild(spanLabel)
      label.remove()
    }
  }

  updateFocus: (element?: HTMLLIElement | null) => void = element => {
    if (element != null) {
      this.setFocusToItem(element)
    } else {
      this.setFocusToItem(this.tree.firstElementChild as HTMLLIElement)
    }
  }

  updateExpanded: (value: HTMLInputElement) => void = value => {
    const id = value.getAttribute('id')
    if (id !== null) {
      const expanded = this.getExpanded()
      if (!(expanded.includes(id.replace('node-group-', '')))) {
        (value.parentNode as HTMLElement).setAttribute(
          'aria-expanded',
          'false'
        )
      }
    }
  }

  getExpanded: () => string[] = () => {
    const storageItem = localStorage.getItem('state')
    if (storageItem !== null) {
      return JSON.parse(storageItem).expanded
    } else {
      return []
    }
  }

  allChildren: (
    ul: HTMLUListElement,
    elements: HTMLLIElement[]
  ) => HTMLLIElement[] = (ul, elements) => {
      for (let i = ul.children.length - 1; i >= 0; i--) {
        const item: HTMLLIElement | null = ul.children.item(
          i
        ) as HTMLLIElement | null
        if (item !== null) {
          if (item.nodeName === 'LI') {
            elements.push(item)
          }
          // If children includes a UL/role=group then get children
          Array.from(item.children)
            .filter((el) => el.nodeName === 'UL')
            .forEach((el) => this.allChildren(el as HTMLUListElement, elements))
        }
      }
      return elements
    }

  toggleNode: (li: HTMLLIElement, id: string) => void = (li, id) => {
    const expanded = this.getExpanded()

    if (li.getAttribute('aria-expanded') === 'false') {
      // Expand
      li.setAttribute('aria-expanded', 'true')
      expanded.push(id)
    } else {
      // Collapse
      li.setAttribute('aria-expanded', 'false')
      expanded.splice(expanded.indexOf(id))
    }
    localStorage.setItem('state', JSON.stringify({ expanded }))
  }

  setSelected: (li: HTMLLIElement) => void = (li) => {
    const isSelected: boolean = li.getAttribute('aria-selected') === 'true'
    li.setAttribute('aria-selected', !isSelected ? 'true' : 'false')
    li.setAttribute('aria-checked', !isSelected ? 'true' : 'false')
    // If this is a node, traverse down
    if (li.hasAttribute('aria-expanded')) {
      const childrenGroup: HTMLUListElement | null = document.querySelector(
        `#node-group-${li.id}`
      )
      if (childrenGroup != null) {
        const children = this.allChildren(childrenGroup, [])
        for (const child of children) {
          child.setAttribute(
            'aria-selected',
            !isSelected ? 'true' : 'false'
          )
          child.setAttribute(
            'aria-checked',
            !isSelected ? 'true' : 'false'
          )
        }
      }
    }
    // Traverse up
    const parentGroup: HTMLUListElement | null = li.closest('[role=group]')
    this.setParentState(parentGroup)
  }

  setParentState: (ul: HTMLUListElement | null) => void = (ul) => {
    // Gets all descendant checkboxes & sets UL parent checkbox accordingly
    if (ul !== null) {
      const all = this.allChildren(ul, [])
      const countChecked = all.filter(
        (a) => a.getAttribute('aria-selected') === 'true'
      ).length
      const parentLI: HTMLLIElement | undefined | null = ul.parentNode as HTMLLIElement
      if (parentLI !== null) {
        if (ul.getAttribute('role') !== 'tree') {
          if (countChecked > 0 && countChecked < all.length) {
            parentLI.setAttribute('aria-checked', 'mixed')
          }
          // All children checked
          if (countChecked === all.length) {
            parentLI.setAttribute('aria-checked', 'true')
            parentLI.setAttribute('aria-selected', 'true')
          }
          // None checked
          if (countChecked === 0) {
            parentLI.setAttribute('aria-selected', 'false')
            parentLI.setAttribute('aria-checked', 'false')
          }
          const nextEl: HTMLUListElement | null | undefined =
            ul.parentElement?.closest('[role=group]')
          if (nextEl != null) {
            this.setParentState(nextEl)
          }
        }
      }
    }
  }

  setFocusToItem: (element: HTMLLIElement) => void = (element) => {
    Array.from(this.treeItems).forEach((item) => {
      (item as HTMLElement).tabIndex = -1
    })
    element.tabIndex = 0
    element.focus()
    this.currentFocus = element
  }

  setFocusToPreviousItem: (input: HTMLLIElement) => void = (input) => {
    const li: HTMLLIElement | null = input.closest('li')
    // Do you have a sibling
    if (li?.previousElementSibling != null) {
      // Does sibling have an aria-expanded=true
      if (li.previousElementSibling.getAttribute('aria-expanded') === 'true') {
        // Go to sibling's last child
        const lastChild: HTMLLIElement | null = li.previousElementSibling.querySelector(':scope > ul > li:last-child')
        if (lastChild !== null) {
          this.setFocusToItem(lastChild)
        }
      } else {
        // Go to previous sibling
        this.setFocusToItem(li.previousElementSibling as HTMLLIElement)
      }
    } else if (li?.parentElement != null) {
      // Go to parent
      this.setFocusToItem(li.parentElement.closest('li') as HTMLLIElement)
    }
  }

  setFocusToNextItem: (input: HTMLLIElement) => void = (input) => {
    const li: HTMLLIElement | null = input.closest('li')
    if (li !== null) {
      // Do you have a child
      if (li.getAttribute('aria-expanded') === 'true') {
        // go to first child
        const firstChild: HTMLLIElement | null = li.querySelector('ul > li')
        if (firstChild !== null) {
          this.setFocusToItem(firstChild)
        }
      } else {
        if (li.nextElementSibling !== null) {
          // Go to next sibling
          this.setFocusToItem(li.nextElementSibling as HTMLLIElement)
        } else if (li.parentElement !== null) {
          // Go to parents next sibling
          const parent: HTMLLIElement | null = li.parentElement.closest('li')
          if (parent?.nextElementSibling != null) {
            this.setFocusToItem(parent.nextElementSibling as HTMLLIElement)
          }
        }
      }
    }
  }

  handleKeyDown: (ev: KeyboardEvent) => void = (ev) => {
    switch (ev.key) {
      case 'Enter':
      case ' ':
        // Check or uncheck checkbox
        this.setSelected(this.currentFocus)
        ev.preventDefault()
        break

      case 'ArrowUp':
        // Moves focus to the previous node that is focusable without opening or closing a node.
        this.setFocusToPreviousItem(this.currentFocus)
        ev.preventDefault()
        break

      case 'ArrowDown':
        // Moves focus to the next node that is focusable without opening or closing a node.
        this.setFocusToNextItem(this.currentFocus)
        ev.preventDefault()
        break

      case 'ArrowRight':
        if (this.currentFocus.getAttribute('aria-expanded') === 'false') {
          // When focus is on a closed node, opens the node; focus does not move.
          this.toggleNode(this.currentFocus, this.currentFocus.id)
        } else if (this.currentFocus.getAttribute('aria-expanded') === 'true') {
          // When focus is on an open node, moves focus to the first child node.
          this.setFocusToNextItem(this.currentFocus)
        }
        // When focus is on an end node (a tree item with no children), does nothing.
        ev.preventDefault()
        // When focus is on an end node (a tree item with no children), does nothing.
        break

      case 'ArrowLeft':
        if (this.currentFocus.getAttribute('aria-expanded') === 'true') {
          // When focus is on an open node, closes the node.
          this.toggleNode(this.currentFocus, this.currentFocus.id)
        } else if (this.currentFocus.getAttribute('role') !== 'tree') {
          // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
          const parent = this.currentFocus.parentElement
          if (parent != null) {
            this.setFocusToItem(
              parent.closest('li') as HTMLLIElement
            )
          }
        }
        // When focus is on a closed `tree`, does nothing.
        ev.preventDefault()
        // When focus is on a closed `tree`, does nothing.
        break

      case 'Home':
        // Moves focus to the first node in the tree without opening or closing a node.
        this.setFocusToItem(this.tree.firstElementChild as HTMLLIElement)
        ev.preventDefault()
        break

      case 'End': {
        // Moves focus to the last node in the tree that is focusable without opening the node.
        let lastLi: HTMLLIElement | null = this.tree.lastElementChild as HTMLLIElement
        while (lastLi?.getAttribute('aria-expanded') === 'true') {
          lastLi = lastLi.lastElementChild?.lastElementChild as HTMLLIElement
        }
        this.setFocusToItem(lastLi)
        ev.preventDefault()
        break
      }
      default:
        break
    }
  }

  handleExpanders: (target: Element) => void = (target: Element) => {
    const newId = target.id.replace('expander-', 'node-group-')
    const nodeGroup: HTMLUListElement | null = document.querySelector(
      `#${newId}`
    )
    if (nodeGroup !== null) {
      const parent: HTMLLIElement | null = nodeGroup.parentNode as HTMLLIElement
      if (parent != null) {
        this.toggleNode(
          parent,
          target.id.replace('expander-', '')
        )
        this.setFocusToItem(parent)
      }
    }
  }
}
