import { useState } from 'react'

import { getSession } from 'next-auth/react'
import TextField from '@/ui/text-field'
import Page from '@/ui/page'
import Button from '@/ui/button'

export default function AdminBooks() {
  const [values, setValues] = useState({
    title: '',
    author: '',
  })

  async function save() {
    const res = await fetch('/api/resource/books', {
      method: 'POST',
      body: JSON.stringify(values),
    })

    console.dir(await res.json())
  }

  return (
    <div className='mt-16 ml-6 container mx-auto '>
      <Page
        title='Welcome to Book Beats'
        description='This is to assist the administrator in the Montana Book Clubs'
      >
        <TextField
          value={values.title}
          onChange={(title) =>
            setValues((prev) => ({
              ...prev,
              title,
            }))
          }
        />
        <TextField
          value={values.author}
          onChange={(author) =>
            setValues((prev) => ({
              ...prev,
              author,
            }))
          }
        />
        <Button onClick={save}>Save</Button>
      </Page>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session?.user || session.user.type !== 'admin')
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  return {
    props: {},
  }
}
