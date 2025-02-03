// Toolkit Imports
import { useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook } from 'react-redux'

// Middleware
import middleware from './middleware'

// Reducers
import login from './user/login'
import register from './user/register'

export const store = configureStore({
  reducer: {
    login,
    register,
  },
  // @ts-ignore
  middleware: () => [middleware],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
