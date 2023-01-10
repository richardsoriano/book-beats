export default function isBagAvailable(book, copyId, bags) {
  for (let i = 0; i < bags.length; i++) {
    if (
      bags[i].books.length < 4 &&
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
