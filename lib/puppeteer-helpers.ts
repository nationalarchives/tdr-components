import { Page } from 'puppeteer'

interface PageOptions {
  exampleName: string
}

export const goToComponent: (page: Page, componentName: string, options: PageOptions) => Promise<Page> = async (page, componentName, { exampleName }) => {
  const componentPath = `/${componentName}/${exampleName}`
  const { href } = new URL(componentPath, `http://localhost:${3000}`)

  await page.goto(href)
  await page.bringToFront()

  return page
}
