import { useState, useEffect } from 'react'

import TextField from '@/ui/text-field'

export default function BookForm({ value, onChange = () => {} }) {
  const [values, setValues] = useState(
    value || {
      title: '',
      author: '',
    }
  )

  useEffect(() => {
    onChange(values)
  }, [values])

  return (
    <>
      <TextField
        label='Title'
        value={values.title}
        onChange={(title) =>
          setValues((prev) => ({
            ...prev,
            title,
          }))
        }
      />

      <TextField
        label='Author'
        value={values.author}
        onChange={(author) =>
          setValues((prev) => ({
            ...prev,
            author,
          }))
        }
      />
    </>
  )
}
