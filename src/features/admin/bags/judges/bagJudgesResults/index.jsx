import { filterBags } from './../bookScoreResults/helpers'
import Table from '@/ui/table'
import { XIcon } from '@heroicons/react/solid'

export default function BagJudgesResults({
  bags,
  filteredCategories,
  deleteBag,
  setSelectedBag,
}) {
  return (
    <Table
      columns={[
        { heading: 'Name', sortable: 'name' },
        { heading: 'Category', sortable: 'category' },
        { heading: 'Books', sortable: 'books' },
        { heading: 'Judges', sortable: 'assigned' },
        { heading: 'Status', sortable: 'pickupStatus' },
        { heading: 'Delete', sortable: false },
      ]}
      rows={filterBags(bags, filteredCategories)}
      renderRow={(bag, i) => {
        const tdProps = {
          className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
          onClick: () => setSelectedBag(bag),
        }
        const tdDel = {
          className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
          onClick: () => deleteBag(bag),
        }
        return (
          <tr>
            <td {...tdProps}>{bag.name}</td>
            <td {...tdProps}>{bag.category}</td>
            <td {...tdProps}>{bag.books.join(', ')}</td>
            <td {...tdProps}>{bag.assigned}</td>
            <td {...tdProps}>{bag.pickupStatus}</td>
            <td {...tdDel}>{<XIcon className='w-5 h-5 text-red-500' />}</td>
          </tr>
        )
      }}
    />
  )
}
