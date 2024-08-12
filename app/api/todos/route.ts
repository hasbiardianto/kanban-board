import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function POST(request: Request) {
    const { title } = await request.json();
    const token = localStorage.getItem('auth_token')

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title }),
        })

        if (!response.ok) {
            throw new Error('Failed to create group task');
        }

        return response.json();
        
    } catch (error) {
        return NextResponse.json({ error: 'Cannot add group' }, { status: 400 })
    }
}