import Table from "ui/table"
export default function BooksAvailable({ booksNoBags }) {
  return (
    <>
      <div>Books that need bags</div>
      <Table
        columns={[
          { heading: "Title", sortable: "name" },
          { heading: "Author", sortable: "auth1" },
          { heading: "Categories", sortable: "categories" },
          { heading: "copyIds", sortable: "copyIds" },
        ]}
        rows={booksNoBags}
        renderRow={(_books, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} p-2`,
          }

          return (
            <tr key={i}>
              <td {...tdProps}>{_books.title}</td>
              <td {...tdProps}>{_books.auth1}</td>
              <td {...tdProps}>{_books.categories.join(", ")}</td>
              <td {...tdProps}>{_books.copyIds.join(", ")}</td>
            </tr>
          )
        }}
      />
    </>
  )
}
