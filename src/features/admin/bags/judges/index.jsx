import { useState } from 'react'
import BookScoreResults from './bookScoreResults'
import Filters from './bookScoreResults/filters'
import BagJudgesResults from './bagJudgesResults'
import categories from '@/data/categories'

import Modal from '@/ui/modal'
import Button from '@/ui/button'
import BagJudgeForm from './form'

const newBag = {
  _id: '',
  name: '',
  category: undefined,
  books: [],
  assigned: [],
  pickupStatus: '',
}

export default function AdminBagsJudges({
  bags = [],
  books = [],
  readers = [],
  judgeAssignments = [],
}) {
  const [_bags, setBags] = useState(bags)
  const [selectedBag, setSelectedBag] = useState(undefined)
  const [bagToDelete, setBagToDelete] = useState(undefined)
  const [filteredCategories, setFilteredCategories] = useState([])
  const pickupStatuses = ['needs pickup', 'picked up', 'returned']

  function deleteBag(bag) {
    setBagToDelete(bag)
  }

  async function deleteBagConfirmed() {
    const newBag = {
      _id: bagToDelete._id,
      name: '',
      category: undefined,
      books: [],
      assigned: [],
      pickupStatus: '',
    }
    const res = await fetch(`/api/bags/${bagToDelete._id}`, {
      method: 'DELETE',
      body: JSON.stringify(newBag),
    })
    setBags((prev) => prev.filter((_bag) => _bag._id !== bagToDelete._id))
  }

  return (
    <>
      <h1 className='text-2xl font-bold'>Book Scores</h1>
      <Filters
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        categories={categories}
      />
      <BookScoreResults books={books} filteredCategories={filteredCategories} />
      <div className='mb-4 mt-4 border-1 bg-blue-100'>
        <p>&nbsp;</p>
      </div>
      <h1 className='text-2xl font-bold'>Bags for Judges</h1>
      <Button onClick={() => setSelectedBag(newBag)}>New Bag</Button>

      <BagJudgesResults
        bags={_bags}
        filteredCategories={filteredCategories}
        deleteBag={deleteBag}
        setSelectedBag={selectedBag}
      />

      {selectedBag && (
        <Modal open={true} close={() => setSelectedBag(undefined)}>
          <BagJudgeForm
            books={books}
            bagProps={selectedBag}
            bags={_bags}
            setBags={setBags}
            setSelectedBag={setSelectedBag}
            filteredCategories={filteredCategories}
            readers={readers}
            pickupStatuses={pickupStatuses}
            judgeAssignments={judgeAssignments}
          />
        </Modal>
      )}
      {bagToDelete && (
        <Modal open={bagToDelete} close={() => setBagToDelete(undefined)}>
          <p>Are you sure you want to delete the bag {bagToDelete.name}</p>
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
