import express from "express";

const router = express.Router();

// GET /notes - Get all notes
router.get("/", (req, res) => {
  res.json({ message: "Get all notes" });
});

// POST /notes - Create a new note
router.post("/", (req, res) => {
  res.json({ message: "Create note" });
});

export default router;
