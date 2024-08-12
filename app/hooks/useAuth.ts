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
                throw new Error('Login gagal')
            }

            const data = await response.json()
            localStorage.setItem('auth_token', data.auth_token)
            router.push('/')
        } catch (err) {
            setError('Login gagal. Silakan coba lagi.')
        } finally {
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}