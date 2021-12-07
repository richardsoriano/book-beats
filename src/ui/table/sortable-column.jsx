import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

export default function SortableColumn({
  children,
  className,
  sortableDirection = 'asc',
  setSort = () => {},
  sort = false,
}) {
  return (
    <th onClick={setSort}>
      <div
        className={`${className} ${
          sort ? 'underline' : ''
        } flex space-x-1 items-center`}
      >
        <div>{children}</div>
        <div className='w-4'>
          {sort &&
            (sortableDirection === 'asc' ? (
              <ChevronUpIcon />
            ) : (
              <ChevronDownIcon />
            ))}
        </div>
      </div>
    </th>
  )
}
