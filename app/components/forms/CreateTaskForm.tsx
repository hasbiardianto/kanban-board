"use client";

import { useState } from "react";
import Input from "../inputs/Input";
import { Percentage } from "../inputs/Percentage";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";
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
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const [name, setName] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.error("No auth token found");
    }
    const response = await fetch(`${API_URL}/todos/${todoId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        progress_percentage: percentage,
      }),
    });
    onTaskCreated(await response.json());
    if (!response.ok) {
      throw new Error("Failed to create new item");
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
