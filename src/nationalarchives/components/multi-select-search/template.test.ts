import { getExamples } from "../../../../lib/utils";
import { axe, render } from "../../../../lib/jest-helpers";
import { toHaveNoViolations } from "jest-axe";

describe("Multi Select Search", () => {
  let examples: { [key: string]: any };
  expect.extend(toHaveNoViolations);

  beforeAll(async () => {
    examples = (await getExamples("multi-select-search"))[0];
  });

  describe("default example", () => {
    it("passes accessibility tests", async () => {
      const $ = render("multi-select-search", JSON.stringify(examples.default));
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it("should render with the expected options", async () => {
      const $ = render("multi-select-search", JSON.stringify(examples.default));
      const $labels: cheerio.Cheerio = $(".govuk-checkboxes__input");
      const renderedLabelsText: string[] = [];
      for (let i = 0; i < $labels.length; i++) {
        const labelTag = $labels[i] as cheerio.TagElement;
        const id: string = labelTag.attribs.id;
        const label = $(`label[for='${id}']`)[0] as cheerio.TagElement;
        const labelText = label.children[0] as unknown as Text;
        renderedLabelsText.push(labelText.data.trim());
      }

      expect(renderedLabelsText.sort()).toEqual([
        "Abkhazian",
        "Afar",
        "Bengali",
        "Bislama",
        "English",
      ]);
    });
  });
});
