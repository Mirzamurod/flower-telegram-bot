import { TError } from './error'

export type TUser = {
  _id: string
  email: string
  image: string
  name?: string
  role: TUserRole
  block: boolean
}

export interface IUserStore {
  isLoading: boolean
  user: TUser | null
  errors: TError[] | null
  token: boolean
  success: boolean
}

export interface IRegister {
  isLoading: boolean
  success: boolean
  error: any
}

export type TUserRole = 'admin' | 'client'
