"use client";

import { useState } from "react";
import Input from "../inputs/Input";
import { Percentage } from "../inputs/Percentage";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
import { storeItems } from "@/app/api/items/route";
import { Item } from "@/app/type";

export function CreateTaskForm({
  todoId,
  onCancel,
  onTaskCreated,
}: {
  todoId: number;
  onCancel: () => void;
  onTaskCreated: (newItem: Item) => void;
}) {
  const [name, setName] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.error("No auth token found");
      return;
    }
    try {
      const newItem = await storeItems(name, percentage, todoId, token);
      onTaskCreated(newItem);
      onCancel();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-[420px]">
      <h1 className="p-2 font-bold">Create New Task</h1>
      <Input
        label="Task Name"
        type="text"
        placeholder="Type your task"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
      />
      <Percentage
        value={percentage}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setPercentage(Number(event.target.value))
        }
      />
      <div className="inline-flex gap-2 m-2">
        <CancelButton onClick={onCancel} />
        <SubmitButton label="Save Task" />
      </div>
    </form>
  );
}
