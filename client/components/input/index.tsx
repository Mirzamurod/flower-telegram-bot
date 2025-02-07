import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { TInputType } from '@/types/input'
import { Label } from '../ui/label'
import { Input as ShadInput } from '../ui/input'

const Input: FC<TInputType> = props => {
  const { name, label, placeholder, required } = props
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label>
            {label || name} {required ? <span className='text-red-500'>*</span> : null}
          </Label>
          <FormControl>
            <ShadInput {...field} {...props} placeholder={placeholder || label || name} />
          </FormControl>
          <FormMessage className='text-xs text-red-500' />
        </FormItem>
      )}
    />
  )
}

export default Input
