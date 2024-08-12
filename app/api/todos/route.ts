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

export async function storeTodo(title: string, description: string, token: string | null) {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      throw new Error('Failed to create group task');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}