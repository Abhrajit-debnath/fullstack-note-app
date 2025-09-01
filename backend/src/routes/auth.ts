import express from "express";

const router = express.Router();

// POST /auth/login - User login
router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint" });
});

// POST /auth/register - User registration
router.post("/register", (req, res) => {
  res.json({ message: "Register endpoint" });
});

export default router;
