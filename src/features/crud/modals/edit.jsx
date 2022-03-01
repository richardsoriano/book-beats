import Modal from '@/ui/modal'
import { PrimaryButton, LinkButton } from '@/ui/buttons'

import TextField from '@/ui/text-field'
import Dropdown from '@/ui/dropdown'

export default function EditModal({
  resourceName,
  values,
  setValues,
  columns,
  isOpen,
  title,
  open = () => {},
  close = () => {},
  onSave = () => {},
}) {
  function getEditControl(key, value) {
    if (['_id', 'id'].includes(key)) return ''

    try {
      switch (columns[key].control) {
        case 'text':
          return (
            <TextField
              label={columns[key].label}
              value={value}
              onChange={(value) =>
                setValues((prev) => ({
                  ...prev,
                  [key]: value,
                }))
              }
            />
          )

        case 'select':
          return (
            <Dropdown
              value={value}
              onChange={(option) =>
                setValues((prev) => ({
                  ...prev,
                  [key]: option.value,
                }))
              }
              items={columns[key].options.map((option) => ({
                label: option.label,
                value: option,
              }))}
            >
              Select {columns[key].label}
            </Dropdown>
          )
      }
    } catch (e) {
      console.dir(e)
    }
  }

  return (
    <Modal
      {...{
        isOpen,
        title,
        open,
        close,
        title: `Creating a new ${resourceName}`,
      }}
    >
      <div className='my-12'>
        {values &&
          Object.entries(values).map(([key, value]) => (
            <div className='my-2'>{getEditControl(key, value)}</div>
          ))}
      </div>

      <PrimaryButton block onClick={() => onSave(values)}>
        Save
      </PrimaryButton>
      <div className='px-1 py-2'>
        <LinkButton onClick={close}>Cancel and close</LinkButton>
      </div>
    </Modal>
  )
}
