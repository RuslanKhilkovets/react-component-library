import { Input } from '@/components/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    clearable: { control: 'boolean' },
    type: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input color="default" placeholder="Default color" />
      <Input color="error" placeholder="Error color" />
      <Input color="success" placeholder="Success color" />
    </div>
  ),
}

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Input rounded="none" placeholder="Rounded none" />
      <Input rounded="sm" placeholder="Rounded sm" />
      <Input rounded="lg" placeholder="Rounded lg" />
      <Input rounded="full" placeholder="Rounded full" />
    </div>
  ),
}

export const Clearable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('Hello Storybook')
    return (
      <Input
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Try typing and clearing"
      />
    )
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password...',
  },
}
