import { getDiary, getIdCount } from "../DB/db.js";

export function getAll() {
  return getDiary() //
    .find()
    .sort({ date: -1, _id: -1 })
    .toArray();
}

export function getById(id) {
  return getDiary().findOne({ _id: parseInt(id) });
}

export async function createDiary(date, content, emotion) {
  const idCollection = await getIdCount().findOne({ name: "id" });
  let id = idCollection.idCount;

  const newDiary = {
    _id: id + 1,
    date,
    content,
    emotion,
  };

  getDiary().insertOne(newDiary, (err, res) => {
    getIdCount().updateOne({ name: "id" }, { $inc: { idCount: 1 } });
  });

  return newDiary;
}

export function update(id, date, emotion, content) {
  return getDiary() //
    .findOneAndUpdate(
      { _id: parseInt(id) },
      { $set: { date, emotion, content } },
      { returnDocument: "after" }
    )
    .then((result) => result.value);
}

export function remove(id) {
  return getDiary().deleteOne({ _id: parseInt(id) });
}
