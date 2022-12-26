import express from "express";
import cors from "cors";
import diaryRouter from "./Router/diary.js";
import { connectDB } from "./DB/db.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/diary", diaryRouter);
app.use((req, res) => {
  res.sendStatus(404);
});

app.use((error, req, res) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(console.error);
