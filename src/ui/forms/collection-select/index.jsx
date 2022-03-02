import { useState, useEffect } from 'react'

import TextField from '@/ui/text-field'

export default function CollectionSelect({
  value,
  collectionName,
  matchColumns = [],
  onChange = () => {},
  renderItem = (item) => item,
}) {
  const [values, setValues] = useState(value)
  const [filter, setFilter] = useState('')
  const [results, setResults] = useState([])

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

  return (
    <>
      <TextField value={filter} onChange={(filter) => setFilter(filter)} />

      {results.map((item) => (
        <div onClick={() => onChange(item)}>{renderItem(item)}</div>
      ))}
    </>
  )
}
