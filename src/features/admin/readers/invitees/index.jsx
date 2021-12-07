import { useState } from 'react'

import Table from 'ui/table'
import Filters from './filters'

import ReaderInviteeResults from './results'

export default function AdminReadersInvitees({ readers }) {
  const [_readers, setReaders] = useState(readers)
  const [selectedReader, setSelectedReader] = useState(undefined)
  const [query, setQuery] = useState('')

  return (
    <div>
      <h2 className='text-2xl font-bold'>Reader Invitees Page</h2>
      <Filters setQuery={setQuery} query={query} />
      <ReaderInviteeResults readers={_readers} query={query} />
    </div>
  )
}
