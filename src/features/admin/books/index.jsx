import { useState } from 'react'
import TextField from '@/ui/text-field'
import Dropdown from '@/ui/dropdown'
import Button from '@/ui/button'
import bookCategories from '@/data/categories.json'

export default function AdminEditBook({ selectedBook, onChange, close }) {
  const [values, setValues] = useState(
    selectedBook || {
      title: '',
      author: '',
      categories: [],
    }
  )

  async function save() {
    const { _id } = values
    const res = await fetch(`/api/resource/books/${_id ? _id : ''}`, {
      method: _id ? 'PUT' : 'POST',
      body: JSON.stringify(values),
    })

    onChange(await res.json())
    close()
  }

  return (
    <div className='flex-col space-y-4 border p-12'>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <Dropdown
          value={values.categories}
          items={bookCategories}
          onChange={(categories) =>
            setValues((prev) => ({
              ...prev,
              categories,
            }))
          }
        />
      </div>
      <Button onClick={save}>Save</Button>
    </div>
  )
}
