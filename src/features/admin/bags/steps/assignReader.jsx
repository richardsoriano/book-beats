import { useState, useRef } from "react"
import useClickOutside from "@/hooks/use-click-outside"

export default function assignReader({ readers, bag, setBag = () => {} }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(undefined)

  useClickOutside(ref, () => setOpen(false))

  const label = "Readers available for "

  let value = ""

  return (
    <div className="relative w-full my-2" ref={ref}>
      {label && (
        <label
          className="text-lg font-semibold text-gray-500"
          onClick={() => setOpen(true)}
        >
          {label} : {bag.category}
        </label>
      )}
      <div
        className="w-full p-2 my-2 border border-gray-900 rounded-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {bag.assigned
          ? readers.find((_reader) => _reader._id === bag.assigned).name
          : ""}
      </div>
      <div
        className={`absolute border w-full mt-1 ${open ? "block" : "hidden"}`}
      >
        {readers.map((reader, i) => (
          <div
            key={i}
            className="p-2 bg-white"
            onClick={() => {
              setBag((prev) => ({ ...prev, assigned: reader._id }))
              setOpen(false)
            }}
          >
            {reader.name}
          </div>
        ))}
      </div>
    </div>
  )
}
