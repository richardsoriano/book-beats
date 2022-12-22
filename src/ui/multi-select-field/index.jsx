import { useState, useRef } from "react"
import useClickOutside from "hooks/use-click-outside"
import { CheckCircleIcon } from "@heroicons/react/solid"

export default function MultiSelectField({
  label,
  value = [],
  options = [],
  onChange = () => {},
  renderOption = (option) => option,
}) {
  const [open, setOpen] = useState(false)

  const ref = useRef()
  useClickOutside(ref, () => setOpen(false))

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label
          onClick={() => {
            setOpen(true)
          }}
        >
          {label}
        </label>
      )}

      <div
        className="w-full p-2 border"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value.map((v) => renderOption(v)).join(", ")}
        &nbsp;
      </div>

      <div
        className={`border p-2 w-full mt-1 absolute  ${
          open ? "block" : "hidden"
        }`}
      >
        {options.map((option, i) => (
          <div
            className="flex items-center space-x-1 bg-white "
            onClick={() => {
              onChange(
                value.includes(option)
                  ? value.filter((v) => v !== option)
                  : [...value, option]
              )
            }}
            key={i}
          >
            <div className="w-5 ">
              {value.includes(option) ? (
                <CheckCircleIcon className="w-4 h-4 text-green-500" />
              ) : (
                ""
              )}
            </div>
            <div>{renderOption(option)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// import { useState, useRef } from 'react'
// import { CheckCircleIcon } from '@heroicons/react/solid'
// import useOnClickOutside from '@/hooks/use-click-outside'

// export default function MultiSelectField({
//   label,
//   value = [],
//   options = [],
//   onChange = () => {},
//   renderOption = (option) => option,
// }) {
//   const [open, setOpen] = useState(false)
//   const ref = useRef(undefined)

//   useOnClickOutside(ref, () => setOpen(false))

//   return (
//     <div className='relative w-full'>
//       {label && <label onClick={() => setOpen(true)}>{label}</label>}
//       <div ref={ref} className='w-full'>
//         <div
//           className='w-full p-2 border'
//           onClick={() => setOpen((prev) => !prev)}
//         >
//           {value.map((v) => renderOption(v)).join(',')} &nbsp;
//         </div>
//         <div
//           className={`border p-2 w-full mt-1 absolute ${
//             open ? 'block' : 'hidden'
//           }`}
//         >
//           {options.map((option) => (
//             <div
//               className='flex items-center p-2 space-x-2 bg-white'
//               onClick={() =>
//                 onChange(
//                   value.includes(option)
//                     ? value.filter((v) => v !== option)
//                     : [...value, option]
//                 )
//               }
//             >
//               <div className='w-5'>
//                 {value.includes(option) ? (
//                   <CheckCircleIcon className='w-5 h-5 text-green-500' />
//                 ) : (
//                   ''
//                 )}
//               </div>
//               <div>{renderOption(option)}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
