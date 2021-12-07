import { useState } from 'react'

import Form from './form'
import Table from '@/ui/table'
import Modal from '@/ui/modal'
import Button from '@/ui/buttons'
import { XIcon } from '@heroicons/react/solid'

const newBag = {
  name: '',
  category: undefined,
  books: [],
}

export default function AdminBags({ bags, books }) {
  const [_bags, setBags] = useState(bags)
  const [selectedBag, setSelectedBag] = useState(undefined)
  const [bagToDelete, setBagToDelete] = useState(undefined)

  function deleteBag(bag) {
    setBagToDelete(bag)
  }

  async function deleteBagConfirmed() {
    const newBag = {
      _id: bagToDelete._id,
      name: '',
      category: undefined,
      books: [],
    }

    const res = await fetch(`/api/bags/${bagToDelete._id}`, {
      method: 'DELETE',
      body: JSON.stringify(newBag),
    })

    setBags((prev) => prev.filter((_bag) => _bag._id !== bagToDelete._id))
  }

  return (
    <>
      <Button onClick={() => setSelectedBag(newBag)}>New Bag</Button>
      <Table
        columns={[
          { heading: 'Bag name', sortable: 'name' },
          { heading: 'Category', sortable: 'category' },
          { heading: 'Num books', sortable: 'numBooks' },
          { heading: 'Delete', sortable: false },
        ]}
        rows={_bags}
        renderRow={(bag, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => setSelectedBag(bag),
          }
          const tdDelProps = {
            className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
            onClick: () => deleteBag(bag),
          }
          return (
            <tr>
              <td {...tdProps}>{bag.name}</td>
              <td {...tdProps}>{bag.category}</td>
              <td {...tdProps}>{bag.numBooks}</td>
              <td {...tdDelProps}>
                {<XIcon className='w-5 h-5 text-red-500' />}
              </td>
            </tr>
          )
        }}
      />
      {selectedBag && (
        <Modal open={selectedBag} close={() => setSelectedBag(undefined)}>
          <Form
            bagProps={selectedBag}
            books={books}
            onSave={(json) => {
              setBags((prev) =>
                prev.map((bag) => (bag._id === json._id ? json : bag))
              )
              setSelectedBag(undefined)
            }}
          />
        </Modal>
      )}

      {bagToDelete && (
        <Modal open={bagToDelete} close={() => setBagToDelete(undefined)}>
          <p>Are you sure you want to delete the bag {bagToDelete.name}?</p>
          <Button
            onClick={() => {
              deleteBagConfirmed(selectedBag)
              setBagToDelete(undefined)
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setBagToDelete(undefined)}>No</Button>
        </Modal>
      )}
    </>
  )
}
