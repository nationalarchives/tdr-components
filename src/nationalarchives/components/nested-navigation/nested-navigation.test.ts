import { goToComponent } from '../../../../lib/puppeteer-helpers'
import { ElementHandle } from 'puppeteer'

import { getExamples } from '../../../../lib/utils'

const getPropertyValue: (item: ElementHandle | null, name: string) => Promise<string> = async (item, name) => {
  if (item != null) {
    const property = await item.getProperty(name)
    return await property.jsonValue() as string
  }
  return ''
}

const getActiveId: () => Promise<string> = async () => {
  const activeElement = await page.evaluateHandle(() => document.activeElement)
  const idProperty = await activeElement.getProperty('id')
  return await idProperty.jsonValue() as string
}

const goToFirstChild: (className: string) => Promise<void> = async className => {
  await page.waitForSelector('[role="tree"]')
  await expandRootNode(className)
  await page.keyboard.press('ArrowRight')
}

const goToSecondChild: (className: string) => Promise<void> = async className => {
  await goToFirstChild(className)
  await page.keyboard.press('ArrowDown')
}

const isRootNodeExpanded: (className: string) => Promise<boolean> = async className => {
  const nodeItem = await page.$(`[role="tree"] .govuk-tna-tree__node-item-${className}`)
  const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
  return expanded === 'true'
}

const expandRootNode: (className: string) => Promise<void> = async className => {
  const isExpanded = await isRootNodeExpanded(className)
  if (!isExpanded) {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
  } else {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
  }
}

interface NestedNavigationData {
  name: string
  type: string
  id: string
  children: NestedNavigationData[]
}

const getItems: (exampleName: string) => Promise<any[]> = async exampleName => {
  const componentName = 'nested-navigation'
  await goToComponent(page, componentName, { exampleName })
  const examples = await getExamples(componentName)
  return examples[exampleName].items
}

describe.each(['checkboxes', 'radios'])('nestedNavigation %s', className => {
  let data: NestedNavigationData[]
  beforeEach(async () => {
    const exampleName = className === 'checkboxes' ? 'default' : 'radio'
    data = await getItems(exampleName)
  })

  it(`should load the page with the ${className} collapsed`, async () => {
    const nodeItem = await page.$(`[role="tree"] .govuk-tna-tree__node-item-${className}`)
    const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
    expect(expanded).toEqual('false')
  })

  it(`should select the first ${className} when enter is pressed`, async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter')
    const nodeItem = await page.$(`#${className}-list-${data[0].id}`)
    const checked = await getPropertyValue(nodeItem, 'ariaChecked')
    await expect(checked).toEqual('true')
  })

  it(`should select the first ${className} when space is pressed`, async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    const nodeItem = await page.$(`#${className}-list-${data[0].id}`)
    const checked = await getPropertyValue(nodeItem, 'ariaChecked')
    await expect(checked).toEqual('true')
  })

  it('should expand the node when the expander is clicked', async () => {
    await page.click(`.govuk-tna-tree__expander-${className}`)
    const nodeItem = await page.$(`#${className}-list-${data[0].id}`)
    const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
    expect(expanded).toEqual('true')
  })

  it('should expand the node when the right arrow is pressed on the closed parent node', async () => {
    await expandRootNode(className)
    const nodeItem = await page.$(`#${className}-list-${data[0].id}`)
    const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
    expect(expanded).toEqual('true')
  })

  it('should select the first child when the right arrow is pressed on the expanded parent node', async () => {
    await goToFirstChild(className)
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[0].children[0].id}`)
  })

  it('should select the second child when the down arrow is pressed on the first child', async () => {
    await goToFirstChild(className)
    await page.keyboard.press('ArrowDown')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[0].children[1].id}`)
  })

  it('should select the first child when the up arrow is pressed on the second child', async () => {
    await goToSecondChild(className)
    await page.keyboard.press('ArrowUp')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[0].children[0].id}`)
  })

  it('should select the root node when the left arrow is pressed on the second child', async () => {
    await goToSecondChild(className)
    await page.keyboard.press('ArrowLeft')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[0].id}`)
  })

  it('should select the root node when the left arrow is pressed on the second child', async () => {
    await goToFirstChild(className)
    await page.keyboard.press('ArrowLeft')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[0].id}`)
  })

  it('should close the root node when the left arrow is pressed if it is expanded', async () => {
    await expandRootNode(className)
    await page.keyboard.press('ArrowLeft')
    const node = await page.$(`#${className}-list-${data[0].id}`)
    const expanded = await getPropertyValue(node, 'ariaExpanded')
    expect(expanded).toEqual('false')
  })

  it('should select the last child when end is pressed on the expanded root node', async () => {
    await expandRootNode(className)
    await page.keyboard.press('End')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[2].id}`)
  })

  it('should select the root node when home is pressed on the last child', async () => {
    await expandRootNode(className)
    await page.keyboard.press('End')
    await page.keyboard.press('Home')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(`${className}-list-${data[0].id}`)
  })
})

describe('CheckboxNavigationOnly', function () {
  let data: NestedNavigationData[]
  beforeEach(async () => {
    data = await getItems('default')
  })
  it('should select all child checkboxes if the parent checkboxes is checked', async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    const nodeItem = await page.$(`#checkboxes-list-${data[0].id}`)
    const checked = await getPropertyValue(nodeItem, 'ariaChecked')
    await expect(checked).toEqual('true')
    const childIds = data[0].children.map(child => child.id)
    for (const childId of childIds) {
      const nodeItem = await page.$(`#checkboxes-list-${childId}`)
      const childChecked = await getPropertyValue(nodeItem, 'ariaChecked')
      await expect(childChecked).toEqual('true')
    }
  })
})
