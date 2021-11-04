import Table from '@/ui/table'

export default function AdminReaderAssignments({ reader, assignments }) {
  const columns = [
    { heading: 'Book', sortable: 'book' },
    { heading: 'Reviewed on', sortable: 'reviwedOn' },
  ]

  return (
    <div className='flex space-x-10'>
      <div className=''>
        <div className='text-2xl font-medium my-4'>{reader.name}</div>
        <div>
          <div className='underline'>Categories</div>
          {reader.preferences.categories.map((category) => (
            <div>{category}</div>
          ))}
        </div>
      </div>
      <div className='flex-grow mt-8'>
        <Table
          columns={columns}
          rows={assignments}
          renderRow={(row) => (
            <tr>
              <td>{row.book}</td>
              <td>{row.reviwedOn}</td>
            </tr>
          )}
        />
      </div>
    </div>
  )
}
