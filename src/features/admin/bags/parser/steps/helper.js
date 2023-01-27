export function isBagAvailable(book, copyId, bookCategory, localBags) {
  // bag conditions to add a book to a bag.
  // bags are not full = books.length < 4
  // bag is same category as any of the book categories. book.categories.include()
  // bag does not already have the book = !bags[i].books.includes(book._id)
  // bag does not already have the copyId = !bags[i].copyIds.include(copyId)

  for (let i = 0; i < localBags.length; i++) {
    if (
      localBags[i].copyIds.length < 4 &&
      localBags[i].category === bookCategory &&
      !localBags[i].books.includes(book._id) &&
      !localBags[i].copyIds.includes(copyId)
    ) {
      return i
    }
  }
  return -1
}

export function getBookCategoryExcluded(book, j) {
  return book.categories[j]
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
