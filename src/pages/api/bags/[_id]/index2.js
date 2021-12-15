import dbPromise from '@/modules/mongodb'
import { ObjectId } from 'mongodb'
import connect from 'next-connect'

const handler = connect()

async function saveBag(req, res) {
  const { _id, name, category, books } = JSON.parse(req.body)
  console.log('save Bag')
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')

  // const { upsertedId } = await collection.updateOne(
  //   { _id: ObjectId(_id) },
  //   { $set: { name, category, books } },
  //   { upsert: true }
  // )
  // console.log('upsertedId', upsertedId)
  // res.status(200).json({ _id: upsertedId.toString(), name, category, books })

  // PAUL
  console.log('id', _id)

  let upsertedBag
  handler.put(async (req, res) => {
    upsertedBag = await collection
      .findByIdAndUpdate(
        _id,
        { $set: { name: name, category: category, books: books } },
        { upsert: true }
      )
      .exec()
    res.status(202).json(upsertedBag)
  })

  // const upsertedBag = await collection.findOneAndUpdate(
  //   { _id: _id },
  //   { $set: { name, category, books } },
  //   { upsert: true, returnNewDocument: true }
  // )

  // PAUL
  console.dir('Save Bag upsertedBag', json(upsertedBag))
  // res.status(200).json({ _id: upsertedBag._id, name, category, books })
}

// PAUL
// handler.put(async (req, res) => {
//   const attrs = JSON.parse(req.body);

//   const bag = await Bag.findByIdAndUpdate(req.query._id, attrs, {
//     new: true,
//   }).exec();
//   res.status(202).json(bag);
// });
// PAUL

handler.put((req, res) => saveBag(req, res))
handler.patch((req, res) => saveBag(req, res))

handler.delete(async (req, res) => {
  const { _id, name, category, books } = JSON.parse(req.body)
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')

  await collection.deleteOne({ _id: ObjectId(_id) })

  res.status(200).json({})
})

export default handler
