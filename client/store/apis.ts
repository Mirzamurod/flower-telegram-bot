import { createAction } from '@reduxjs/toolkit'
import { TFlower } from '@/types/middleware'

export const flower = createAction<TFlower>('flower')

// users
export const registeruser = 'users'
export const loginUser = 'users/login'
export const userprofile = 'users'
export const userupdate = 'users/update'
export const userdelete = 'users/delete'
export const getUsersApi = 'users'
