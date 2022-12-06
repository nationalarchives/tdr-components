export class NestedNavigation {
  private readonly tree: HTMLUListElement
  private readonly treeItems: HTMLUListElement[]
  private currentFocus: HTMLLIElement | null

  constructor (tree: HTMLUListElement, treeItems: HTMLUListElement[]) {
    this.tree = tree
    this.treeItems = treeItems
    this.currentFocus = null
  }

  getCurrentFocus: () => HTMLLIElement | null = () => {
    return this.currentFocus
  }

  getTree: () => HTMLUListElement = () => {
    return this.tree
  }

  initialiseFormListeners: (itemType: string) => void = itemType => {
    if (this.tree !== null) {
      this.tree.addEventListener('keydown', (ev: Event) => {
        if (ev instanceof KeyboardEvent) {
          this.handleKeyDown(ev, itemType)
        }
      })
    }

    const button = document.querySelectorAll(`.govuk-tna-tree__expander-${itemType}`)
    button.forEach((expander, _, __) => {
      expander.addEventListener('click', (ev) => {
        this.handleExpanders(ev.target as HTMLElement, itemType)
        ev.preventDefault()
        ev.stopPropagation()
      })
    })

    // All nodes start open so need hiding on first load.
    document.querySelectorAll('[role="group"]').forEach((value, _, __) => {
      if (value.id.includes(itemType)) {
        this.updateExpanded(value as HTMLInputElement, itemType)
      }
    })

    document
      .querySelectorAll('[role=treeitem]')
      .forEach((treeItem, _, __) => {
        if (treeItem.id.includes(itemType)) {
          treeItem.addEventListener('click', (ev) => {
            if (ev.currentTarget instanceof HTMLLIElement) {
              this.setSelected(ev.currentTarget, itemType)
              this.setFocusToItem(ev.currentTarget)
            }
            ev.stopImmediatePropagation()
          })
        }
      })
    document
      .querySelectorAll(`[role=tree] .govuk-${itemType}__item`)
      .forEach((checkbox: Element, _, __) => {
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
      if (!['type', 'tabindex'].includes(name)) {
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

  updateExpanded: (value: HTMLInputElement, itemType: string) => void = (value, itemType) => {
    const id = value.getAttribute('id')
    if (id !== null) {
      const expanded = this.getExpanded(itemType)
      if (!(expanded.includes(id.replace('node-group', 'list')))) {
        (value.parentNode as HTMLElement).setAttribute(
          'aria-expanded',
          'false'
        )
      }
    }
  }

  getExpanded: (itemType: string) => string[] = itemType => {
    const storageItem = localStorage.getItem(`${itemType}-state`)
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
          // If children include a UL/role=group then get children
          Array.from(item.children)
            .filter((el) => el.nodeName === 'UL')
            .forEach((el) => this.allChildren(el as HTMLUListElement, elements))
        }
      }
      return elements
    }

  toggleNode: (li: HTMLLIElement, id: string, itemType: string) => void = (li, id, itemType) => {
    const expanded = this.getExpanded(itemType)

    if (li.getAttribute('aria-expanded') === 'false') {
      // Expand
      li.setAttribute('aria-expanded', 'true')
      expanded.push(id)
    } else {
      // Collapse
      li.setAttribute('aria-expanded', 'false')
      expanded.splice(expanded.indexOf(id))
    }
    localStorage.setItem(`${itemType}-state`, JSON.stringify({ expanded }))
  }

  setSelected: (li: HTMLLIElement | null, itemType: string) => void = (li, itemType) => {
    if (li != null) {
      const isSelected: boolean = li.getAttribute('aria-selected') === 'true'
      li.setAttribute('aria-selected', !isSelected ? 'true' : 'false')
      li.setAttribute('aria-checked', !isSelected ? 'true' : 'false')
      if (itemType === 'radios' && !isSelected) {
        // For radio buttons, deselect all others
        document.querySelectorAll('li[aria-selected=true]').forEach(el => {
          if (el.id !== li.id) {
            el.setAttribute('aria-selected', 'false')
            el.setAttribute('aria-checked', 'false')
          }
        })
      } else {
        // If this is a node, traverse down
        if (li.hasAttribute('aria-expanded')) {
          const childrenGroup: HTMLUListElement | null = document.querySelector(
            `#${itemType}-node-group-${li.id.replace(`${itemType}-list-`, '')}`
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
    }
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

  setFocusToItem: (element?: HTMLLIElement | null) => void = (element) => {
    Array.from(this.treeItems).forEach((item) => {
      (item as HTMLElement).tabIndex = -1
    })
    if (element != null) {
      element.tabIndex = 0
      element.focus()
      this.currentFocus = element
    }
  }

  setFocusToPreviousItem: (input: HTMLLIElement | null) => void = (input) => {
    if (input != null) {
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
  }

  setFocusToNextItem: (input: HTMLLIElement | null) => void = (input) => {
    if (input != null) {
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
  }

  handleKeyDown: (ev: KeyboardEvent, itemType: string) => void = (ev, itemType) => {
    switch (ev.key) {
      case 'Enter':
      case ' ':
        // Check or uncheck checkbox
        this.setSelected(this.currentFocus, itemType)
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
        this.processArrowRightEvent(ev, itemType)
        break

      case 'ArrowLeft':
        this.processArrowLeftEvent(ev, itemType)
        // When focus is on a closed `tree`, does nothing.
        break

      case 'Home':
        // Moves focus to the first node in the tree without opening or closing a node.
        this.setFocusToItem(this.tree.firstElementChild as HTMLLIElement)
        ev.preventDefault()
        break

      case 'End': {
        this.processEndEvent(ev)
        break
      }
      default:
        break
    }
  }

  private readonly processEndEvent: (ev: KeyboardEvent) => void = ev => {
    // Moves focus to the last node in the tree that is focusable without opening the node.
    let lastLi: HTMLLIElement | null = this.tree.lastElementChild as HTMLLIElement
    while (lastLi?.getAttribute('aria-expanded') === 'true') {
      lastLi = lastLi.lastElementChild?.lastElementChild as HTMLLIElement
    }
    this.setFocusToItem(lastLi)
    ev.preventDefault()
  }

  private readonly processArrowLeftEvent: (ev: KeyboardEvent, itemType: string) => void = (ev, itemType) => {
    if (this.currentFocus?.getAttribute('aria-expanded') === 'true') {
      // When focus is on an open node, closes the node.
      this.toggleNode(this.currentFocus, this.currentFocus.id, itemType)
    } else if (this.currentFocus?.getAttribute('role') !== 'tree') {
      // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
      const parent = this.currentFocus?.parentElement
      if (parent != null) {
        this.setFocusToItem(
          parent.closest('li') as HTMLLIElement
        )
      }
    }
    ev.preventDefault()
  }

  private readonly processArrowRightEvent: (ev: KeyboardEvent, itemType: string) => void = (ev, itemType) => {
    if (this.currentFocus?.getAttribute('aria-expanded') === 'false') {
      // When focus is on a closed node, opens the node; focus does not move.
      this.toggleNode(this.currentFocus, this.currentFocus.id, itemType)
    } else if (this.currentFocus?.getAttribute('aria-expanded') === 'true') {
      // When focus is on an open node, moves focus to the first child node.
      this.setFocusToNextItem(this.currentFocus)
    }
    // When focus is on an end node (a tree item with no children), does nothing.
    ev.preventDefault()
  }

  handleExpanders: (target: Element, itemType: string) => void = (target: Element, itemType) => {
    const newId = target.id.replace('expander-', 'node-group-')
    const nodeGroup: HTMLUListElement | null = document.querySelector(
      `#${newId}`
    )
    if (nodeGroup !== null) {
      const parent: HTMLLIElement | null = nodeGroup.parentNode as HTMLLIElement
      if (parent != null) {
        this.toggleNode(
          parent,
          target.id.replace('expander-', ''),
          itemType
        )
        this.setFocusToItem(parent)
      }
    }
  }
}
