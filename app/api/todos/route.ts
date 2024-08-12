import { NextResponse } from 'next/server'
import { Todo } from '@/app/type';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export async function fetchTodos(token: string | null): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return await response.json();
}

export async function storeTodo(request: Request) {
    const { title } = await request.json();
    const token = localStorage.getItem('auth_token')

    try {
        const response = await fetch(`${API_URL}/todos`, {
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