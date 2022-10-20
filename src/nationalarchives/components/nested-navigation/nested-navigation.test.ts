import { goToComponent } from '../../../../lib/puppeteer-helpers'
import {ElementHandle} from "puppeteer";
// @ts-ignore
import type {KeyInput} from "puppeteer"
jest.setTimeout(10000000)
const getPropertyValue: (item: ElementHandle | null, name: string) => Promise<string> = async (item, name) => {
  if(item) {
    const property = await item.getProperty(name)
    return await property.jsonValue() as string
  }
  return ""
}

const getActiveId: () => Promise<string> = async () => {
  const activeElement = await page.evaluateHandle(() => document.activeElement)
  const idProperty = await activeElement.getProperty("id")
  return await idProperty.jsonValue() as string
}

const goToFirstChild: () => Promise<void> = async () => {
  await page.keyboard.press("Tab")
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("ArrowRight")
}

describe('Nested navigation', () => {
  beforeEach(async () => {
    const exampleName = 'default'
    await goToComponent(page, 'nested-navigation', { exampleName })
  })

  it('should load the page with the checkboxes collapsed', async () => {
    const nodeItem = await page.$('[role="tree"] .govuk-tna-tree__node-item')
    const expanded = await getPropertyValue(nodeItem, "ariaExpanded")
    expect(expanded).toEqual("false")
  })

  it.each(["Enter", "Space"])('should select the first checkbox', async (key: KeyInput) => {
    await page.keyboard.press("Tab")
    await page.keyboard.press(key)
    const nodeItem = await page.$('.govuk-tna-tree__node-item')
    const checked = await getPropertyValue(nodeItem, "ariaChecked")
    await expect(checked).toEqual("true")
  })

  it('should expand the node when the expander is clicked', async () => {
    await page.click('.govuk-tna-tree__expander')
    const nodeItem = await page.$('[role="tree"] .govuk-tna-tree__node-item')
    const expanded = await getPropertyValue(nodeItem, "ariaExpanded")
    expect(expanded).toEqual("true")
  })

  it('should expand the node when the right arrow is pressed on the closed parent node', async () => {
    const itemSelector = '[role="tree"] .govuk-tna-tree__node-item'
    await page.keyboard.press("Tab")
    await page.keyboard.press("ArrowRight")
    const nodeItem = await page.$(itemSelector)
    const expanded = await getPropertyValue(nodeItem, "ariaExpanded")
    expect(expanded).toEqual("true")
  })

  it('should select the first child when the right arrow is pressed on the expanded parent node', async () => {
    await goToFirstChild()
    const activeElementId = await getActiveId()
    const nodeItem = await page.$$('.govuk-tna-tree__item')
    const id = await getPropertyValue(nodeItem[0], "id")
    expect(activeElementId).toEqual(id)
  })

  it('should select the second child when the down arrow is pressed on the first child', async () => {
    await goToFirstChild()
    await page.keyboard.press("ArrowDown")
    const activeElementId = await getActiveId()
    const nodeItem = await page.$$('.govuk-tna-tree__item')
    const id = await getPropertyValue(nodeItem[1], "id")
    expect(activeElementId).toEqual(id)
  })
})
