import './_index.scss';
import render from './story.njk'

export default {
  title: "TDR/Card",
  args : {
    error: false,
    metadataState: "Not entered"
  },
  argTypes: {
    error: {
      control: { control: 'boolean' }
    },
    metadataState: {
      options: ["Not entered", "Entered", "Incomplete"],
      control: { type: 'radio' },
    },
  }
}

const createCard = (args) => {
  return render({
    params: { ...args }
  });
};

const Template = ({ label, ...args }) => {
  return createCard({ label, ...args });
};

export const Default = Template.bind({});
