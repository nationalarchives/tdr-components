import {CheerioAPI, load} from "cheerio"
import {renderHtml} from "./utils";
import {configureAxe} from "jest-axe"

export const render: (componentName: string, options: string) => CheerioAPI = (componentName, options) => {
  const html = renderHtml(componentName, options)
  return load(html)
}

export const axe = configureAxe({
  rules: {
    'skip-link': { enabled: false },
    region: { enabled: false }
  }
})

