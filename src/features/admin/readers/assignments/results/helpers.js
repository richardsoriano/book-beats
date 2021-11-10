export function filter(assignments, filteredCategories) {
  return assignments.filter((assignment) =>
    filterByCategories(assignment, filteredCategories)
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

function filterByCategories(assignment, filteredCategories) {
  if (filteredCategories.length === 0) return true
  return assignment.categories.some((category) =>
    filteredCategories.includes(category)
  )
}
