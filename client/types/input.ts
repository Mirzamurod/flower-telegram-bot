import { ComponentProps } from 'react'

export type TInput = {
  name: string
  label?: string
}

export type TInputType = TInput & ComponentProps<'input'>
