import { destroyItems } from "@/app/api/items/route";
import CancelButton from "../buttons/CancelButton";

export function DeleteItemForm({
  itemId,
  todoId,
  onCancel,
  onTaskDeleted,
}: {
  itemId: number;
  todoId: number;
  onCancel: () => void;
  onTaskDeleted: (itemId: number) => void;
}) {
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
    <form className="p-4 md:w-[420px]" onSubmit={handleSubmit}>
      <div className="text-base inline-flex gap-4 justify-center mb-4">
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 7V9M10 13H10.01M3.07183 17H16.9282C18.4678 17 19.4301 15.3333 18.6603 14L11.7321 2C10.9623 0.666667 9.03778 0.666667 8.26798 2L1.33978 14C0.56998 15.3333 1.53223 17 3.07183 17Z"
            stroke="#E11428"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1>Delete Task</h1>
      </div>
      <p className=" text-gray-500 font-normal text-base">
        Are you sure want to delete this task? your action can’t be reverted.
      </p>
      <div className="inline-flex gap-2 my-4">
        <CancelButton onClick={onCancel} />
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-200 bg-red hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
