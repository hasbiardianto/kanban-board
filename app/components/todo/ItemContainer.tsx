import { Item } from "@/app/type";
import SettingIcon from "../icons/SettingIcon";

export function ItemContainer({ item }: { item: Item }) {
  return (
    <div className="border bg-slate-50 rounded p-4 md:w-[300px]" draggable>
      <p className="text-sm font-semibold pb-1 border-b-2 border-dashed">
        {item.name}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <progress
          value={item.progress_percentage}
          max={100}
          className="my-2 h-4 w-full progress-unfilled:bg-slate-200 progress-filled:bg-primary"
        />
        <span className="text-gray-500 text-xs px-1">{item.progress_percentage}%</span>
        <button className="ml-2">
          <SettingIcon />
        </button>
      </div>
    </div>
  );
}
