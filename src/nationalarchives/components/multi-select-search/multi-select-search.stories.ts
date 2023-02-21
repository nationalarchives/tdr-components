import './_index.scss';
import render from './story.njk'
import mssData from './multi-select-search.yaml'
import { MultiSelectSearch } from "./multi-select-search";

export default {
  title: "TDR/MultiSelectSearch",
  args : {
    dataSource: "default",
    id: "123",
    name: "item_select",
    copySingle: "item",
    copyMultiple: "items"
  },
  argTypes: {
    dataSource: {
      options: ['default', 'long-list'],
      control: { type: 'radio' },
    },
  }
}

const findExampleByName = (name, examples) => {
  return examples.find((ex) => {
    return ex.name == name;
  })
}

const createMSS = (args) => {
  const exampleData = findExampleByName(args.dataSource, mssData.examples);
  args.items = exampleData.data.items

  window.addEventListener('DOMContentLoaded', (event) => {
    const multiSelectElements: NodeListOf<HTMLElement> | null = document.querySelectorAll("[data-module=multi-select-search]");
    multiSelectElements.forEach((msEl) => {
      const mss = new MultiSelectSearch(msEl);
      mss.initialise();
    });
  });

  return render({
    params: { ...args }
  });
};

const Template = ({ label, ...args }) => {
  return createMSS({ label, ...args });
};

export const Default = Template.bind({});


export const Primary = Template.bind({});
Primary.args = {
  copySingle : "Blurg"
}
//
