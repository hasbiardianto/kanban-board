import { Item, Todo } from "@/app/type";
import { ReactNode } from "react";

export function MoveItemRight({
  todos,
  item,
  todoId,
  children,
  onTaskUpdated,
}: {
  item: Item;
  todoId: number;
  todos: Todo[];
  onTaskUpdated: (value: Item) => void;
  children: ReactNode;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const moveRight = async () => {
    const index = todos.findIndex((todo) => todo.id === todoId);
    if (index >= 0 && index < todos.length - 1) {
      const token = localStorage.getItem("auth_token");
      const targetTodoId = todos[index + 1].id;
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(
          `${API_URL}/todos/${item.todo_id}/items/${item.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              target_todo_id: targetTodoId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update item");
        }
        onTaskUpdated(await response.json());
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <form onSubmit={moveRight}>
      <button
        type="submit"
        className="flex items-center gap-4 hover:text-primary"
      >
        {children}
      </button>
    </form>
  );
}
