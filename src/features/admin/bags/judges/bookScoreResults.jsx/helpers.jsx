export function filter(books = [], filteredCategories = []) {
  return books.filter((book) =>
    filterBooksByCategories(book, filteredCategories)
  )
}

function filterBooksByCategories(book, filteredCategories) {
  if (filteredCategories.length === 0) return true
  return book.categories.some((category) =>
    filteredCategories.includes(category)
  )
}

export function filterJudges(judges = [], filteredCategories = []) {
  return judges.filter((judge) =>
    filterJudgesByCategories(judge, filteredCategories)
  )
}

function filterJudgesByCategories(judge, filteredCategories) {
  if (filteredCategories.length === 0) return true
  return judge.preferences.categories.some((category) =>
    filteredCategories.includes(category)
  )
}

export function filterBags(bags = [], filteredCategories = []) {
  return bags.filter((bag) => filterBagsByCategories(bag, filteredCategories))
}
function filterBagsByCategories(bag, filteredCategories) {
  if (filteredCategories.length === 0) return true
  return filteredCategories.includes(bag.category)
}

export function sort(books) {
  return books.sort((a, b) => {
    if (a.score > b.score) return -1
    if (a.score < b.score) return 1
    return 0
  })
}
