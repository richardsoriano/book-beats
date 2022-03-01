import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function Dropdown({
  children,
  value,
  items = [],
  onChange = () => {},
}) {
  return (
    <div>
      <Menu as='div' className='relative inline-block text-left bg-white '>
        <div>
          <Menu.Button className='flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-gray-900 rounded-md text-black-800 bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            {value ? value.label : children}
            <ChevronDownIcon
              className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute left-0 z-50 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {items.map((item) => (
              <div className='px-1 py-1' onClick={() => onChange(item)}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-violet-500 text-black-800'
                          : 'bg-white text-gray-900'
                      }  bg-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <div className='flex items-start px-3 py-2 space-x-2'>
                        <div>{item.icon}</div>
                        <div>{item.label}</div>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
