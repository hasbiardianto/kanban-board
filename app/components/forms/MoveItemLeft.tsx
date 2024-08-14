import { moveItem } from "@/app/api/items/route";
import { Item, Todo } from "@/app/type";
import { ReactNode } from "react";

export function MoveItemLeft({
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
  const moveLeft = async () => {
    try {
      const index = todos.findIndex((todo) => todo.id === todoId);
      if (index > 0) {
        const token = localStorage.getItem("auth_token");
        const targetTodoId = todos[index - 1].id;
        const newItem = await moveItem(item.id, todoId, token, targetTodoId);
        onTaskUpdated(newItem);
      }
      console.log("failed");
    } catch (error) {
      throw error;
    }
  };
  return (
    <form onSubmit={moveLeft}>
      <button
        type="submit"
        className="flex items-center gap-4 hover:text-primary"
      >
        {children}
      </button>
    </form>
  );
}
