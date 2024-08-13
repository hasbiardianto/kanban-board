import { ChangeEventHandler } from "react";

export function Percentage({
  value,
  onChange,
}: {
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    } else if (newValue < 0) {
      newValue = 0;
    }
    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: newValue.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(newEvent);
  };

  return (
    <div className="flex flex-col p-2 gap-2">
      <label htmlFor="percentage" className="text-sm">
        Progress
      </label>
      <div className="relative w-1/2">
        <input
          id="percentage"
          name="percentage"
          type="text"
          min="0"
          max="100"
          onChange={handleChange}
          value={value}
          placeholder="70"
          className="p-1 pr-8 border-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          %
        </span>
      </div>
    </div>
  );
}
