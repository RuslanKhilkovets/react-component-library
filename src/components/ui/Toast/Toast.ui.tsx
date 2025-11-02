import { cn } from '@/utils'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CrossIcon } from '@/assets'
import { type VariantProps } from 'class-variance-authority'
import { toastVariants } from './services'

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  duration?: number
  onClose?: () => void
  show?: boolean
}

export const Toast = ({
  message,
  type = 'info',
  size = 'md',
  duration = 3000,
  onClose,
  show = true,
}: ToastProps) => {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [show, duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={cn(toastVariants({ type, size }))}
        >
          <span>{message}</span>
          <button
            onClick={() => {
              setVisible(false)
              onClose?.()
            }}
            className="ml-2 text-white font-bold"
          >
            <CrossIcon className="text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
