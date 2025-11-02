import { cva, VariantProps } from 'class-variance-authority'

export const toastVariants = cva(
  'px-4 py-2 rounded shadow-lg text-white flex items-center gap-2 justify-between',
  {
    variants: {
      type: {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      type: 'info',
      size: 'md',
    },
  },
)

export type ToastType = VariantProps<typeof toastVariants>['type']
