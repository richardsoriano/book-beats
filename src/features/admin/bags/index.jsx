import { useState } from 'react'

import Form from './form'
import Table from '@/ui/table'
import Modal from '@/ui/modal'
import Button from '@/ui/buttons'

const newBag = {
  name: '',
  category: undefined,
  books: [],
}

export default function AdminBags({ bags, books }) {
  const [selectedBag, setSelectedBag] = useState(undefined)
  return (
    <>
      <Button onClick={() => setSelectedBag(newBag)}>New Bag</Button>
      <Table
        columns={[
          { heading: 'Bag name' },
          { heading: 'Category' },
          { heading: 'Num books' },
        ]}
        rows={bags}
        renderRow={(bag, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => setSelectedBag(bag),
          }
          return (
            <tr>
              <td {...tdProps}>{bag.name}</td>
              <td {...tdProps}>{bag.category}</td>
              <td {...tdProps}>{bag.books.length}</td>
            </tr>
          )
        }}
      />
      {selectedBag && (
        <Modal open={selectedBag} close={() => setSelectedBag(undefined)}>
          <Form
            bagProps={selectedBag}
            books={books}
            onCreate={(json) => {
              alert(json)
              setSelectedBag(undefined)
            }}
          />
        </Modal>
      )}
    </>
  )
}
