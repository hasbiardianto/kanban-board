import { Todo } from "@/app/type";
import SettingIcon from "../icons/SettingIcon";
import { RoundPlusIcon } from "../icons/RoundPlusIcon";

export function Group({ todo }: { todo: Todo }) {
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
        <div className="border bg-slate-50 rounded p-4" draggable>
          <p className="text-sm font-semibold pb-1 border-b-2 border-dashed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
            tempore.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <progress
              value={0.5}
              className="my-2 h-4 w-full progress-unfilled:bg-slate-200 progress-filled:bg-primary"
            />
            <span className="text-gray-500 text-xs px-1">50%</span>
            <button className="ml-2">
              <SettingIcon />
            </button>
          </div>
        </div>
        <button className="flex mt-2 items-center gap-2 text-sm font-semibold">
            <RoundPlusIcon />
            New Task
        </button>
      </div>
    </div>
  );
}
