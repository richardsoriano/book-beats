import { useState, useEffect } from 'react'

import TextField from '@/ui/text-field'

export default function ReviewForm({ value, onChange = () => {} }) {
  const [values, setValues] = useState(
    value || {
      review: '',
    }
  )

  useEffect(() => {
    onChange(values)
  }, [values])

  return (
    <>
      {/* "review": {
          "creativity": 4,
          "topic": 4,
          "writing": 4,
          "structure": 4,
          "readingExperience": 4
        } */}
    </>
  )
}
