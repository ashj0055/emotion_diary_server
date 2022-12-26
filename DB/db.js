import MongoDb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(process.env.DB_HOST) //
    .then((client) => {
      db = client.db("EmotionDiary");
    });
}

export function getDiary() {
  return db.collection("Diary");
}

export function getIdCount() {
  return db.collection("idCount");
}
