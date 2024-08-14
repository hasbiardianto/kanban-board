import { destroyItems } from "@/app/api/items/route";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useRouter } from "next/navigation";

export function DeleteItemForm({
  itemId,
  todoId,
  onTaskDeleted,
}: {
  itemId: number;
  todoId: number;
  onTaskDeleted: (itemId: number) => void;
}) {
  const router = useRouter();
  function handleSubmit() {
    try {
      const token = localStorage.getItem("auth_token");
      destroyItems(todoId, itemId, token);
      onTaskDeleted(itemId);
    } catch {
      console.error("Failed to delete item");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="flex w-full items-center gap-4 hover:text-red"
      >
        <DeleteIcon />
        Delete
      </button>
    </form>
  );
}
