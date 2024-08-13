import { Item } from "@/app/type";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

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
export async function updateItems(token: string | null): Promise<Item[]> {
    const response = await fetch(`${API_URL}items`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: 1, // Replace with the id of the item you want to delete
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to delete item");
    }
    return await response.json();
}
export async function destroyItems(token: string | null): Promise<Item[]> {
    const response = await fetch(`${API_URL}items`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            id: 1, // Replace with the id of the item you want to delete
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to delete item");
    }
    return await response.json();
}