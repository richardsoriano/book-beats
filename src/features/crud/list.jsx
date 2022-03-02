import { useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'

import { PrimaryButton } from '@/ui/buttons'

import ConfirmModal from './modals/confirm'
import EditModal from './modals/edit'

export default function CrudList({
  collectionName,
  resourceName,
  rows = [],
  columns = [],
  values = [],
}) {
  const initialProps = Object.keys(columns).reduce((acc, column) => {
    acc[column] = ''
    return acc
  }, {})

  const [_rows, setRows] = useState(rows)
  const [editRowValues, setEditRowValues] = useState(initialProps)
  const [selectedRow, setSelectedRow] = useState(undefined)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  async function deleteObject(row) {
    const res = await fetch(`/api/resource/${collectionName}/${row._id}`, {
      method: 'delete',
    })
    const json = await res.json()
    setRows((prev) => prev.filter((_row) => _row._id !== row._id))
    setShowConfirmModal(false)
  }

  function getLabel(row, column) {
    const cell = row[column]
    if (cell === undefined) return ''

    console.dir({ row, column, cell: row[column] })

    switch (columns[column].control) {
      case 'select':
        return cell.label
      case 'array':
        return cell.join(' ')
      case 'reader':
        return [cell.name, `(${cell.email})`].join(' ')

      default:
        return cell
    }
  }

  async function saveObject(row) {
    const body = JSON.stringify({ ...row, ...values })

    const res = await fetch(
      `/api/resource/${collectionName}/${row._id ? row._id : ''}`,
      {
        method: row._id ? 'put' : 'post',
        body,
      }
    )
    const json = await res.json()

    setRows((prev) =>
      row._id
        ? prev.map((_row) => (_row._id === json._id ? json : _row))
        : [...prev, json]
    )
    setEditRowValues(initialProps)
    setShowEditModal(false)
  }

  function tdClassName(row) {
    return `cursor-pointer border-b p-2 text-left ${
      selectedRow?._id === row._id ? 'bg-blue-500 text-white' : ''
    }`
  }

  function thClassName() {
    return 'border-b p-2 text-left text-gray-800 bg-black-50'
  }

  return (
    <>
      <div className='flex flex-row-reverse w-full my-2'>
        <PrimaryButton onClick={() => setShowEditModal(true)}>
          Create new {resourceName}
        </PrimaryButton>
      </div>

      <table className='w-full p-2 border'>
        <thead>
          <tr>
            {Object.keys(columns).map((column) => (
              <th className={thClassName()}>{columns[column].label}</th>
            ))}
            <th className={thClassName()} />
          </tr>
        </thead>
        <tbody>
          {_rows.map((row, i) => (
            <tr className='even:bg-blue-50 hover:bg-blue-500 hover:text-white'>
              {Object.keys(columns).map((column) => (
                <td
                  onClick={() => setSelectedRow(row)}
                  className={tdClassName(row)}
                >
                  {getLabel(row, column)}
                </td>
              ))}

              <td
                className={tdClassName(row)}
                onClick={() => setSelectedRow(row)}
              >
                {selectedRow?._id === row._id && (
                  <div className='flex items-center justify-end space-x-2'>
                    <PencilIcon
                      className='w-5 h-5'
                      onClick={() => {
                        setEditRowValues(row)
                        setShowEditModal(true)
                      }}
                    />
                    <TrashIcon
                      className='w-5 h-5'
                      onClick={() => setShowConfirmModal(true)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        {...{
          data: selectedRow,
          isOpen: showConfirmModal,
          open: () => setShowConfirmModal(true),
          close: () => setShowConfirmModal(false),
          onConfirm: () => deleteObject(selectedRow),
        }}
      />

      <EditModal
        {...{
          resourceName,
          values: editRowValues,
          setValues: setEditRowValues,
          columns,
          isOpen: showEditModal,
          open: () => setShowEditModal(true),
          close: () => setShowEditModal(false),
          onSave: (row) => saveObject(row),
        }}
      />
    </>
  )
}
