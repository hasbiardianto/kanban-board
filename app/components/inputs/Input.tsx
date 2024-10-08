import { ChangeEventHandler } from "react";

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string | number ;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col p-2 gap-2">
      <label htmlFor="title" className="text-sm font-bold">
        {label}
      </label>
      <input
        type={type}
        required
        className="py-1 px-2 border-2 font-normal text-gray-500 text-base rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
