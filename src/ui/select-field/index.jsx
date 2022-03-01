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
        className='w-full p-2 border'
        onClick={() => setOpen((prev) => !prev)}
      >
        {value}
      </div>
      <div
        className={`absolute border w-full mt-1 ${open ? 'block' : 'hidden'}`}
      >
        {options.map((option) => (
          <div
            className='p-2 bg-white'
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
