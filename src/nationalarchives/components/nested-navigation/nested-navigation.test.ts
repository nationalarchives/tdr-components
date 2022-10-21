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

const goToFirstChild: () => Promise<void> = async () => {
  await page.waitForSelector('[role="tree"]')
  await expandRootNode()
  await page.keyboard.press('ArrowRight')
}

const goToSecondChild: () => Promise<void> = async () => {
  await goToFirstChild()
  await page.keyboard.press('ArrowDown')
}

const isRootNodeExpanded: () => Promise<boolean> = async () => {
  const nodeItem = await page.$('[role="tree"] .govuk-tna-tree__node-item')
  const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
  return expanded === 'true'
}

const expandRootNode: () => Promise<void> = async () => {
  const isExpanded = await isRootNodeExpanded()
  if (!isExpanded) {
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
  } else {
    await page.keyboard.press('Tab')
  }
}

interface NestedNavigationData {
  name: string
  type: string
  id: string
  children: NestedNavigationData[]
}

describe('Nested navigation', () => {
  let data: NestedNavigationData

  beforeEach(async () => {
    const exampleName = 'default'
    await goToComponent(page, 'nested-navigation', { exampleName })
    const examples = await getExamples('nested-navigation')
    data = examples[0].default.items[0]
  })

  it('should load the page with the checkboxes collapsed', async () => {
    const nodeItem = await page.$('[role="tree"] .govuk-tna-tree__node-item')
    const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
    expect(expanded).toEqual('false')
  })

  it('should select the first checkbox when enter is pressed', async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press("Enter")
    const nodeItem = await page.$(`#${data.id}`)
    const checked = await getPropertyValue(nodeItem, 'ariaChecked')
    await expect(checked).toEqual('true')
  })

  it('should select the first checkbox when space is pressed', async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press("Space")
    const nodeItem = await page.$(`#${data.id}`)
    const checked = await getPropertyValue(nodeItem, 'ariaChecked')
    await expect(checked).toEqual('true')
  })

  it('should expand the node when the expander is clicked', async () => {
    await page.click('.govuk-tna-tree__expander')
    const nodeItem = await page.$(`#${data.id}`)
    const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
    expect(expanded).toEqual('true')
  })

  it('should expand the node when the right arrow is pressed on the closed parent node', async () => {
    await expandRootNode()
    const nodeItem = await page.$(`#${data.id}`)
    const expanded = await getPropertyValue(nodeItem, 'ariaExpanded')
    expect(expanded).toEqual('true')
  })

  it('should select the first child when the right arrow is pressed on the expanded parent node', async () => {
    await goToFirstChild()
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.children[0].id)
  })

  it('should select the second child when the down arrow is pressed on the first child', async () => {
    await goToFirstChild()
    await page.keyboard.press('ArrowDown')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.children[1].id)
  })

  it('should select the first child when the up arrow is pressed on the second child', async () => {
    await goToSecondChild()
    await page.keyboard.press('ArrowUp')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.children[0].id)
  })

  it('should select the root node when the left arrow is pressed on the second child', async () => {
    await goToSecondChild()
    await page.keyboard.press('ArrowLeft')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.id)
  })

  it('should select the root node when the left arrow is pressed on the second child', async () => {
    await goToFirstChild()
    await page.keyboard.press('ArrowLeft')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.id)
  })

  it('should close the root node when the left arrow is pressed if it is expanded', async () => {
    await expandRootNode()
    await page.keyboard.press('ArrowLeft')
    const node = await page.$(`#${data.id}`)
    const expanded = await getPropertyValue(node, 'ariaExpanded')
    expect(expanded).toEqual('false')
  })

  it('should select the last child when end is pressed on the expanded root node', async () => {
    await expandRootNode()
    await page.keyboard.press('End')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.children[1].id)
  })

  it('should select the root node when home is pressed on the last child', async () => {
    await expandRootNode()
    await page.keyboard.press('End')
    await page.keyboard.press('Home')
    const activeElementId = await getActiveId()
    expect(activeElementId).toEqual(data.id)
  })
})
