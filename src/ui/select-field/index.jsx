import { useState, useRef } from 'react'
import useClickOutside from '@/hooks/use-click-outside'

export default function SelectField({
  label,
  value,
  onChange = () => {},
  options = [],
  renderOption = (option) => option,
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(undefined)

  useClickOutside(ref, () => setOpen(false))

  return (
    <div className='relative w-full' ref={ref}>
      {label && <label onClick={() => setOpen(true)}>{label}</label>}
      <div
        className='border p-2 w-full'
        onClick={() => setOpen((prev) => !prev)}
      >
        {value}
      </div>
      <div
        className={`absolute border w-full mt-1 ${open ? 'block' : 'hidden'}`}
      >
        {options.map((option) => (
          <div
            className='bg-white p-2'
            onClick={() => {
              onChange(option)
              setOpen(false)
            }}
          >
            {renderOption(option)}
          </div>
        ))}
      </div>
    </div>
  )
}
