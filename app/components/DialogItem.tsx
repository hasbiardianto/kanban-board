import { forwardRef, useState } from "react";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteItemForm } from "./forms/DeleteItemForm";
import { UpdateItemForm } from "./forms/UpdateItemForm";
import { Item, Todo } from "../type";

const DialogItem = forwardRef<
  HTMLDivElement,
  {
    item: Item;
    todoId: number;
    todos: Todo[];
    onTaskUpdated: (item: Item) => void;
    onTaskDeleted: (itemid: number) => void;
  }
>((props, ref) => {
  const { item, todoId, todos, onTaskUpdated, onTaskDeleted } = props;
  const [showModal, setShowModal] = useState(false);
  const toogleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div
      ref={ref}
      className="absolute ml-3 mt-2 right-0 md:left-0 w-[300px] bg-white border border-gray-200 rounded shadow-xl z-10 text-xs p-2 font-bold"
      draggable="false"
    >
      <div className=" p-2 flex flex-col gap-2">
        <button className="flex items-center gap-4 hover:text-primary">
          <ArrowRightIcon />
          Move Right
        </button>
        <button
          className="flex items-center gap-4 hover:text-primary"
          onClick={() => console.log(item)}
        >
          <ArrowLeftIcon />
          Move Left
        </button>
        <button
          className="flex items-center gap-4 hover:text-primary"
          onClick={toogleModal}
        >
          <EditIcon />
          Edit
        </button>
        <DeleteItemForm
          itemId={item.id}
          todoId={todoId}
          onTaskDeleted={onTaskDeleted}
        />
      </div>
      {showModal && (
        <UpdateItemForm
          onCancel={toogleModal}
          item={item}
          todoId={todoId}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </div>
  );
});

DialogItem.displayName = "Dialog";

export { DialogItem };
