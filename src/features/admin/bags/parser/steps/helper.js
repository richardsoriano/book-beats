export function isBagAvailable(book, copyId, bags, bookCategory) {
  // bag conditions to add a book to a bag.
  // bags are not full = books.length < 4
  // bag is same category as any of the book categories. book.categories.include()
  // bag does not already have the book = !bags[i].books.includes(book._id)
  // bag does not already have the copyId = !bags[i].copyIds.include(copyId)
  for (let i = 0; i < bags.length; i++) {
    console.log("bags[i].category", bags[i].category)
    console.log("bookCategory", bookCategory)
    if (
      bags[i].copyIds.length < 4 &&
      // book.categories.includes(bags[i].category) &&
      bags[i].category === bookCategory &&
      !bags[i].books.includes(book._id) &&
      !bags[i].copyIds.includes(copyId)
    ) {
      console.log("FOUND", i)
      return i
    }
  }
  // no bag found
  console.log("NOT FOUND")
  return -1
}

export function getBookCategoryExcluded(book, j) {
  // console.log("getBook", j, book)
  return book.categories[j]
}
