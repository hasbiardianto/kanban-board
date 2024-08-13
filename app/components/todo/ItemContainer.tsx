"use client";

import { Item } from "@/app/type";
import SettingIcon from "../icons/SettingIcon";
import { useState, useRef, useEffect } from "react";
import { Dialog } from "../Dialog"; // Ensure this path is correct

export function ItemContainer({ item }: { item: Item }) {
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
      className="border bg-slate-50 rounded p-4 md:w-[300px] w-full"
      draggable
    >
      <p className="text-sm font-semibold pb-1 border-b-2 border-dashed">
        {item.name}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <progress
          value={item.progress_percentage}
          max={100}
          className="my-2 h-4 w-full progress-unfilled:bg-slate-200 progress-filled:bg-primary"
        />
        <span className="text-gray-500 text-xs px-1">
          {item.progress_percentage}%
        </span>
        <div className="relative inline-block text-left">
          <button ref={buttonRef} className="ml-2" onClick={toggleDialog}>
            <SettingIcon />
          </button>
          {showDialog && <Dialog ref={dialogRef} />}
        </div>
      </div>
    </div>
  );
}
