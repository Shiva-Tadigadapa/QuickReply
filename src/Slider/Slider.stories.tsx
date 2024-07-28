import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Slider from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    type: {
      control: { type: 'select', options: ['Continuous', 'Discreet'] },
    },
    subtype: {
      control: { type: 'select', options: ['Single', 'Range'] },
    },
    steps: {
      control: { type: 'number', min: 1, max: 10 },
    },
    handleSize: {
      control: { type: 'select', options: ['Size_24', 'Size_32'] },
    },
    onChange: { action: 'changed' },
  },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args: any) => <Slider {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'Continuous',
  subtype: 'Single',
  handleSize: 'Size_24',
};
