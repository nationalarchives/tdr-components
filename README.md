# TDR Components

Thi library contains custom components based on the [GovUK frontend](https://design-system.service.gov.uk/).

We use [Storybook.js](https://storybook.js.org/docs/html/get-started/why-storybook) to render the components in various states and test for [interactions](https://storybook.js.org/docs/html/writing-tests/interaction-testing) and [accessibility](https://storybook.js.org/docs/html/writing-tests/accessibility-testing).

The project is divided into different directories

## `.storybook/` - Storybook configuration

Read documentation on how to [configure storybook](https://storybook.js.org/docs/html/configure/overview#configure-your-storybook-project).

`.storybook/main.js` contains some custom config so that we can...

- use nunjucks for our templating
- additionally load the Govuk base sass file into all our sass modules

## The lib directory

This contains helper classes for unit tests.

## The src/nationalarchives directory

This contains three global files.

- `_overrides.scss` This overrides the font as we can't use the GovUK font
- `all.scss` This imports the govuk frontend sass file, the \_overrides sass file and the all components sass file.
- `govuk.scss` This imports only the govuk frontend sass, which is compiled for use within Storybooks `preview-head.html`
- `index.ts` This imports all the js classes defined in the components directories.

## The src/nationalarchives/components directory.

This contains one directory per component and an `_all.scss` which imports the sass files from each component.

## The component directory

This has the following structure.

### Sass files

- `_index.scss` This contains all the custom sass needed for the component.

### Stories

- `<component-name>.stories.ts` - Using the [Component Story Format](https://storybook.js.org/docs/html/api/csf) to define a different UI state per `export`. See [Writing stories](https://storybook.js.org/docs/html/api/csf) in Storybook documentation.

### Nunjucks macros

- `macro.njk` This generates the html for the examples app but can also be used by consumers of the library to generate html.
- `template.njk` This is used by the example app to dynamically load based on the component name.
- `story.njk` This is used by storybook. The only difference between this and `macro.njk` is that this file calls the macro immediately.

### Typescript files

- `<component-name>.ts` This is the typescript for the component. It will be packaged and published to npm.

### Tests

- `<component-name>.stories.ts` These are Storybook CSF files which render the UI in varying states.
  They can be used to test interactive parts of the component.
- `<component-name>.unit.test.ts` These are unit tests for the `<component-name>.ts` file.

### Configuration

- `<component-name>.yaml` (optional)

This example data can be consumed by stories to render different UI states.

```typescript
export interface ComponentData {
  name: string;
  params: ComponentDataParams;
  examples: ComponentDataExamples[];
}
interface ComponentDataExamples {
  name: string;
  description: string;
  data: any;
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

#### `story.njk`

Given a component directory called `component-name` The template would look like:

```text
{% macro tdrComponentName(params) %}
{%- include "./template.njk" -%}
{% endmacro %}

tdrComponentName( params )
```

#### `<component-name>.yaml` (optional)

Create this file based on [this description](#configuration)

#### `_index.scss`

This contains all the sass needed for the component. You can use existing govuk classes without redefining them here.

### If there is typescript for the component

#### `<component-name>.ts`

The typescript for the component

#### `<component-name>.unit.test.ts`

Unit tests for the typescript

## Running locally for development

You can build your components locally by running:

`npm run start-storybook`

## Run tests

`npm run test`
This will run unit tests using Jest.

`npm run test-storybook`
This runs accessibility and interaction tests on the cli. You need to have an instance of storybook running locally (`npm run storybook`) to be able to use the storybook CLI test runner.

## Building the project

There is one webpack file for creating the files for the npm package.

`webpack.config.js` is used during the `npm run build` command which generates `js` and `d.ts` files from the typescript in the `src/nationalarchives/**` directories.

There is also webpack config inside the `.storybook/main.js` that loads the nunjucks, yaml and css/sass.
