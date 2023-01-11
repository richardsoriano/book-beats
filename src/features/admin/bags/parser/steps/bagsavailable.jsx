import Table from "ui/table"

export default function BagsAvailable({ bags }) {
  return (
    <div>
      <h2>BagsAvailable</h2>

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
    </div>
  )
}
