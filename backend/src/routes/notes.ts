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


router.delete("/:id",async(req,res)=>{
  const {id} = req.params
  if (!id) {
    return res.status(400).json({ success: false, message: "Note id required" });
  }

  try {
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    return res.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ success: false, message: "Failed to delete note" });
  }
  
})

export default router;
