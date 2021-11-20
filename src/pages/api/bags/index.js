import dbPromise from '@/modules/mongodb'

export default async function CreateBag(req, res) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const { insertedId } = await collection.insertOne(JSON.parse(req.body))
  res.status(201).json(insertedId)
}
