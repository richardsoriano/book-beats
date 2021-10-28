import { useState } from "react";

export default function SelectField({
  value,
  onChange = () => {},
  options = [],
  renderOption = (option) => option,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative w-full'>
      <div
        className='border p-2 w-full'
        onClick={() => setOpen((prev) => !prev)}
      >
        {value}
      </div>
      <div
        className={`absolute border w-full mt-1 ${open ? "block" : "hidden"}`}
      >
        {options.map((option) => (
          <div
            className='bg-white p-2'
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
          >
            {renderOption(option)}
          </div>
        ))}
      </div>
    </div>
  );
}
