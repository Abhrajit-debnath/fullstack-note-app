import express from "express";
import Note from "../models/Note";
const router = express.Router();

// GET /notes - Get all notes
router.get("/", async(req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ success: false, message: "User ID required" });
  }

  try {
    const notes = await Note.find({uid})
    res.json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Failed to fetch notes" });
  }
});

// POST /notes - Create a new note
router.post("/", async(req, res) => {
  const { uid, content } = req.body;
  if (!uid || !content) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
try {
  const note = new Note({content,uid})
  await note.save()
  res.json({ success: true, note });
} catch (error) {
  console.log(error);
  
}

});

export default router;
