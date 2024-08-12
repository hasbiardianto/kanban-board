import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function POST(request: Request) {
    const { email, password } = await request.json()

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error('Login gagal')
        }

        const data = await response.json()
        const { auth_token } = data

        return NextResponse.json({ auth_token })
    } catch (error) {
        return NextResponse.json({ error: 'Login gagal' }, { status: 401 })
    }
}