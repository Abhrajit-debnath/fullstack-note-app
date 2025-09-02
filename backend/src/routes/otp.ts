import express from "express";
import nodemailer from "nodemailer";
import { db, admin } from "../config/firebase";
const Router = express.Router();

Router.post("/", async(req, res) => {
    const { email } = req.body;
    console.log("📧 OTP request for email:", email);
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    
  const otp = Math.floor(1000 + Math.random() * 9000); 
  const expiresAt = Date.now() + 5 * 60 * 1000;
  try {
    // 🔍 First check if user already exists in Firebase Auth
    try {
      const existingUser = await admin.auth().getUserByEmail(email);
      console.log("❌ User already exists:", existingUser.uid);
      return res.status(400).json({
        success: false,
        message: "User already exists. Please log in instead.",
      });
    } catch (err: any) {
      if (err.code !== "auth/user-not-found") {
        console.error("Error checking user existence:", err);
        return res.status(500).json({ success: false, message: err.message });
      }
      console.log("✅ User not found, proceeding with OTP generation");
    }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "abhrajitdebnath.cs@gmail.com", pass: process.env.App_Password
      },
    });

    await transporter.sendMail({
      from: '"HD Signup" abhrajitdebnath.cs@gmail.com',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

   
    await db.collection("otp-verification").doc(email).set({
      otp,
      expiresAt,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default Router
