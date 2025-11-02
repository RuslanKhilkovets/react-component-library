import { Toast } from '@/components/ui'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    duration: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  args: {
    message: 'This is a toast message!',
    type: 'info',
    size: 'md',
  },
  render: (args: object) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [show, setShow] = useState(true)

    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Show Toast
        </button>

        <div className="fixed bottom-10 right-10 space-y-2">
          {show && (
            <Toast
              {...args}
              show={show}
              onClose={() => setShow(false)}
              message="Hello"
            />
          )}
        </div>
      </div>
    )
  },
}

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6">
      <Toast message="Info message" type="info" />
      <Toast message="Success message" type="success" />
      <Toast message="Error message" type="error" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6">
      <Toast message="Small toast" size="sm" />
      <Toast message="Medium toast" size="md" />
      <Toast message="Large toast" size="lg" />
    </div>
  ),
}
