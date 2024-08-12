import { ChangeEventHandler } from "react";

export default function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <div className="flex flex-col p-2 gap-2">
      <label htmlFor="description" className="text-sm">
        {label}
      </label>
      <textarea
        name="description"
        id="description"
        className="resize-none border-2 rounded p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        placeholder="Description"
        onChange={onChange}
        value={value}
      ></textarea>
    </div>
  );
}
