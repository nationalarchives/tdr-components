import {goToComponent} from "../../../../lib/puppeteer-helpers"
describe('Nested navigation', () => {
  beforeAll(async () => {
    const exampleName = "default"
    await goToComponent(page, "nested-navigation", {exampleName});
  });

  it('should select the first checkbox when tab and space are pressed"', async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    const isChecked = await page.evaluate(() => {
      const el: HTMLInputElement = document.querySelector(".govuk-checkboxes__input")
      return el.checked
    })
    await expect(isChecked).toBeTruthy()
  });
});
