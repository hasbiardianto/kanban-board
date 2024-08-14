import { Item } from "@/app/type";
import CancelButton from "../buttons/CancelButton";
import SubmitButton from "../buttons/SubmitButton";
import Input from "../inputs/Input";
import { Percentage } from "../inputs/Percentage";
import Modal from "../Modal";
import { useState } from "react";

export function UpdateItemForm({
  item,
  todoId,
  onTaskUpdated,
  onCancel,
}: {
  item: Item;
  todoId: number;
  onTaskUpdated: (updatedItem: Item) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(item.name);
  const [percentage, setPercentage] = useState(item.progress_percentage);

  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${API_URL}/todos/${todoId}/items/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            progress_percentage: percentage,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      onTaskUpdated(await response.json());
      onCancel();
    } catch (error) {
      throw error;
    }
    onCancel();
  };

  return (
    <Modal>
      <form className="md:w-[420px]" onSubmit={handleSubmit}>
        <h1 className="p-2 font-bold">Update Task</h1>
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
    </Modal>
  );
}
