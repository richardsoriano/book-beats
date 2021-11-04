export function filter(assignments, filteredcategories) {
  return assignments.filter((assignment) =>
    filterBycategories(assignment, filteredcategories)
  )
}

export function search(assignments, query) {
  if (query.length < 3) return assignments
  return assignments.filter(
    (assignment) =>
      searchReader(assignment, query) || searchCategory(assignment, query)
  )
}

function searchReader(assignment, query) {
  return assignment.reader.toLowerCase().includes(query.toLowerCase())
}

function searchCategory(assignment, query) {
  return (
    assignment.categories.filter((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    ).length > 0
  )
}

function filterBycategories(assignment, filteredcategories) {
  if (filteredcategories.length === 0) return true
  return assignment.categories.some((category) =>
    filteredcategories.includes(category)
  )
}
