import util from 'util'
import fs from 'fs'
import { join } from 'path'
import { readFile } from 'fs/promises'
import yaml from 'js-yaml'
import { paths } from '../app/config'
import nunjucks from 'nunjucks'

export const kebabCaseToPascalCase: (value: string) => string = (value) => {
  return value
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

export const getDirectories: (componentPath: string) => Promise<string[]> = async (componentPath) => {
  return await util.promisify(fs.readdir)(componentPath, { withFileTypes: true })
    .then(items => items.filter(item => item.isDirectory()).map(item => item.name))
}

export const getExamples: (componentName: string) => Promise<{ [key: string]: any }> = async (componentName) => {
  const componentData = await getComponentData(componentName)
  return componentData.examples.reduce((obj, example) => ({...obj, [example.name]: example.data}) ,{})
}

export const getComponentsData: () => Promise<ComponentData[]> = async () => {
  const directories = await getDirectories(paths.componentPath)
  return await Promise.all(directories.map(getComponentData))
}

export const renderHtml: (componentName: string, options: string) => string = (componentName, options) => {
  nunjucks.configure(paths.componentPath)
  const macroName = `tdr${kebabCaseToPascalCase(componentName)}`
  const bodyString = `{% from '${componentName}/macro.njk' import ${macroName} %}
      {{ ${macroName}(${options}) }}`
  return nunjucks.renderString(bodyString, {})
}

interface ComponentDataParams {
  name: string
  type: string
  required: boolean
  description: string
}
interface ComponentDataExamples {
  name: string
  description: string
  data: any
}
export interface ComponentData {
  name: string
  params: ComponentDataParams
  examples: ComponentDataExamples[]
}

const getComponentData: (componentName: string) => Promise<ComponentData> = async (componentName) => {
  const yamlPath = join(paths.componentPath, componentName, `${componentName}.yaml`)
  const componentData: any = yaml.load(await readFile(yamlPath, 'utf8'), { json: true })
  return {
    name: componentName,
    ...componentData
  }
}
