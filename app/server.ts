import express, {Express} from "express"
import nunjucks from "nunjucks"
import {getComponentsData, kebabCaseToPascalCase} from "../lib/utils";
import {componentPath} from "./config";


export const app: () => Promise<Express> = async () => {

  const app: Express = express()
  const componentData = await getComponentsData()
  nunjucks.configure(componentPath, { autoescape: true })

  app.param('componentName', function (req, res, next, componentName) {
    res.locals.componentData = componentData.find(({ name }) => name === componentName)
    next()
  })

  app.get('/:componentName/:exampleName', (req, res) => {
    const componentName = req.params.componentName
    const macroName = `tdr${kebabCaseToPascalCase(req.params.componentName)}`
    const exampleName = req.params.exampleName || 'default'
    const exampleConfig = res.locals.componentData.examples.find(
      example => example.name.replace(/ /g, '-') === exampleName
    )
    const macroParameters = JSON.stringify(exampleConfig.data)

    const bodyString = `{% from '${componentName}/macro.njk' import ${macroName} %}
      {{ ${macroName}(${macroParameters}) }}`
    const body = nunjucks.renderString(bodyString)
    res.send(body)
  })
  return app
}

