export function filter(
  assignments,
  filteredStatus,
  filteredCategories,
  statuses
) {
  return assignments.filter(
    (assignment) =>
      filterByStatus(assignment, filteredStatus, statuses) &&
      filterByCategories(assignment, filteredCategories)
  )
}

export function search(assignments, query) {
  if (query.trim() === '') return assignments
  if (query.length < 3) return assignments
  return assignments.filter(
    (assignment) =>
      searchTitle(assignment, query) || searchCategory(assignment, query)
  )
}

function searchTitle(assignment, query) {
  return assignment.title.toLowerCase().includes(query.toLowerCase())
}

function searchCategory(assignment, query) {
  return (
    assignment.categories.filter((category) =>
      category.toLowerCase().includes(query.toLowerCase())
    ).length > 0
  )
}

function filterByStatus(assignment, filteredStatus, statuses) {
  if (compareCaseInsensitive(filteredStatus, statuses[0])) return true
  return compareCaseInsensitive(assignment.status, filteredStatus)
}

function filterByCategories(assignment, filteredCategories) {
  if (filteredCategories.length === 0) return true
  return assignment.categories.some((category) =>
    filteredCategories.includes(category)
  )
}

function compareCaseInsensitive(a, b) {
  return a.toLowerCase() === b.toLowerCase()
}
