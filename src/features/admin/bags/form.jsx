import { useState } from 'react'

import TextField from '@/ui/text-field'
import SelectField from '@/ui/select-field'
import Button from '@/ui/buttons'

import { uniq } from '@/modules/array'

export default function BagForm({ bagProps, books, onCreate = () => {} }) {
  const [bag, setBag] = useState(bagProps)

  const [currentStep, setCurrentStep] = useState('nameBag')
  const categories = uniq(books.flatMap((book) => book.categories))

  const steps = {
    nameBag: {
      component: (
        <div className='flex'>
          <TextField
            placeholder='Name the bag'
            value={bag.name}
            onChange={(name) =>
              setBag((prev) => ({
                ...prev,
                name,
              }))
            }
          />
          <Button onClick={() => setCurrentStep('attachCategory')}>
            Name bag
          </Button>
        </div>
      ),
      label: 'Name bag',
    },
    attachCategory: {
      component: (
        <SelectField
          options={categories}
          label='Select a category'
          value={bag.category}
          onChange={(category) => {
            setBag((prev) => ({
              ...prev,
              category,
            }))
            setCurrentStep('bagBooks')
          }}
        />
      ),
      label: 'Attach category',
    },
    bagBooks: {
      component: (
        <div>
          <ul>
            {books.map((book) => (
              <li
                className={`p-2 hover:bg-blue-500 hover:text-white border border-white ${
                  bag.books.includes(book) ? 'bg-blue-500 text-white' : ''
                }`}
                onClick={() =>
                  setBag((prev) => ({
                    ...prev,
                    books: prev.books.includes(book)
                      ? prev.books.filter((_book) => _book !== book)
                      : [...prev.books, book],
                  }))
                }
              >
                {book.title} - {book.author}
              </li>
            ))}
          </ul>
          <Button onClick={() => (bag._id ? saveBag(bag._id) : createBag())}>
            Save bag
          </Button>
        </div>
      ),
      label: 'Bag books',
    },
  }

  async function saveBag(_id) {
    const res = await fetch(`/api/bags/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(bag),
    })

    onCreate(await res.json())
  }

  async function createBag() {
    const res = await fetch(`/api/bags`, {
      method: 'POST',
      body: JSON.stringify(bag),
    })

    onCreate(await res.json())
  }

  return (
    <div className='container flex justify-center mt-16'>
      <div className='w-1/2'>
        <ul className='flex space-x-4 mb-4'>
          {Object.keys(steps).map((step) => (
            <li
              className={`${
                steps[currentStep].label === steps[step].label
                  ? 'bg-blue-500 text-white'
                  : 'border'
              } py-2 px-4`}
            >
              {steps[step].label}
            </li>
          ))}
        </ul>
        <div>{steps[currentStep].component}</div>
      </div>
    </div>
  )
}
