// React Import
import { FC, Fragment, ReactNode } from 'react'

// Next Import
import { useRouter } from 'next/navigation'

interface GuestGuard {
  children: ReactNode
}

const GuestGuard: FC<GuestGuard> = props => {
  const { children } = props
  const router = useRouter()

  return <Fragment>{children}</Fragment>
}

export default GuestGuard
