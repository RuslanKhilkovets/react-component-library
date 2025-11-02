import { useState } from 'react'
import { ToastProvider } from './managers'
import { Sidebar, SidebarItem } from './components/ui'
import { LoginForm } from './components/forms'

const menuItems: SidebarItem[] = [
  { label: 'Dashboard', onClick: () => alert('Dashboard clicked') },
  {
    label: 'Settings',
    children: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Security', onClick: () => alert('Security clicked') },
    ],
  },
  { label: 'Help', onClick: () => alert('Help clicked') },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ToastProvider>
      <main className="flex items-center justify-center bg-purple-200 min-h-[100dvh] relative flex-col">
        <LoginForm />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSidebarOpen(true)}
        >
          Open Sidebar
        </button>

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          title="Menu"
          menuItems={menuItems}
        />
      </main>
    </ToastProvider>
  )
}

export default App
