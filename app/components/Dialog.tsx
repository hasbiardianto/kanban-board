import { forwardRef } from "react";
import { ArrowRightIcon } from "./icons/ArrowRightIcon";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";

const Dialog = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute ml-3 mt-2 right-0 md:left-0 w-[300px] bg-white border border-gray-200 rounded shadow-xl z-50 text-xs p-2 font-bold"
    >
      <div className="p-2 flex flex-col gap-2">
        <button className="flex items-center gap-4 hover:text-primary">
          <ArrowRightIcon />
          Move Right
        </button>
        <button className="flex items-center gap-4 hover:text-primary">
          <ArrowLeftIcon />
          Move Left
        </button>
        <button className="flex items-center gap-4 hover:text-primary">
          <EditIcon />
          Edit
        </button>
        <button className="flex items-center gap-4 hover:text-red">
          <DeleteIcon />
          Delete
        </button>
      </div>
    </div>
  );
});

Dialog.displayName = "Dialog";

export { Dialog };
