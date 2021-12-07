import { useState } from 'react'

import TextField from 'ui/text-field'
import MuliSelectField from 'ui/multi-select-field'
import SelectField from 'ui/select-field'

import Button from 'ui/buttons'

const role = ['reader', 'wrangler', 'judge']
export default function ReaderInviteeForm({
  readerProps,
  categories,
  onSave = () => {},
}) {
  const [readerInvitee, setReaderInvitee] = useState(readerProps)

  async function saveReaderInvitee() {
    const readerId = readerInvitee._id ? readerInvitee._id : ''

    console.log('saveReader', readerInvitee)

    const res = fetch(`/api/readers/${readerId}`, {
      method: readerId ? 'PATCH' : 'POST',
      body: JSON.stringify(reader),
    })
    console.log('res', res)
    onSave(await res.json())
  }
  return (
    <div>
      <h2 className='font-semibold'>New Reader </h2>
      <div className='py-2'>
        <TextField
          placeholder='Name'
          value={readerInvitee.name}
          onChange={(name) => setReaderInvitee((prev) => ({ ...prev, name }))}
        />
      </div>
      <div className='py-2'>
        <TextField
          placeholder='Email'
          value={readerInvitee.email}
          onChange={(email) => setReaderInvitee((prev) => ({ ...prev, email }))}
        />
      </div>
      <div className='py-2'>
        <SelectField
          options={role}
          label={'Select A Role'}
          value={readerInvitee.role}
          onChange={(roles) => setReaderInvitee((prev) => ({ ...prev, role }))}
        />
      </div>
      <div className='py-2'>
        <MuliSelectField
          options={categories}
          label={'Select A Category'}
          value={readerInvitee.categories}
          onChange={(categories) =>
            setReaderInvitee((prev) => ({ ...prev, categories }))
          }
        />
      </div>
      <Button onClick={saveReaderInvitee}>Save </Button>
    </div>
  )
}
