import { useState } from 'react'

import Button from '@/ui/buttons'

import { uniq } from '@/modules/array'

import NameBag from './steps/name-bag'
import AttachCategory from './steps/attach-category'
import AddBooks from './steps/add-books'

export default function BagForm({
  books,
  bagProps,
  bags,
  setBags = () => {},
  setSelectedBag = () => {},
}) {
  const [bag, setBag] = useState(bagProps)

  const [currentStep, setCurrentStep] = useState(0)
  const categories = uniq(books.flatMap((book) => book.categories))

  const steps = [
    {
      component: <NameBag bag={bag} setBag={setBag} />,
      label: 'Name bag',
    },
    {
      component: (
        <AttachCategory categories={categories} bag={bag} setBag={setBag} />
      ),
      label: 'Attach category',
    },
    {
      component: <AddBooks books={books} bag={bag} setBag={setBag} />,
      label: 'Bag books',
    },
  ]

  // async function saveBag() {
  //   const bagId = bag._id ? bag._id : ''
  //   const res = await fetch(`/api/bags/${bagId}`, {
  //     method: bagId ? 'PATCH' : 'POST',
  //     body: JSON.stringify(bag),
  //   })

  //   onSave(await res.json())
  // }
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
          numBooks: bag.books.length,
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
        {Object.keys(steps).map((step, i) => (
          <li
            className={`whitespace-nowrap ${
              steps[currentStep].label === steps[step].label
                ? 'border-blue-500 border-b-2'
                : ''
            } py-2 px-4`}
          >
            {i + 1}. {steps[step].label}
          </li>
        ))}
      </ul>

      <div className='my-8'>{steps[currentStep].component}</div>

      <div className='flex space-x-2'>
        {currentStep > 0 && (
          <Button
            onClick={() => {
              setCurrentStep((prev) => prev - 1)
            }}
          >
            Back
          </Button>
        )}

        {currentStep === steps.length - 1 ? (
          <Button onClick={saveBag}>Save</Button>
        ) : (
          <Button
            onClick={() => {
              setCurrentStep((prev) => prev + 1)
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
