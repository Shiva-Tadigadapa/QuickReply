import React from 'react';
import { Meta, Story } from '@storybook/react';
import Slider from './Slider';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Slider> = {
  component: Slider,
  tags: ['autodocs'],
};

export default meta;

type Story = Story<typeof meta>;

export const Default: Story = {
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
  render: (args: any) => (
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
