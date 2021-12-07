export function search(readers, query) {
  if (query.length < 3) return readers
  return readers.filter((reader) =>
    reader.name.toLowerCase().includes(query.toLowerCase())
  )
}
