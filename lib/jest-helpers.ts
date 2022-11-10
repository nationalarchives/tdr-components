import { load } from 'cheerio'
import { renderHtml } from './utils'
import { configureAxe, JestAxeConfigureOptions } from 'jest-axe'

export const render: (componentName, options) => cheerio.Root = (componentName, options) => {
  const html = renderHtml(componentName, options)
  return load(html)
}

const options: JestAxeConfigureOptions = {
  globalOptions: {
    rules: [
      { id: 'skip-link', enabled: false },
      { id: 'region', enabled: false }
    ]
  }
}

export const axe = configureAxe(options)
