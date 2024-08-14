import { Item } from "@/app/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// Fetch items for a specific todo
export async function fetchItems(todo_id: number, token: string | null): Promise<Item[]> {
    const response = await fetch(`${API_URL}/todos/${todo_id}/items`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch items");
    }
    return await response.json();
}

// Store a new item in a specific todo
export async function storeItems(name: string, percentage: number, todo_id: number, token: string | null): Promise<Item> {
    const response = await fetch(`${API_URL}/todos/${todo_id}/items`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            progress_percentage: percentage,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create new item");
    }
    return await response.json();
}

// Update a specific item
export async function updateItems(itemId: number, todoId: number, token: string | null, name?: string, percentage?: number): Promise<Item> {
    const response = await fetch(`${API_URL}/todos/${todoId}/items/${itemId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: name,
            progress_percentage: percentage,
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to update item");
    }
    return await response.json();
}

// Delete a specific item
export async function destroyItems(todoId: number, itemId: number, token: string | null): Promise<void> {
    const response = await fetch(`${API_URL}/todos/${todoId}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete item");
    }
}
