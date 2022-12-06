import { getExamples } from '../../../../lib/utils'
import { axe, render } from '../../../../lib/jest-helpers'
import { toHaveNoViolations } from 'jest-axe'

describe('Nested Navigation', () => {
  let examples: { [key: string]: any }
  expect.extend(toHaveNoViolations)

  describe.each(['default', 'radio'])('nested-navigation %s', inputType => {
    beforeAll(async () => {
      examples = (await getExamples('nested-navigation'))
    })

    describe(`${inputType} example`, () => {
      it('passes accessibility tests', async () => {
        const $ = render('nested-navigation', JSON.stringify(examples[inputType]))
        const results = await axe($.html())
        expect(results).toHaveNoViolations()
      })

      it('should render with the expected options', async () => {
        const className = inputType === 'default' ? 'checkboxes' : 'radios'
        const $ = render('nested-navigation', JSON.stringify(examples[inputType]))
        const $labels: cheerio.Cheerio = $(`.govuk-${className}__input`)
        const renderedLabelsText: string[] = []
        for (let i = 0; i < $labels.length; i++) {
          const labelTag = $labels[i] as cheerio.TagElement
          const id: string = labelTag.attribs.id
          const label = $(`label[for='${id}']`)[0] as cheerio.TagElement
          const labelText = label.children[0] as unknown as Text
          renderedLabelsText.push(labelText.data.trim())
        }

        expect(renderedLabelsText.sort()).toEqual(['file1', 'file12', 'file2', 'file22', 'fileid3', 'folder1', 'folder12'])
      })
    })
  })
})
