import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// --- FIX 1: Proper CORS config ---
const allowedOrigins = [
  "https://fullstack-note-app-olive.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);


app.options("*", cors());

// JSON parser
app.use(express.json());

// DB Connection
connectDB();

// Routes
import noteRoutes from "./routes/notes.js";
import otpRoutes from "./routes/otp.js";
import verifyOtpRoutes from "./routes/verifyotp.js";

app.use("/api/notes", noteRoutes);
app.use("/api/send-otp", otpRoutes);
app.use("/api/verify-otp", verifyOtpRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
