import express, { Express } from 'express'
import { getComponentsData, renderHtml } from '../lib/utils'
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

  app.get('/:componentName/:exampleName', (req, res) => {
    const componentName = req.params.componentName

    const exampleName = req.params.exampleName === '' ? req.params.exampleName : 'default'
    console.log(res.locals.componentData)
    const exampleConfig = res.locals.componentData.examples.find(
      example => example.name.replace(/ /g, '-') === exampleName
    )
    const macroParameters = JSON.stringify(exampleConfig.data)
    res.locals.componentView = renderHtml(componentName, macroParameters)

    res.render('template')
  })
  return app
}
