import createHandler from 'next-connect'
import { ObjectId } from 'mongodb'

import clientPromise from '@/modules/mongodb'

const handler = createHandler()

handler.delete(async (req, res) => {
  await (
    await clientPromise
  )
    .db()
    .collection(req.query.collectionName)
    .deleteOne({ _id: ObjectId(req.query._id) })

  res.json({})
})

handler.put(async (req, res) => {
  const data = JSON.parse(req.body)
  const record = Object.keys(data).reduce((acc, key) => {
    if (key !== '_id') acc[key] = data[key]
    return acc
  }, {})

  await (
    await clientPromise
  )
    .db()
    .collection(req.query.collectionName)
    .updateOne({ _id: ObjectId(req.query._id) }, { $set: record })

  res.json({ _id: data._id, ...record })
})

export default handler
