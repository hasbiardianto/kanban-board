"use client";

import TextArea from "../inputs/TextArea";
import Input from "../inputs/Input";
import CancelButton from "../buttons/CancelButton";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storeTodo } from "@/app/api/todos/route";
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

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const token = localStorage.getItem("auth_token");
    try {
      event.preventDefault();
      const newTodo = await storeTodo(title, description, token);
      onTodoCreated(newTodo);
      onCancel();
    } catch (error) {
      throw error;
    }
    router.push("/");
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
