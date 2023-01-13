export function isBagAvailable(book, copyId, bags) {
  // bag conditions to add a book to a bag.
  // bags are not full = books.length < 4
  // bag is same category as any of the book categories. book.categories.include()
  // bag does not already have the book = !bags[i].books.includes(book._id)
  // bag does not already have the copyId = !bags[i].copyIds.include(copyId)
  for (let i = 0; i < bags.length; i++) {
    console.log("bags[i].copyIds", bags[i].copyIds)
    if (
      bags[i].copyIds.length < 4 &&
      book.categories.includes(bags[i].category) &&
      !bags[i].books.includes(book._id) &&
      !bags[i].copyIds.includes(copyId)
    ) {
      return i
    }
  }
  // no bag found
  return -1
}

// to be modified so category goes with copyId
export function getBookCategoryExcluded(book) {
  console.log("getBook", book)
  return book.categories[0]
}
