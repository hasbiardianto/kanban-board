import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function POST(request: Request) {
    const { name, email, password, confPassword } = await request.json()

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, confirmation_password: confPassword }),
        })

        if (!response.ok) {
            throw new Error('Signup Failed')
        }

        const data = await response.json()
        const { auth_token } = data

        return NextResponse.json({ auth_token })
    } catch (error) {
        return NextResponse.json({ error: 'Signup Failed' }, { status: 400 })
    }
}