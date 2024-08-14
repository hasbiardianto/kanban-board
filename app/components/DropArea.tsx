import { useState } from "react";
import { Todo } from "../type";

export const DropArea = ({
  setTargetTodoId,
  setShowArea,
  showArea,
  onDrop,
  todo,
}: {
  setTargetTodoId: (value: number) => void;
  setShowArea: (value: boolean) => void;
  onDrop: () => void;
  showArea: boolean;
  todo: Todo;
}) => {
  return (
    <section
      onDragEnter={() => {
        setShowArea(true);
        setTargetTodoId(todo.id);
      }}
      onDragLeave={() => setShowArea(false)}
      onDrop={() => {
        onDrop();
        setShowArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={
        showArea
          ? "opacity-100 my-2 border-2 border-dashed border-slate-500 text-slate-800 bg-slate-100 rounded p-4 w-[350px] text-center transition-all ease-in-out"
          : "opacity-0"
      }
    >
      Drop Here
    </section>
  );
};
