import { forwardRef, useState } from "react";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteItemForm } from "./forms/DeleteItemForm";
import { UpdateItemForm } from "./forms/UpdateItemForm";
import { Item, Todo } from "../type";
import { DeleteIcon } from "./icons/DeleteIcon";
import Modal from "./Modal";
import { MoveItemRight } from "./forms/MoveItemRight";
import { MoveItemLeft } from "./forms/MoveItemLeft";

const DialogItem = forwardRef<
  HTMLDivElement,
  {
    item: Item;
    todoId: number;
    todos: Todo[];
    onTaskUpdated: (value: Item) => void;
    onTaskDeleted: (id: number) => void;
  }
>((props, ref) => {
  const { item, todoId, todos, onTaskUpdated, onTaskDeleted } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };
  const toggleDelete = () => {
    setShowDelete(!showDelete);
  };

  return (
    <div
      ref={ref}
      className="absolute ml-3 mt-2 right-0 md:left-0 w-[300px] bg-white border border-gray-200 rounded shadow-xl z-10 text-xs p-2 font-bold"
    >
      <div className="p-2 flex flex-col gap-2">
        <MoveItemRight
          item={item}
          todoId={todoId}
          todos={todos}
          onTaskUpdated={onTaskUpdated}
        >
          <ArrowRightIcon />
          Move Right
        </MoveItemRight>
        <MoveItemLeft
          item={item}
          todoId={todoId}
          todos={todos}
          onTaskUpdated={onTaskUpdated}
        >
          <ArrowLeftIcon />
          Move Left
        </MoveItemLeft>
        <button
          className="flex items-center gap-4 hover:text-primary"
          onClick={toggleEdit}
        >
          <EditIcon />
          Edit
        </button>
        <button
          className="flex items-center gap-4 hover:text-red"
          onClick={toggleDelete}
        >
          <DeleteIcon />
          Delete
        </button>
      </div>
      {showEdit && (
        <UpdateItemForm
          onCancel={toggleEdit}
          item={item}
          todoId={todoId}
          onTaskUpdated={onTaskUpdated}
        />
      )}
      {showDelete && (
        <Modal>
          <DeleteItemForm
            itemId={item.id}
            onCancel={toggleDelete}
            todoId={todoId}
            onTaskDeleted={onTaskDeleted}
          />
        </Modal>
      )}
    </div>
  );
});

DialogItem.displayName = "DialogItem";

export { DialogItem };
