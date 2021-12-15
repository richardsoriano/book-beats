import dbPromise from '@/modules/mongodb'
import { ObjectId } from 'mongodb'
import connect from 'next-connect'

const handler = connect()

async function saveBag(req, res) {
  const { _id, name, category, books } = JSON.parse(req.body)
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')

  const dbRes = await collection.updateOne(
    { _id: ObjectId(_id) },
    { $set: { name, category, books } }
  )

  res.status(200).json({ _id, name, category, books })
}

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

/*
paul's Suggestion
The question that you asked in the main devmentor channel, I recall getting a similar error when I was first building this out because I wrote something similar to what you have written.

You will have more success by making the following changes:

- Don't use upsert, use put instead.
- Don't use updateOne, use findByIdAndUpdate instead

After clicking "Save" or whatever action you perform to trigger sending the PUT request to mongoDB, you might not see the changes reflected (rendered) right away. You might have to refresh the web browser first to see the new data display. If that ends up being the case let me know if you want and I can share how you can fix that.
Like you could do something like this:

import Bag from '@/models/bag';
import createHandler from '@/middleware';

const handler = createHandler();

handler.put(async (req, res) => {
  const attrs = JSON.parse(req.body);

  const bag = await Bag.findByIdAndUpdate(req.query._id, attrs, {
    new: true,
  }).exec();
  res.status(202).json(bag);
});

handler.delete(async (req, res) => {
  const bag = await Bag.delete({ _id: req.query._id }).exec();
  res.status(202).json({});
});

handler.get(async (req, res) => {
  const bags = await Bag.find({
    _id: req.query.id,
  }).exec();
  res.status(200).json(bags);
});

export default handler;
*/
