"use client";

import { Item, Todo } from "@/app/type";
import { RoundPlusIcon } from "../icons/RoundPlusIcon";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { CreateTaskForm } from "../forms/CreateTaskForm";
import { fetchItems } from "@/app/api/items/route";
import { ItemContainer } from "./ItemContainer";

export function GroupContainer({ todo }: { todo: Todo }) {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const todoId = todo.id;

  useEffect(() => {
    getItems();
  }, []);

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const getItems = async () => {
    const token = localStorage.getItem("auth_token");
    const items = await fetchItems(todoId, token);
    setItems(items);
  };

  const handleTaskCreated = (newItem: Item) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="flex border border-todo-blue bg-todo-bg-blue p-2 rounded w-[325px]">
      <div className="p-2">
        <div className="border border-todo-blue rounded max-w-min">
          <h2 className="text-xs px-[8px] py-[2px] text-todo-blue font-semibold text-nowrap">
            {todo.title}
          </h2>
        </div>
        <div className="my-2">
          <p className="text-xs font-bold">{todo.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <ItemContainer key={item.id} item={item} />
          ))}
        </div>
        <button
          className="flex mt-2 items-center gap-2 text-sm font-semibold"
          onClick={toogleModal}
        >
          <RoundPlusIcon />
          New Task
        </button>
      </div>
      {showModal && (
        <Modal>
          <CreateTaskForm
            onCancel={toogleModal}
            todoId={todo.id}
            onTaskCreated={handleTaskCreated}
          />
        </Modal>
      )}
    </div>
  );
}
