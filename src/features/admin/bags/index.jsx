import { useState } from "react"

import Table from "@/ui/table"
import Modal from "@/ui/modal"
import Button from "@/ui/buttons"
import BagForm from "./form"
import { XIcon } from "@heroicons/react/solid"

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
    }
    const res = await fetch(`/api/bags/${bagToDelete._id}`, {
      method: "DELETE",
      body: JSON.stringify(newBag),
    })
    setBags((prev) => prev.filter((_bag) => _bag._id !== bagToDelete._id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Bags</h1>
      {errors.map((error) => (
        <div className="py-4">
          <span className="text-lg font-semibold text-red-500">{error}</span>
        </div>
      ))}
      <Button onClick={() => setSelectedBag(newBag)}>New Bag</Button>
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
              <td {...tdProps}>{bag.titles.join(", ")}</td>
              <td {...tdProps}>{bag.copyIds.join(", ")}</td>
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
