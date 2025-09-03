import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";

dotenv.config();
const app = express();
app.use(cors({
    origin: "https://fullstack-note-app-95h3.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Routes
import authRoutes from "./routes/auth";
import noteRoutes from "./routes/notes";
import otpRoutes from "./routes/otp"
import verifyOtpRoutes from "./routes/verifyotp";
app.use("/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/send-otp",otpRoutes)
app.use("/api/verify-otp",verifyOtpRoutes)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
