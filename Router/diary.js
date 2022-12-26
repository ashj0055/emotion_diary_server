import express from "express";
import * as diaryRepository from "../data/diary.js";
const router = express.Router();

// GET /diary
router.get("/", async (req, res) => {
  const diary = await diaryRepository.getAll();
  res.status(200).json(diary);
});

// GET /diary/:id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  let diary = await diaryRepository.getById(id);
  diary = {
    id: diary._id,
    ...diary,
  };

  if (diary) {
    res.status(200).json(diary);
  } else {
    res.status(404).json({ message: `diary id ${id} not found` });
  }
});

// POST /diary
router.post("/", async (req, res) => {
  const { date, content, emotion } = req.body;
  const newDiary = await diaryRepository.createDiary(date, content, emotion);
  res.status(201).json(newDiary);
});

// PUT /diary/:id
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const { date, emotion, content } = req.body;
  const diary = await diaryRepository.update(id, date, emotion, content);

  if (diary) {
    res.status(200).json(diary);
  } else {
    res.status(404).json({ message: `diary id${id} not found` });
  }
});

// DELETE /diary/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  diaryRepository.remove(id);
  res.sendStatus(204);
});

export default router;
