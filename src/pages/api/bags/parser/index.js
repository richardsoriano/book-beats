import dbPromise from "@/modules/mongodb"
import { ObjectId } from "mongodb"

function createBulkUpdateString(arrayOfBagsToBeUpdated) {
  return arrayOfBagsToBeUpdated.map((item) => ({
    updateOne: {
      filter: { _id: item._id },
      update: {
        $set: {
          name: item.name,
          assigned: item.assigned,
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
      name: item.name,
      assigned: item.assigned,
      category: item.category,
      pickupstatus: item.pickupstatus,
      books: [...item.books],
      titles: [...item.titles],
      copyIds: [...item.copyIds],
    },
  }))
}

export default async function SaveBagsToDB(req, res) {
  console.log("Save To DB")
  const arrayOfBags = JSON.parse(req.body)

  let arrayOfBagsToBeInserted = arrayOfBags.filter(
    (bag) => !bag.hasOwnProperty("_id")
  )
  let arrayOfBagsToBeUpdated = arrayOfBags.filter((bag) =>
    bag.hasOwnProperty("_id")
  )
  console.log("insert=", arrayOfBagsToBeInserted)
  console.log("update=", arrayOfBagsToBeUpdated)

  const bulkDataUpdate = createBulkUpdateString(arrayOfBagsToBeUpdated)
  const bulkDataInsert = createBulkInsertString(arrayOfBagsToBeInserted)
  const bulkData = bulkDataInsert.concat(bulkDataUpdate)

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("bags")
  try {
    console.log("bulk", bulkData)
    const result = await collection.bulkWrite(bulkData, {
      ordered: false,
      upsert: true,
    })
    dbConnection.close()
    res.status(200).json({ result })
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error })
  }
}
