import Modal from "@/ui/modal"
import Button from "@/ui/buttons"

import TextField from "@/ui/text-field"
import Dropdown from "@/ui/dropdown"

import CollectionSelect from "@/ui/forms/collection-select"

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
    if (["_id", "id"].includes(key)) return ""

    try {
      switch (columns[key].control) {
        case "text":
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

        case "select":
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
        case "reader-select":
          return (
            <CollectionSelect
              collectionName="readers"
              label={columns[key].label}
              value={value}
              onChange={(value) =>
                setValues((prev) => ({
                  ...prev,
                  [key]: value,
                }))
              }
              renderSearchItem={columns[key].renderSearchItem}
              renderSelectedItem={columns[key].renderSelectedItem}
              matchColumns={["name", "email"]}
            />
          )
        case "book-select":
          return (
            <CollectionSelect
              collectionName="books"
              label={columns[key].label}
              value={value}
              onChange={(reader) =>
                setValues((prev) => ({
                  ...prev,
                  [key]: reader,
                }))
              }
              renderSearchItem={columns[key].renderSearchItem}
              renderSelectedItem={columns[key].renderSelectedItem}
              matchColumns={["title", "author"]}
            />
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
      <div className="my-12">
        {values &&
          Object.entries(values).map(([key, value]) => (
            <div className="my-2">{getEditControl(key, value)}</div>
          ))}
      </div>

      <Button block onClick={() => onSave(values)}>
        Save
      </Button>
      <div className="px-1 py-2">
        <Button onClick={close}>Cancel and close</Button>
      </div>
    </Modal>
  )
}
