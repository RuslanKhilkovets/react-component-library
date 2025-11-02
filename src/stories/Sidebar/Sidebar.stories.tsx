import { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { Sidebar, SidebarItem } from '@/components/ui'

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
}
export default meta

const Template: StoryFn<typeof Sidebar> = (args: object) => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems: SidebarItem[] = [
    { label: 'Dashboard', onClick: () => alert('Dashboard clicked') },
    {
      label: 'Settings',
      children: [
        { label: 'Profile', onClick: () => alert('Profile clicked') },
        { label: 'Security', onClick: () => alert('Security clicked') },
        {
          label: 'Advanced',
          children: [
            { label: 'Logs', onClick: () => alert('Logs clicked') },
            {
              label: 'Permissions',
              onClick: () => alert('Permissions clicked'),
            },
          ],
        },
      ],
    },
    { label: 'Help', onClick: () => alert('Help clicked') },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Open Sidebar
      </button>

      <Sidebar
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuItems={menuItems}
        title="Main Menu"
      />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {}
