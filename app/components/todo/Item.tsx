import SettingIcon from "../icons/SettingIcon";

export function Item() {
  return (
    <div className="border bg-slate-50 rounded p-4" draggable>
      <p className="text-sm font-semibold pb-1 border-b-2 border-dashed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, tempore.
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
  );
}
