"use client";

import { useState } from "react";
import Input from "../inputs/Input";
import { Percentage } from "../inputs/Percentage";
import SubmitButton from "../buttons/SubmitButton";
import CancelButton from "../buttons/CancelButton";

export function CreateTaskForm({ onCancel }: { onCancel: () => void }) {
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form action="post" onSubmit={handleSubmit} className="md:w-[420px]">
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
