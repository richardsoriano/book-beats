import { useState } from 'react'
import { search } from './helpers'
import { XIcon } from '@heroicons/react/solid'
import Table from 'ui/table'
import ReaderInviteeForm from './form'
import Modal from '@/ui/modal'

export default function ReaderInviteeResults({ readers, query }) {
  const [_readers, setReaders] = useState(readers)
  const [selectedReader, setSelectedReader] = useState(undefined)

  return (
    <>
      <Table
        columns={[
          { heading: 'Name', sortable: 'name' },
          { heading: 'Email', sortable: 'email' },
          { heading: 'Categories', sortable: 'categories' },
          { heading: 'Role', sortable: 'role' },
          { heading: 'Del', sortable: false },
        ]}
        rows={search(_readers, query)}
        renderRow={(reader, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => setSelectedReader(reader),
          }
          const tdDelProps = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => {
              deleteReader(reader)
              setReaders((prev) =>
                prev.filter((_reader) => _reader._id !== reader._id)
              )
            },
          }
          return (
            <tr>
              <td {...tdProps}>{reader.name}</td>
              <td {...tdProps}>{reader.email}</td>
              <td {...tdProps}>{reader.categories.join(', ')}</td>
              <td {...tdProps}>{reader.role}</td>
              <td {...tdDelProps}>
                {<XIcon className='w-5 h-5 text-red-500' />}
              </td>
            </tr>
          )
        }}
      />
      {selectedReader && (
        <Modal open={selectedReader} close={() => setSelectedReader(undefined)}>
          <ReaderInviteeForm readerProps={selectedReader} />
        </Modal>
      )}
    </>
  )
}
