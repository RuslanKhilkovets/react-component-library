import { useForm, SubmitHandler, Controller } from 'react-hook-form'

import { Input } from '@/components/ui'
import { cn } from '@/utils'
import { useToast } from '@/managers'

interface LoginFormData {
  email: string
  password: string
}

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { addToast } = useToast()

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log('Form submitted:', data)
    addToast({
      message: 'Login successful!',
      type: 'success',
      duration: 3000,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto p-4 flex flex-col gap-4"
    >
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="email"
            placeholder="Email"
            clearable
            size="md"
            color={errors.email ? 'error' : 'default'}
            inputClassName={cn(errors.email && 'border-red-500')}
          />
        )}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            placeholder="Password"
            clearable
            size="md"
            color={errors.password ? 'error' : 'default'}
            inputClassName={cn(errors.password && 'border-red-500')}
          />
        )}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
