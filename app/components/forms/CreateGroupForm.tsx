"use client";

import TextArea from "../inputs/TextArea";
import Input from "../inputs/Input";
import CancelButton from "../buttons/CancelButton";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Todo } from "@/app/type";

export function CreateGroupForm({
  onCancel,
  onTodoCreated,
}: {
  onCancel: () => void;
  onTodoCreated: (newTodo: Todo) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem("auth_token");
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create group task");
      }
      onTodoCreated(await response.json());
    } catch (error) {
      throw error;
    }
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="md:w-[500px]">
      <h1 className="mt-4 px-2 font-semibold">Add New Group</h1>
      <Input
        label="Title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
      />
      <TextArea
        label="Description"
        value={description}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          setDescription(event.target.value)
        }
      />
      <div className="inline-flex gap-2 m-2">
        <CancelButton onClick={onCancel} />
        <SubmitButton label="Submit" />
      </div>
    </form>
  );
}
