import { Meta, StoryObj } from "@storybook/react";

import MonacoEditor from ".";

const meta = {
  title: 'MonacoEditor/viewZone',
  component: MonacoEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MonacoEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
  viewZoneShow: false,
  },
}
