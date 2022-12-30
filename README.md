# TDR Components

This library contains custom components based on the [GovUK frontend](https://design-system.service.gov.uk/).

The project is divided into different directories

## The app directory
This is [an express app](https://expressjs.com/) which allows you to view the individual components in a browser. It is made up of the following files

* `config.ts` Custom config such as path names which is used in multiple places.
* `server.ts` The code for the express server.
* `start.ts`  Helper code to start the express server.
* `all.ts` A file which includes all the necessary javascript for the components. This is loaded for each page in the app.
* `views/template.njk` A nunjucks template which is used to render a single example of a component in the browser.
* `views/component.njk` A nunjucks template used to render all component examples.
* `views/all-components.njk` A nunjucks template used to render a list of links to the components.
* `views/banner.njk` A nunjucks template used to render the page banner

### Running the app.
The following commands will install, compile and serve the compiled assets.
```shell
npm i
npm run build-server
npm run start
```
Go to [http://localhost:3000](http://localhost:3000) which has the following pages for each component
* `/` will take you to a list of all available components.
* `/component-name` will take you to a page with all the examples of that component
* `/component-name/example-name` will take you to a page with that single example rendered.

#### Running in development mode
This will watch for changes to `yaml`, `sass` and `ts` files and restart the server. It does not live reload on changes.
```
npm run dev
```

### Adding a new component to the app
Components should be added automatically so long as they are added with [the correct structure](#the-component-directory).

## The lib directory.
This contains helper classes for jest, puppeteer and for rendering html in the app.

## The src/nationalarchives directory
This contains three global files.
* `_overrides.scss` This overrides the font as we can't use the GovUK font
* `all.scsss` This imports the govuk frontend sass file, the _overrides sass file and the all components sass file.
* `index.ts` This imports all the js classes defined in the components directories.

## The src/nationalarchives/components directory.
This contains one directory per component and an `_all.scss` which imports the sass files from each component.

## The component directory
This has the following structure.

### Sass files
* `_index.scss` This contains all the custom sass needed for the component.

### Nunjucks macros
* `_macro.njk` This generates the html for the examples app but can also be used by consumers of the library to generate html.
* `_template.njk` This is used by the example app to dynamically load based on the component name.

### Typescript files
* `<component-name>.ts` This is the typescript for the component. It will be packaged and published to npm.

### Tests
* `<component-name>.test.ts` These are puppeteer tests which run in a headless Chrome browser.
They can be used to test interactive parts of the component.
* `<component-name>.unit.test.ts` These are unit tests for the `<component-name>.ts` file.
* `template.test.ts` These tests render the component and make assertions about the structure of the HTML.

### Configuration
* `<component-name>.yaml`

This is the example data used to render the component in the app. It follows this structure.
```typescript
export interface ComponentData {
  name: string
  params: ComponentDataParams
  examples: ComponentDataExamples[]
}
interface ComponentDataExamples {
  name: string
  description: string
  data: any
}
```
The example data is `any` because this data is specific to the component you are rendering.

## Creating a new component
You need to create a directory with a name in kebab case which describes the component. For example, `card` or `navigation-text`

### Minimum required files
#### `macro.njk`
This contains the nunjucks template for the component.

#### `template.njk`
Given a component directory called `component-name` The template would look like:
```text
{% macro tdrComponentName(params) %}
{%- include "./template.njk" -%}
{% endmacro %}
```
#### `<component-name>.yaml`
Create this file based on [this description](#configuration)

#### `_index.scss`
This contains all the sass needed for the component. You can use existing govuk classes without redefining them here.

#### `template.test.ts`
This renders the template with nunjucks and then uses [Cheerio](https://cheerio.js.org/) to query the html.

### If there is typescript for the component
#### `<component-name>.ts`
The typescript for the component
#### `<component-name>.unit.test.ts`
Unit tests for the typescript

### If you need tests which run in a headless browser
`<component-name>.test.ts`

These use [Puppeteer](https://pptr.dev/) load the pages and run tests against them. There are helper functions in the utils directory.

## Building the project
There are two webpack files.

`webpack.config.js` is used during the `npm run build` command which generates `js` and `d.ts` files from the typescript in the `src/nationalarchives/**` directories.

`webpack.config.server.js` is used during `npm run build-server` which builds the typescript file `app/all.ts`
