import dbPromise from "@/modules/mongodb"

export default async function CreateBag(req, res) {
  const { name, category, books, reader, pickupstatus, titles, copyIds } =
    JSON.parse(req.body)

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("bags")
  const { insertedId } = await collection.insertOne({
    name,
    category,
    books,
    reader,
    pickupstatus,
    titles,
    copyIds,
  })
  res.status(201).json({
    _id: insertedId.toString(),
    name,
    category,
    books,
    reader,
    pickupstatus,
    titles,
    copyIds,
  })
}
