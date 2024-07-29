import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Slider from './Slider';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ['autodocs'],
};

export default meta;

type StoryType = StoryFn<typeof Slider>;

export const Default: StoryType = {
  args: {
    type: "Discreet",
    handleSize: 'Size_24',
    steps: 2
  },
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
  },
  render: (args) => (
    <Slider
      {...args}
      onChange={(value) => {
        if (typeof value === 'number') {
          action('Slider value changed')(value);
        } else {
          action('Range values changed')(value);
        }
      }}
    />
  ),
};
