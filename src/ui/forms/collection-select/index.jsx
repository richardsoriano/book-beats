import { useState, useEffect } from 'react'

import TextField from '@/ui/text-field'

export default function CollectionSelect({
  value,
  label,
  collectionName,
  matchColumns = [],
  onChange = () => {},
  renderSearchItem = (item) => item,
  renderSelectedItem = (item) => item,
}) {
  const [values, setValues] = useState(value)
  const [filter, setFilter] = useState('')
  const [results, setResults] = useState([])

  const [selected, setSelected] = useState([])

  useEffect(async () => {
    if (filter.length <= 3) return setResults([])
    const res = await fetch(`/api/resource/${collectionName}`)
    setResults(
      (await res.json()).filter((record) =>
        matchColumns.some((col) =>
          record[col].toLowerCase().includes(filter.toLowerCase())
        )
      )
    )
  }, [filter])

  console.log('collection-select', results)
  return (
    <>
      {label}
      <TextField value={filter} onChange={(filter) => setFilter(filter)} />
      {results.length > 0 &&
        results.map((item) => (
          <div
            className='border'
            onClick={() => setSelected((prev) => [...prev, item])}
          >
            {renderSearchItem(item)}
          </div>
        ))}

      {selected.map((item) => (
        <div>{renderSelectedItem(item)}</div>
      ))}
    </>
  )
}
