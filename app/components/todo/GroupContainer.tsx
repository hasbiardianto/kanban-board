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

  useEffect(() => {
    getItems();
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getItems = async () => {
    const token = localStorage.getItem("auth_token");
    const fetchedItems = await fetchItems(todo.id, token);
    setItems(fetchedItems);
  };

  const handleTaskCreated = (newItem: Item) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="flex flex-col border w-[350px] border-blue bg-bg-blue p-2 rounded max-w-full overflow-x-auto">
      <div className="w-full p-2">
        <div className="border border-blue rounded max-w-min">
          <h2 className="text-xs px-[8px] py-[2px] text-blue font-semibold text-nowrap">
            {todo.title}
          </h2>
        </div>
        <div className="my-2">
          <p className="text-xs font-bold">{todo.description}</p>
        </div>
        <div className="flex flex-col gap-2 overflow-x-auto">
          {items.length === 0 ? (
            <div className="border bg-slate-50 rounded p-4 md:w-[300px]">
              <p className="text-sm font-semibold text-gray-500">No Task</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <ItemContainer item={item} />
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
            todoId={todo.id}
            onTaskCreated={handleTaskCreated}
          />
        </Modal>
      )}
    </div>
  );
}
