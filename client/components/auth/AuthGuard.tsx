// React Imports
import { Fragment, ReactElement, ReactNode, useEffect } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

// Hooks Import
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const router = useRouter()

  const { user } = useSelector((state: RootState) => state.login)

  if (user && user.block) router.replace('/payment')

  return <Fragment>{children}</Fragment>
}

export default AuthGuard
