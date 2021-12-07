import dbPromise from '@/modules/mongodb'
import { ObjectId } from 'mongodb'

export default async function SaveReaderInvitee(req, res) {
  const { _id, name, email, categories, role } = JSON.parse(req.body)
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('readers')

  if (req.method === 'DELETE') {
    // await collection.deleteOne({ _id: ObjectId(_id) })
    console.log('delete success')
    res.status(200)
  }
  if (req.method === 'PATCH') {
    const { upsertedId } = await collection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { name, email, categories, role } }
    )
    console.log('Patch success')
    res
      .status(200)
      .json({ _id: upsertedId.toString(), name, email, categories, role })
  }
}
