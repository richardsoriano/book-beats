import { Fragment } from "react"
import { Menu } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"

export default function Dropdown({ items, setItem }) {
  return (
    <Menu>
      <Menu.Button className="text-white bg-blue-500">Categories</Menu.Button>
      <ul>
        <Menu.Items>
          {items.map((item, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <li className={`${active && "bg-blue-500"}`}>{item}</li>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </ul>
    </Menu>
  )
}
