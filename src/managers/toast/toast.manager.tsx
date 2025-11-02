import { Toast } from '@/components/ui'
import { ToastType } from '@/components/ui/Toast/services'
import { MAX_TOASTS_COUNT } from '@/const'
import { createContext, useState, ReactNode, useContext } from 'react'

interface ToastItem {
  id: number
  message: string
  type?: ToastType
  duration?: number
}

interface ToastContextType {
  addToast: (toast: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let toastId = 0

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    setToasts((prev) => {
      const newToast = { ...toast, id: toastId++ }
      const updated = [newToast, ...prev]
      return updated.slice(0, MAX_TOASTS_COUNT)
    })
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end z-50">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => removeToast(t.id)}
            show
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
