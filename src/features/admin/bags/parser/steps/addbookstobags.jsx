import Table from "ui/table"
import isBagAvailable from "./helper"
import Button from "ui/buttons"
export default function AddBooksToBags({
  booksNoBags,
  bags,
  setBags = () => {},
}) {
  function handleAddBooks() {
    const newBag = {
      name: "",
      books: [],
      titles: [],
      copyIds: [],
    }
    console.log("handling books")
    for (let i = 0; i < booksNoBags.length; i++) {
      for (let j = 0; j < booksNoBags[i].copyIds.length; j++) {
        let index = 0
        index = isBagAvailable(booksNoBags[i], booksNoBags[i].copyIds[j], bags)
        console.log("index= ", index)
        if (index >= 0) {
          console.log("Add Bag")
          bags[index].titles.push(booksNoBags[i].title)
          bags[index].books.push(booksNoBags[i]._id)
          bags[index].copyIds.push(booksNoBags[i].copyIds[j])
          console.log("new bags", bags)
          // setBags((prev) => ({ ...prev, bags }))
        } else {
          // create new bags
          // push new bag onto bags
          // setBags (prev=>{...prev,bags={bags}})
          // grab last bag name category +'random number'
          const newName = "category + rando"
          const newBag = {
            name: { newName },
            books: [booksNoBags[i].title],
            titles: [booksNoBags[i]._id],
            copyIds: [booksNoBags[i].copyIds[j]],
          }
          bags.push(newBag)
          console.log(bags)
        }
      }
    }
  }

  return (
    <>
      <h2>Add Bags to Books</h2>
      <div>
        <Button onClick={() => handleAddBooks()}>Add</Button>
      </div>
      <Table
        columns={[
          { heading: "Name", sortable: "name" },
          { heading: "Category", sortable: "category" },
          { heading: "Books", sortable: "books" },
          { heading: "Num Books", sortable: "numBooks" },
        ]}
        rows={bags}
        renderRow={(bag, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} p-2`,
          }

          return (
            <tr key={i}>
              <td {...tdProps}>{bag.name}</td>
              <td {...tdProps}>{bag.category}</td>
              <td {...tdProps}>{bag.titles.join(", ")}</td>
              <td {...tdProps}>{bag.books.length}</td>
            </tr>
          )
        }}
      />
    </>
  )
}
