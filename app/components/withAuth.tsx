'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/auth/login')
      } else {
        setIsAuthorized(true)
      }
    }, [router])

    if (!isAuthorized) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}