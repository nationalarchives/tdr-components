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

interface MultiSelectSearchData {
  name: string
  description: string
  items: [{
    name: string
    value: string
  }]
}

function delay(time) {
  return new Promise(function(resolve) {
      setTimeout(resolve, time)
  });
}

describe('Nested navigation', () => {
  let data: MultiSelectSearchData[]

  beforeEach(async () => {
    const exampleName = 'default'
    await goToComponent(page, 'multi-select-search', { exampleName })
    const examples = await getExamples('multi-select-search')
    data = examples[exampleName].items
  })

  it('should change the filtered count when text is input into filter', async () => {
    // Enter text input
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    // Search for..
    await page.keyboard.press('b')
    await page.keyboard.press('i')
    await page.keyboard.press('s')
    // We have to wait for the debouncing.
    await delay(310);

    const filterElement = await page.$('.js-filter-count')
    const content = await getPropertyValue(filterElement, 'innerHTML')

    await expect(content).toEqual("1 displayed, 0 selected")
  });

  it('should change the filtered count when checkbox is checked', async () => {
    // Enter text input
    await page.focus("input[type=checkbox]:first-child");
    await page.keyboard.press('Space')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')

    const filterElement = await page.$('.js-filter-count')
    const content = await getPropertyValue(filterElement, 'innerHTML')

    await expect(content).toEqual("5 displayed, 2 selected")
  });

  it('should change the selected count when checkbox is checked', async () => {
    await page.focus("input[type=checkbox]:first-child");
    await page.keyboard.press('Space')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')

    const filterElement = await page.$('.js-selected-count')
    const content = await getPropertyValue(filterElement, 'innerHTML')

    await expect(content).toEqual("2 selected")
  });

  it('should always show checked items regardless of search term', async () => {
    // Check first element 'Afar'
    await page.focus("input[type=checkbox]:first-child");
    await page.keyboard.press('Space')

    // Return to search
    await page.focus("input[type=text]");

    // Search for 'bis'
    await page.keyboard.press('b')
    await page.keyboard.press('i')
    await page.keyboard.press('s')
    // We have to wait for the debouncing.
    await delay(310);

    // Select first child ("Afar") and check if it is hidden
    const isHidden = await page.$eval('li:first-child', (elem) => {
      return window.getComputedStyle(elem).getPropertyValue('display') === 'none'
    });

    // Should display 'Afar' despite not being a match for search term 'bis'
    await expect(isHidden).toEqual(false)

    const filterElement = await page.$('.js-filter-count')
    const content = await getPropertyValue(filterElement, 'innerHTML')
    await expect(content).toEqual("2 displayed, 1 selected")
  });
})
