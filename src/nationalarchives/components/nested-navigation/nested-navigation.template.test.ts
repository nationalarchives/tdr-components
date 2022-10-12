import {goToComponent} from "../../../../lib/puppeteer-helpers"
describe('Nested navigation', () => {
  beforeAll(async () => {
    const exampleName = "default"
    await goToComponent(page, "nested-navigation", {exampleName});
  });

  it('should select the first checkbox when tab and space are pressed"', async () => {
    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    console.log(await page.content())
    const isChecked = await page.evaluate(() => {
      const el: HTMLInputElement = document.querySelector("input[name=Test]")
      return el.checked
    })
    await expect(isChecked).toBeTruthy()
  });
});
