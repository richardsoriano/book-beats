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

export default handler
