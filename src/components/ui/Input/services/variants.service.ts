import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:border-primary transition-colors',
  {
    variants: {
      size: {
        sm: 'text-sm py-1 px-2',
        md: 'text-base py-2 px-3',
        lg: 'text-lg py-3 px-4',
      },
      color: {
        default: 'border-gray-300 focus:ring-primary focus:border-primary',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'default',
      rounded: 'md',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>
