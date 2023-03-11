import { useState } from "react"

import Table from "@/ui/table"
import Modal from "@/ui/modal"
import Button from "@/ui/buttons"
import BagForm from "./form"
import { XIcon } from "@heroicons/react/solid"
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid"
const newBag = {
  _id: "",
  name: "",
  category: undefined,
  books: [],
  reader: undefined,
  pickupstatus: undefined,
  titles: "",
  copyIds: [],
}

export default function AdminBags({ bags, books, readerAssignments, readers }) {
  const [_bags, setBags] = useState(bags)
  const [selectedBag, setSelectedBag] = useState(undefined)
  const [bagToDelete, setBagToDelete] = useState(undefined)
  const [errors, setErrors] = useState([])
  const pickupstatus = ["needs pickup", "picked up", "returned"]

  function deleteBag(bag) {
    setBagToDelete(bag)
  }

  async function deleteBagConfirmed() {
    const newBag = {
      _id: bagToDelete._id,
      name: "",
      category: undefined,
      reader: "",
      pickupstatus: undefined,
      books: [],
      titles: "",
      copyIds: [],
    }
    const res = await fetch(`/api/bags/${bagToDelete._id}`, {
      method: "DELETE",
      body: JSON.stringify(newBag),
    })
    setBags((prev) => prev.filter((_bag) => _bag._id !== bagToDelete._id))
  }

  function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "bagId", headerName: "Bag ID", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "category", headerName: "Category", width: 170 },
    { field: "numBooks", headerName: "Num Books", width: 170 },
    { field: "titles", headerName: "Titles", width: 170 },
    { field: "copyIds", headerName: "Copy ID", width: 170 },
    { field: "reader", headerName: "Reader", width: 170 },
    { field: "status", headerName: "Status", width: 170 },
  ]

  const rows = _bags.map((_bag, i) => ({
    id: i,
    bagId: _bag._id,
    name: _bag.name,
    category: _bag.category,
    numBooks: _bag.numBooks,
    titles: _bag.titles.join(", "),
    copyIds: _bag.copyIds.join(", "),
    reader: _bag.reader,
    status: _bag.status,
  }))

  return (
    <div>
      <h1 className="text-2xl font-bold">Bags</h1>

      <Button onClick={() => setSelectedBag(newBag)}>New Bag</Button>

      <div style={{ height: 400, width: "90%" }}>
        <h4>Export to CSV</h4>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: MyExportButton,
          }}
        />
      </div>
      <Table
        columns={[
          { heading: "Name", sortable: "name" },
          { heading: "Category", sortable: "category" },
          { heading: "Num Books", sortable: "numBooks" },
          { heading: "Titles", sortable: "titles" },
          { heading: "CopyIds", sortable: "copyIds" },
          { heading: "Reader", sortable: "reader" },
          { heading: "Status", sortable: "pickupstatus" },
          { heading: "Delete", sortable: false },
        ]}
        rows={_bags}
        renderRow={(bag, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} p-2`,
            onClick: () => setSelectedBag(bag),
          }
          const tdDel = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} p-2`,
            onClick: () => deleteBag(bag),
          }

          return (
            <tr key={i}>
              <td {...tdProps}>{bag.name}</td>
              <td {...tdProps}>{bag.category}</td>
              <td {...tdProps}>{bag.numBooks}</td>
              <td {...tdProps}>{bag.titles ? bag.titles.join(", ") : ""}</td>
              <td {...tdProps}>{bag.copyIds ? bag.copyIds.join(", ") : ""}</td>
              <td {...tdProps}>{bag.reader ? bag.reader : "unassigned"}</td>
              <td {...tdProps}>{bag.pickupstatus}</td>
              <td {...tdDel}>{<XIcon className="w-5 h-5 text-red-500" />}</td>
            </tr>
          )
        }}
      />
      {selectedBag && (
        <Modal open={true} close={() => setSelectedBag(undefined)}>
          <BagForm
            books={books}
            bagProps={selectedBag}
            bags={_bags}
            readers={readers}
            pickupstatus={pickupstatus}
            setBags={setBags}
            setSelectedBag={setSelectedBag}
            setErrors={setErrors}
          />
        </Modal>
      )}
      {bagToDelete && (
        <Modal open={bagToDelete} close={() => setBagToDelete(undefined)}>
          <p>Are you sure you want to delete the bag {bagToDelete.name}</p>
          <Button
            onClick={() => {
              deleteBagConfirmed(selectedBag)
              setBagToDelete(undefined)
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setBagToDelete(undefined)}>No</Button>
        </Modal>
      )}
    </div>
  )
}
