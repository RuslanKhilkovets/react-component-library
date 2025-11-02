import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, CrossIcon } from '@/assets'
import { cn } from '@/utils'

export interface SidebarItem {
  label: string
  onClick?: () => void
  children?: SidebarItem[]
}

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  menuItems?: SidebarItem[]
  children?: ReactNode
}

export const Sidebar = ({
  isOpen,
  onClose,
  title,
  menuItems,
  children,
}: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="p-6 flex flex-col gap-6 relative">
              <CrossIcon
                className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-gray-800"
                onClick={onClose}
              />

              {title && <h2 className="text-2xl font-bold">{title}</h2>}

              {menuItems && <SidebarList items={menuItems} />}

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const SidebarList = ({ items }: { items: SidebarItem[] }) => {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item, idx) => (
        <SidebarItemComponent key={idx} item={item} />
      ))}
    </ul>
  )
}

const SidebarItemComponent = ({ item }: { item: SidebarItem }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <li>
      <div
        className="flex justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-100 font-medium"
        onClick={() => {
          if (hasChildren) setOpen(!open)
          item.onClick?.()
        }}
      >
        <span>{item.label}</span>
        {hasChildren && (
          <ArrowRightIcon
            className={cn({ 'rotate-90': open }, 'transition-all')}
          />
        )}
      </div>

      {hasChildren && (
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-4 mt-1 flex flex-col gap-1"
            >
              {item.children!.map((child, idx) => (
                <SidebarItemComponent key={idx} item={child} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </li>
  )
}

export default Sidebar
