import { useState } from 'react'
import readers from '@/data/readers'
import books from '@/data/books'

import TextField from 'ui/text-field'
import SelectField from 'ui/select-field'

import { uniq } from '@/modules/array'
import NameBag from './steps/nameBag'
import AttachCategory from './steps/attachCategory'
import BagBooks from './steps/bagBooks'

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
const newBag = {
  name: '',
  books: [],
  category: undefined,
  reader: undefined,
}

export default function bagForm({ books, bagProps, onCreate = () => {} }) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    { label: 'name bag' },
    { label: 'attach category' },
    { label: 'bag books' },
  ]
  return (
    <div>
      <ul className='flex space-x-2 mb-4'>
        {steps.map((step, i) => (
          <li>{steps[i].label}</li>
        ))}
      </ul>
      {currentStep > 0 && (
        <Button onClick={() => setCurrentStep((prev) => prev - 1)}>Prev</Button>
      )}
      {currentStep < steps.length - 1 ? (
        <Button onClick={() => setCurrentStep((prev) => prev + 1)}>Next</Button>
      ) : (
        <Button onClick={() => SaveBag()}>Save</Button>
      )}
    </div>
  )
}
