import dbPromise from "@/modules/mongodb"

export default async function CreateBooks(req, res) {
  const arrayOfBooks = JSON.parse(JSON.stringify(req.body))

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("books")
  const { acknowledged, insertedIds } = await collection.insertMany(
    arrayOfBooks
  )
  if (acknowledged) {
    const arrInsertedIds = Object.values(insertedIds)
    const arrStrInsertedIds = arrInsertedIds.map((id) => id.toString())
    console.log("arr", arrStrInsertedIds)
    res.status(201).json({ _id: arrStrInsertedIds })
  } else {
    res.status(501).son({ error: error })
  }
}
