import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                throw new Error('Login Failed')
            }

            const data = await response.json()
            localStorage.setItem('auth_token', data.auth_token)
            router.push('/')
        } catch (err) {
            setError('Login Failed. Please Try Again.')
        } finally {
            setIsLoading(false)
        }
    }

    const signup = async (name: string, email: string, password: string, confPassword: string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, confPassword }),
            })

            if (!response.ok) {
                throw new Error('Signup Failed')
            }

            const data = await response.json()
            localStorage.setItem('auth_token', data.auth_token)
            router.push('/')
        } catch (err) {
            setError('Signup Failed. Please Try Again.')
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        router.push('/login')
    }

    return { login, signup, logout, isLoading, error }
}