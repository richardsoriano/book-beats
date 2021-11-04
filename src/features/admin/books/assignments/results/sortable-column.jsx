import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'

export default function SortableColumn({
  children,
  className,
  sortableDirection = 'asc',
  setSort = () => {},
  sort = false,
}) {
  return (
    <th
      className={`${className} ${sort ? 'underline' : ''}`}
      onClick={() => setSort(true)}
    >
      <div className='flex space-x-1 items-center'>
        <div>{children}</div>
        <div className='w-3'>
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
