export class NestedNavigation {
  private readonly tree: HTMLUListElement

  constructor (tree: HTMLUListElement) {
    this.tree = tree
  }

  getTree: () => HTMLUListElement = () => {
    return this.tree
  }

  initialiseFormListeners: () => void = () => {
    const tree = document.querySelector('[role=tree]')
    if (tree !== null) {
      tree.addEventListener('keydown', (ev: KeyboardEvent) => {
        this.handleKeyDown(ev.key, ev.target as HTMLInputElement)
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
      .querySelectorAll('[role=tree] [type=checkbox]')
      .forEach((checkBox, _, __) => {
        checkBox.addEventListener('change', (ev) => {
          if (ev.target instanceof HTMLInputElement) {
            this.setCheckbox(ev.target)
          }
        })
      })
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

  allCheckboxes: (
    ul: HTMLUListElement,
    elements: HTMLInputElement[]
  ) => HTMLInputElement[] = (ul, elements) => {
      for (let i = ul.children.length - 1; i >= 0; i--) {
        const item: HTMLLIElement | null = ul.children.item(
          i
        ) as HTMLLIElement | null
        if (item !== null) {
          if (item.nodeName === 'LI') {
            const itemCheckbox: HTMLInputElement | null = item.querySelector(
              'input[type=checkbox]'
            )
            if (itemCheckbox !== null) {
              elements.push(itemCheckbox)
            }
          }
          // If children includes a UL/role=group then get children
          Array.from(item.children)
            .filter((el) => el.nodeName === 'UL')
            .forEach((el) => this.allCheckboxes(el as HTMLUListElement, elements))
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

  setCheckbox: (input: HTMLInputElement) => void = (input) => {
    const li: HTMLLIElement | null | undefined = input.parentElement?.closest('li')
    if (li != null) {
      li.setAttribute(
        'aria-selected',
        li.getAttribute('aria-selected') === 'false' ? 'true' : 'false'
      )

      // If this is a node, traverse down
      if (li.hasAttribute('aria-expanded')) {
        const childrenGroup: HTMLUListElement | null = document.querySelector(
          `#node-group-${input.id}`
        )
        if (childrenGroup !== null) {
          const checkboxes = this.allCheckboxes(childrenGroup, [])
          for (const checkbox of checkboxes) {
            checkbox.checked = input.checked
            checkbox.indeterminate = false
          }
        }
      }
      // Traverse up
      const parentGroup: HTMLUListElement | null = input.closest('[role=group]')
      this.setParentState(parentGroup)
    }
  }

  setParentState: (ul: HTMLUListElement | null) => void = (ul) => {
    // Gets all descendant checkboxes & sets UL parent checkbox accordingly
    if (ul !== null) {
      const all = this.allCheckboxes(ul, [])
      const countChecked = all.filter(
        (a) => a.checked || a.indeterminate
      ).length
      const parentNode: ParentNode | undefined | null = ul.parentNode
      if (parentNode !== null) {
        const parentCheckbox: HTMLInputElement | null =
          parentNode.querySelector('input[type=checkbox]')
        if ((parentCheckbox !== null) && ul.getAttribute('role') !== 'tree') {
          // One or more children but less than all
          if (countChecked > 0 && countChecked < all.length) {
            parentCheckbox.indeterminate = true
          }
          // All children checked
          if (countChecked === all.length) {
            parentCheckbox.indeterminate = false
            parentCheckbox.checked = true
          }
          // None checked
          if (countChecked === 0) {
            parentCheckbox.checked = false
            parentCheckbox.indeterminate = false
          }
          // Recursively call closest parent node.
          const nextEl: HTMLUListElement | null | undefined =
            ul.parentElement?.closest('[role=group]')
          if (nextEl != null) {
            this.setParentState(nextEl)
          }
        }
      }
    }
  }

  setFocusToItem: (element: HTMLElement) => void = (element) => {
    const input: HTMLInputElement | null = element?.querySelector(
      'input[type=checkbox]'
    )
    if (input !== null) {
      input.tabIndex = 0
      input.focus()
    }
  }

  setFocusToPreviousItem: (input: HTMLElement) => void = (input) => {
    const li: HTMLLIElement | null = input.closest('li')
    // Do you have a sibling
    if (li?.previousElementSibling != null) {
      // Does sibling have an aria-expanded=true
      if (li.previousElementSibling.getAttribute('aria-expanded') === 'true') {
        // Go to sibling's last child
        const lastChild: HTMLElement | null = li.previousElementSibling.querySelector(':scope > ul > li:last-child')
        if (lastChild !== null) {
          this.setFocusToItem(lastChild)
        }
      } else {
        // Go to previous sibling
        this.setFocusToItem(li.previousElementSibling as HTMLElement)
      }
    } else if (li?.parentElement != null) {
      // Go to parent
      this.setFocusToItem(li.parentElement.closest('li') as HTMLElement)
    }
  }

  setFocusToNextItem: (input: HTMLElement) => void = (input) => {
    const li: HTMLLIElement | null = input.closest('li')
    if (li !== null) {
      // Do you have a child
      if (li.getAttribute('aria-expanded') === 'true') {
        // go to first child
        const firstChild: HTMLElement | null = li.querySelector('ul > li')
        if (firstChild !== null) {
          this.setFocusToItem(firstChild)
        }
      } else {
        if (li.nextElementSibling !== null) {
          // Go to next sibling
          this.setFocusToItem(li.nextElementSibling as HTMLElement)
        } else if (li.parentElement !== null) {
          // Go to parents next sibling
          const parent: HTMLLIElement | null = li.parentElement.closest('li')
          if (parent?.nextElementSibling != null) {
            this.setFocusToItem(parent.nextElementSibling as HTMLElement)
          }
        }
      }
    }
  }

  handleKeyDown: (key: String, input: HTMLInputElement) => void = (key, input) => {
    let li: HTMLLIElement | null
    switch (key) {
      case 'Enter':
      case ' ':
        // Check or uncheck checkbox
        input.checked = !input.checked
        input.indeterminate = false
        this.setCheckbox(input)
        break

      case 'ArrowUp':
        // Moves focus to the previous node that is focusable without opening or closing a node.
        this.setFocusToPreviousItem(input)
        break

      case 'ArrowDown':
        // Moves focus to the next node that is focusable without opening or closing a node.
        this.setFocusToNextItem(input)
        break

      case 'ArrowRight':
        li = input.closest('li')
        if (li !== null) {
          if (li.getAttribute('aria-expanded') === 'false') {
            // When focus is on a closed node, opens the node; focus does not move.
            this.toggleNode(
              li,
              input.id.replace('expander-', '')
            )
          } else if (li.getAttribute('aria-expanded') === 'true') {
            // When focus is on an open node, moves focus to the first child node.
            this.setFocusToNextItem(input)
          }
        }
        // When focus is on an end node (a tree item with no children), does nothing.
        break

      case 'ArrowLeft':
        li = input.closest('li')
        if (li !== null) {
          if (li.getAttribute('aria-expanded') === 'true') {
            // When focus is on an open node, closes the node.
            this.toggleNode(
              li,
              input.id.replace('expander-', '')
            )
          } else if (li.getAttribute('role') !== 'tree' && (li.parentElement !== null)) {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            this.setFocusToItem(li.parentElement.closest('li') as HTMLElement)
          }
        }
        // When focus is on a closed `tree`, does nothing.
        break

      case 'Home':
        // Moves focus to the first node in the tree without opening or closing a node.
        this.setFocusToItem(this.getTree().firstElementChild as HTMLLIElement)
        break

      case 'End': {
        // Moves focus to the last node in the tree that is focusable without opening the node.
        let lastLi: HTMLLIElement | null = this.getTree().lastElementChild as HTMLLIElement
        while (((lastLi?.lastElementChild) != null) && lastLi.getAttribute('aria-expanded') === 'true') {
          lastLi = lastLi.lastElementChild.lastElementChild as HTMLLIElement
        }
        this.setFocusToItem(lastLi)
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
      const parent: HTMLElement = nodeGroup.parentNode as HTMLElement
      this.toggleNode(
        parent as HTMLLIElement,
        target.id.replace('expander-', '')
      )
      this.setFocusToItem(parent)
    }
  }
}
