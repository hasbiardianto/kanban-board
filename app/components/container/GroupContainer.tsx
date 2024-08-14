"use client";

import { Item, Todo } from "@/app/type";
import { RoundPlusIcon } from "../icons/RoundPlusIcon";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { CreateTaskForm } from "../forms/CreateTaskForm";
import { ItemContainer } from "./ItemContainer";

export function GroupContainer({
  todo,
  todos,
  setActiveItem,
  setOldTodoId,
  setShowArea,
  movedItem,
}: {
  todo: Todo;
  todos: Todo[];
  setActiveItem: (value: number) => void;
  setOldTodoId: (value: number) => void;
  setShowArea: (value: boolean) => void;
  movedItem: Item | undefined;
}) {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  useEffect(() => {
    getItems();
  }, [movedItem]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getItems = async () => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${API_URL}/todos/${todo.id}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch items");
    }
    setItems(await response.json());
  };

  const handleTaskCreated = (newItem: Item) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleTaskUpdated = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleTodoIdUpdate = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id
          ? item.todo_id !== updatedItem.todo_id
            ? updatedItem
            : item
          : item
      )
    );
    console.log(updatedItem);
  };

  const handleTaskDeleted = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="flex flex-col border w-[350px] border-blue bg-bg-blue p-2 rounded">
      <div className="w-full p-2 ">
        <div className="border border-blue rounded max-w-min">
          <h2 className="text-xs px-[8px] py-[2px] text-blue font-semibold text-nowrap">
            {todo.title}
          </h2>
        </div>
        <div className="my-2">
          <p className="text-xs font-bold">{todo.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          {items.length === 0 ? (
            <div className="border bg-slate-50 rounded p-4 md:w-[300px]">
              <p className="text-sm font-semibold text-gray-500">No Task</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <ItemContainer
                  item={item}
                  todoId={todo.id}
                  todos={todos}
                  setShowArea={setShowArea}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                  onTodoIdUpdate={handleTodoIdUpdate}
                  setActiveItem={setActiveItem}
                  setOldTodoId={setOldTodoId}
                />
              </div>
            ))
          )}
        </div>
        <button
          className="flex mt-2 items-center gap-2 text-sm font-semibold"
          onClick={toggleModal}
        >
          <RoundPlusIcon />
          New Task
        </button>
      </div>
      {showModal && (
        <Modal>
          <CreateTaskForm
            onCancel={toggleModal}
            onTaskCreated={handleTaskCreated}
            todoId={todo.id}
          />
        </Modal>
      )}
    </div>
  );
}
