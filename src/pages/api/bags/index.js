import dbPromise from '@/modules/mongodb'

export default async function CreateBag(req, res) {
  const { name, email, category, role } = JSON.parse(req.body)
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('readers')
  const { insertedId } = await collection.insertOne({
    name,
    email,
    category,
    role,
  })
  console.dir(insertedId)
  res.status(201).json({ _id: insertedId.toString(), name, category, books })
}
