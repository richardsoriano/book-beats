import { useState, useEffect } from 'react'

import TextField from '@/ui/text-field'

export default function ReaderForm({ value, onChange = () => {} }) {
  const [values, setValues] = useState(
    value || {
      name: '',
      email: '',
    }
  )

  useEffect(() => {
    onChange(values)
  }, [values])

  return (
    <>
      <TextField
        label='Name'
        value={values.name}
        onChange={(name) =>
          setValues((prev) => ({
            ...prev,
            name,
          }))
        }
      />

      <TextField
        label='Email'
        value={values.email}
        onChange={(email) =>
          setValues((prev) => ({
            ...prev,
            email,
          }))
        }
      />
    </>
  )
}
