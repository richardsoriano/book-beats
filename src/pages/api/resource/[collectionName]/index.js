import createHandler from 'next-connect'

import clientPromise from '@/modules/mongodb'

const handler = createHandler()

handler.post(async (req, res) => {
  const record = JSON.parse(req.body)
  const { insertedId } = await (await clientPromise)
    .db()
    .collection(req.query.collectionName)
    .insertOne(record)

  res.json({ _id: insertedId, ...record })
})

handler.get(async (req, res) => {
  const records = await (await clientPromise)
    .db()
    .collection(req.query.collectionName)
    .find({})
    .toArray()

  res.json(records)
})

export default handler
