import { useState } from 'react'
// import books from '@/data/books'

import { uniq } from '@/modules/array'
import NameBag from './steps/nameBag'
import AttachJudges from './steps/attachJudges'
import BagBooks from './steps/bagBooks'
import AttachPickupStatus from './steps/attachPickupStatus'
function Button({ children, onClick = () => {} }) {
  return (
    <button
      className='bg-blue-500 text-white border rounded-sm px-6 py-4'
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function BagJudgeForm({
  books,
  bagProps,
  bags,
  setBags = () => {},
  setSelectedBag = () => {},
  filteredCategories,
  readers,
  pickupStatuses,
  judgeAssignments = [],
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bag, setBag] = useState(bagProps)
  const categories = uniq(
    books.reduce((acc, assignment) => {
      return [...acc, ...assignment.categories]
    }, [])
  )
  const steps = [
    {
      component: <NameBag bag={bag} setBag={setBag} />,
      label: 'Name Bag',
    },
    {
      component: (
        <BagBooks
          books={books}
          bag={bag}
          setBag={setBag}
          filteredCategories={filteredCategories}
        />
      ),
      label: 'Bag Books',
    },
    {
      component: (
        <AttachJudges
          filteredCategories={filteredCategories}
          bag={bag}
          setBag={setBag}
          readers={readers}
          judgeAssignments={judgeAssignments}
        />
      ),
      label: 'Attach Judges',
    },
    {
      component: (
        <AttachPickupStatus
          bag={bag}
          setBag={setBag}
          pickupStatuses={pickupStatuses}
        />
      ),
      label: 'Bag Status',
    },
  ]
  async function saveBag() {
    const bagId = bag._id ? bag._id : ''
    let newBag
    const res = await fetch(`/api/bags/${bagId}`, {
      method: bagId ? 'PATCH' : 'POST',
      body: JSON.stringify(bag),
    })
      .then((res) => res.json())
      .then((data) => {
        // enter you logic when the fetch is successful
        newBag = {
          _id: data._id,
          name: data.name,
          category: data.category,
          books: data.books,
          assigned: data.assigned,
          pickupStatus: data.pickupStatus,
        }
      })
    if (bagId !== '') {
      bags.map((_bag) => console.log(_bag._id))

      // remove the old version
      setBags((prev) => prev.filter((_bag) => _bag._id !== bagId))
      bags.map((_bag) => console.log(_bag._id))
    }

    setBags((prev) => [...prev, newBag])
    setSelectedBag(undefined)
  }

  return (
    <div>
      <ul className='flex space-x-2 mb-4'>
        {Object.keys(steps).map((step) => (
          <li
            className={`${
              steps[step].label === steps[currentStep].label ? 'underline' : ''
            }`}
          >
            {step}. {steps[step].label}
          </li>
        ))}
      </ul>
      {currentStep > 0 && (
        <Button onClick={() => setCurrentStep((prev) => prev - 1)}>Prev</Button>
      )}
      {currentStep < steps.length - 1 ? (
        <Button onClick={() => setCurrentStep((prev) => prev + 1)}>Next</Button>
      ) : (
        <Button onClick={saveBag}>Save</Button>
      )}
      <div>{steps[currentStep].component}</div>
    </div>
  )
}
