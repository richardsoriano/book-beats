

export default async function CreateReaderInvitee(req, res) {
  const { name, category, books } = JSON.parse(req.body)
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const { insertedId } = await collection.insertOne({
    name,
    category,
    books,
  })
  console.dir(insertedId)
  res.status(201).json({ _id: insertedId.toString(), name, category, books })
}
