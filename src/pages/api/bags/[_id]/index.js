import dbPromise from '@/modules/mongodb'

export default async function SaveBag(req, res) {
  const { _id, name, category, books } = JSON.parse(req.body)
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const { upsertedId } = await collection.updateOne(
    { _id },
    { $set: { name, category, books } }
  )
  res.status(200).json(upsertedId)
}
