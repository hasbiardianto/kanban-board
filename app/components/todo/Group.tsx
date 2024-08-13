"use client";

import { Todo } from "@/app/type";
import { RoundPlusIcon } from "../icons/RoundPlusIcon";
import { Item } from "./Item";
import { useState } from "react";
import Modal from "../Modal";
import { CreateTaskForm } from "../forms/CreateTaskForm";

export function Group({ todo }: { todo: Todo }) {
  const [showModal, setShowModal] = useState(false);

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="border border-todo-blue bg-todo-bg-blue p-2 rounded max-w-[325px]">
      <div className="p-2">
        <div className="border border-todo-blue rounded max-w-min">
          <h2 className="text-xs px-[8px] py-[2px] text-todo-blue font-semibold text-nowrap">
            {todo.title}
          </h2>
        </div>
        <div className="my-2">
          <p className="text-xs font-bold">{todo.description}</p>
        </div>
        <Item />
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
          <CreateTaskForm onCancel={toogleModal} />
        </Modal>
      )}
    </div>
  );
}
