import { useState } from 'react'
import readers from '@/data/readers'
import books from '@/data/books'

import TextField from 'ui/text-field'
import SelectField from 'ui/select-field'

import { uniq } from '@/modules/array'

const categories = uniq(
  books.reduce((acc, assignment) => {
    return [...acc, ...assignment.categories]
  }, [])
)
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
export default function BagPage({ books }) {
  const [currentStep, setCurrentStep] = useState('start')
  const [bag, setBag] = useState({
    name: '',
    books: [],
    category: undefined,
    status: '',
    assigned: '',
  })
  const steps = {
    start: {
      component: (
        <Button
          className='bg-blue-500 text-white-500 px-6 py-4 shadow border'
          onClick={() => {
            setCurrentStep('nameBag')
          }}
        >
          {' '}
          Create a bag
        </Button>
      ),
      label: 'Start Here',
    },
    nameBag: {
      component: (
        <div className='flex'>
          <TextField
            placeholder='Name the bag'
            value={bag.name}
            onChange={(name) => setBag((prev) => ({ ...prev, name }))}
          />
          <Button onClick={() => setCurrentStep('attachCategory')}>
            Create a bag
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
      label: 'Attach Category',
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
          <Button onClick={saveBag}>Save Bag</Button>
        </div>
      ),
      label: 'Bag Books',
    },
  }
  async function saveBag() {
    const res = await fetch('/api/bags', {
      method: 'POST',
      body: JSON.stringify(bag),
    })
    const json = res.json()
    console.dir(json)
  }
  return (
    <div className='container flex justify-center mt-16'>
      <div className='w-1/2'>
        <ul className='flex space-x-4 mb-4'>
          {Object.keys(steps).map((step) => (
            <li
              className={`${
                steps[step].label === steps[currentStep].label
                  ? 'bg-blue-500 text-white'
                  : 'border '
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
// const bag = {
//   name: '',
//   books: [],
//   category: undefined,
//   reader: undefined,
// }

export function getServerSideProps(req) {
  return {
    props: {
      readers,
      books,
    },
  }
}
