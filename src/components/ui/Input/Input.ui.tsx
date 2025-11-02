import { useState, type InputHTMLAttributes } from 'react'
import { inputVariants, type InputVariantProps } from './services'
import { CrossIcon, EyeIcon, EyeOffIcon } from '@/assets'
import { cn } from '@/utils'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'>,
    InputVariantProps {
  clearable?: boolean
  containerClassName?: string
  inputClassName?: string
}

export const Input = ({
  type = 'text',
  clearable,
  size,
  color,
  ...props
}: InputProps) => {
  const [value, setValue] = useState(props.value?.toString() || '')
  const [showPassword, setShowPassword] = useState(false)

  const variant = inputVariants({ size, color })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    props.onChange?.(e)
  }

  const handleClear = () => {
    setValue('')
    const event = {
      ...new Event('input', { bubbles: true }),
      target: { value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>
    props.onChange?.(event)
  }

  return (
    <div className={cn('relative inline-flex items-center w-full')}>
      <input
        {...props}
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={handleChange}
        className={cn(variant, 'pr-12')}
      />

      {(clearable && value) || type === 'password' ? (
        <div className="absolute top-0 right-0 h-full flex items-center gap-2 pr-2">
          {clearable && value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-700"
            >
              <CrossIcon />
            </button>
          )}

          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
        </div>
      ) : null}
    </div>
  )
}
