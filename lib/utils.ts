import util from "util";
import fs from "fs";
import {join} from "path";
import {readFile} from "fs/promises";
import yaml from "js-yaml"
import {componentPath} from "../app/config";

export const kebabCaseToPascalCase: (value: string) => string =  (value) => {
  return value
    .toLowerCase()
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

export const getDirectories: (componentPath: string) => Promise<string[]> = (componentPath) => {
  return util.promisify(fs.readdir)(componentPath, {withFileTypes: true})
    .then(items => items.filter(item => item.isDirectory()).map(item => item.name))

}

export const getComponentsData: () => Promise<ComponentData[]> = async () => {
  const directories = await getDirectories(componentPath)
  return Promise.all(directories.map(getComponentData))
}

interface ComponentDataParams {
  name: string
  type: string
  required: boolean
  description: string
}
interface ComponentDataExamples {
  name: string
  data: any
}
interface ComponentData {
  name: string
  params: ComponentDataParams
  examples: ComponentDataExamples
}

const getComponentData: (componentName: string) => Promise<ComponentData> = async (componentName) => {
  const yamlPath = join(componentPath, componentName, `${componentName}.yaml`)
  const componentData = yaml.load(await readFile(yamlPath, 'utf8'), { json: true })
  return {
    name: componentName,
    ...componentData
  }
}
