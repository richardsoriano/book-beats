import dbPromise, { jsonify } from "@/modules/mongodb"
import { ObjectId } from "mongodb"

function createBulkUpdateString(arrayOfBagsToBeUpdated) {
  return arrayOfBagsToBeUpdated.map((item) => ({
    updateOne: {
      filter: { _id: ObjectId(item._id) },
      update: {
        $set: {
          name: item.name,
          reader: item.reader,
          category: item.category,
          pickupstatus: item.pickupstatus,
          books: [...item.books],
          titles: [...item.titles],
          copyIds: [...item.copyIds],
        },
      },
      upsert: true,
    },
  }))
}

function createBulkInsertString(arrayOfBagsToBeInserted) {
  return arrayOfBagsToBeInserted.map((item) => ({
    insertOne: {
      document: {
        name: item.name,
        reader: item.reader,
        category: item.category,
        pickupstatus: item.pickupstatus,
        books: item.books,
        titles: item.titles,
        copyIds: item.copyIds,
      },
    },
  }))
}

export default async function SaveBagsToDB(req, res) {
  console.log("Save To DB")
  const arrayOfBags = JSON.parse(req.body)

  let arrayOfBagsToBeInserted = arrayOfBags.filter((bag) => bag._id === "")
  let arrayOfBagsToBeUpdated = arrayOfBags.filter((bag) => bag._id !== "")

  const bulkDataUpdate = createBulkUpdateString(arrayOfBagsToBeUpdated)
  const bulkDataInsert = createBulkInsertString(arrayOfBagsToBeInserted)
  const bulkData = bulkDataInsert.concat(bulkDataUpdate)
  if (bulkData.length === 0) {
    res.status(200).json({ Hello: "Empty" })
    return
  }

  const dbConnectionBagsBulkWrite = await dbPromise
  const collection = await dbConnectionBagsBulkWrite.db().collection("bags")

  try {
    console.log("bulkData", bulkData)
    const result = await collection.bulkWrite(bulkData, {
      ordered: false,
      upsert: true,
    })
    res.status(200).json({ result })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error })
  }

  return
}
