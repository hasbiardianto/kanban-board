"use client";

import { Item, Todo } from "@/app/type";
import SettingIcon from "../icons/SettingIcon";
import { useState, useRef, useEffect } from "react";
import { DialogItem } from "../DialogItem";

export function ItemContainer({
  item,
  todoId,
  todos,
  onTaskUpdated,
  onTaskDeleted,
  setActiveItem,
  setShowArea,
  setOldTodoId,
}: {
  item: Item;
  todoId: number;
  todos: Todo[];
  onTaskUpdated: (updatedItem: Item) => void;
  onTaskDeleted: (itemId: number) => void;
  setActiveItem: (itemId: number) => void;
  setShowArea: (show: boolean) => void;
  setOldTodoId: (todoId: number) => void;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDialog(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="border bg-slate-50 rounded p-4 md:w-[300px] w-full cursor-grab active:cursor-grab active:opacity-70 active:border-2 active:border-slate-500"
      draggable
      onDragStart={() => {
        setShowArea(true);
        setActiveItem(item.id);
        setOldTodoId(todoId);
      }}
      onDragEnd={(event) => {
        setShowArea(false);
        setActiveItem(0);
        setOldTodoId(0);
      }}
    >
      <p className="text-sm font-semibold pb-1 border-b-2 border-dashed">
        {item.name}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <progress
          value={item.progress_percentage}
          max={100}
          className={`my-2 h-4 w-full progress-unfilled:bg-slate-200 ${
            item.progress_percentage === 100
              ? "progress-filled:bg-green progress-filled:rounded-lg"
              : "progress-filled:bg-primary "
          }`}
        />
        <span className="text-gray-500 text-xs px-1">
          {item.progress_percentage}%
        </span>
        <div className="relative inline-block text-left">
          <button ref={buttonRef} className="ml-2" onClick={toggleDialog}>
            <SettingIcon />
          </button>
          {showDialog && (
            <DialogItem
              ref={dialogRef}
              item={item}
              todos={todos}
              todoId={todoId}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}
