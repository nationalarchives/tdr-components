import express, { Express } from 'express'
import { ComponentData, getComponentsData, kebabCaseToPascalCase, renderHtml } from '../lib/utils'
import { paths } from './config'
import nunjucks from 'nunjucks'

export const app: () => Promise<Express> = async () => {
  const app: Express = express()
  const componentData = await getComponentsData()

  nunjucks.configure([paths.viewPath, paths.componentPath],
    {
      autoescape: true,
      express: app
    })

  app.param('componentName', function (req, res, next, componentName) {
    res.locals.componentData = componentData.find(({ name }) => name === componentName)
    next()
  })

  app.set('view engine', 'njk')

  app.use('/public', express.static('public/'))

  app.get('/', (req, res) => {
    res.locals.componentsData = componentData
    res.render('all-components')
  })

  interface ComponentExamples {
    html: string
    link: string
    name: string
  }

  app.get('/:componentName', (req, res) => {
    const data = res.locals.componentData as ComponentData
    const examples: ComponentExamples[] = data.examples.map(exampleConfig => {
      const macroParameters = JSON.stringify(exampleConfig.data)
      const html = renderHtml(data.name, macroParameters)
      const link = `/${data.name}/${exampleConfig.name}`
      const name = kebabCaseToPascalCase(exampleConfig.name)
      return { html, link, name, description: exampleConfig.description }
    })

    res.locals.component = { componentName: kebabCaseToPascalCase(data.name), examples }
    res.render('component')
  })

  app.get('/:componentName/:exampleName', (req, res) => {
    const componentName = req.params.componentName

    const exampleName = req.params.exampleName === '' ? "default" : req.params.exampleName;

    const exampleConfig = res.locals.componentData.examples.find(
      example => example.name.replace(/ /g, '-') === exampleName
    )
    const macroParameters = JSON.stringify(exampleConfig.data)
    res.locals.componentView = renderHtml(componentName, macroParameters)

    res.render('template')
  })
  return app
}
