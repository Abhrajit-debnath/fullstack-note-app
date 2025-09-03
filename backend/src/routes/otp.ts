import express from "express";
import nodemailer from "nodemailer";
import { db, admin } from "../config/firebase";
import router from "./auth";
const Router = express.Router();
Router.post("/", async (req, res) => {
  const { email, mode } = req.body;
  if (!email || !mode)
    return res.status(400).json({ success: false, message: "Email and mode are required" });

  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  try {
    let userExists = false;
    try {
      await admin.auth().getUserByEmail(email);
      userExists = true;
    } catch (err: any) {
      if (err.code !== "auth/user-not-found") throw err;
    }

    // Signup validation
    if (mode === "signup" && userExists)
      return res.status(400).json({ success: false, message: "User already exists. Please log in." });

    // Signin validation
    if (mode === "signin" && !userExists)
      return res.status(400).json({ success: false, message: "User not found. Please sign up first." });

    // Send OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "abhrajitdebnath.cs@gmail.com", pass: process.env.App_Password },
    });

    await transporter.sendMail({
      from: '"HD OTP" <abhrajitdebnath.cs@gmail.com>',
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}`,
    });

    await db.collection("otp-verification").doc(email).set({ otp, expiresAt });

    return res.json({ success: true, message: `OTP sent for ${mode}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
export default Router
// Router.post("/", async(req, res) => {
//     const { email,mode } = req.body;
//     console.log("📧 OTP request for email:", email);
    
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }
    
//   const otp = Math.floor(1000 + Math.random() * 9000); 
//   const expiresAt = Date.now() + 5 * 60 * 1000;

//   if (mode == "signup") {
//     try {
//       try {
//         const existingUser = await admin.auth().getUserByEmail(email);
//         console.log("❌ User already exists:", existingUser.uid);
//         return res.status(400).json({
//           success: false,
//           message: "User already exists. Please log in instead.",
//         });
//       } catch (err: any) {
//         if (err.code !== "auth/user-not-found") {
//           console.error("Error checking user existence:", err);
//           return res.status(500).json({ success: false, message: err.message });
//         }
//         console.log("✅ User not found, proceeding with OTP generation");
//       }
//     try {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: { user: "abhrajitdebnath.cs@gmail.com", pass: process.env.App_Password
//         },
//       });
  
//       await transporter.sendMail({
//         from: '"HD Signup" abhrajitdebnath.cs@gmail.com',
//         to: email,
//         subject: "Your OTP Code",
//         text: `Your OTP is: ${otp}`,
//       });
  
     
//       await db.collection("otp-verification").doc(email).set({
//         otp,
//         expiresAt,
//       });
  
//       res.json({ success: true });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false });
//     }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }else{
//     try {
//       try {
//         const existingUser = await admin.auth().getUserByEmail(email);
//         console.log("❌ User already exists:", existingUser.uid);
//         if (existingUser) {
//           try {
//             const transporter = nodemailer.createTransport({
//               service: "gmail",
//               auth: { user: "abhrajitdebnath.cs@gmail.com", pass: process.env.App_Password
//               },
//             });
        
//             await transporter.sendMail({
//               from: '"HD Signup" abhrajitdebnath.cs@gmail.com',
//               to: email,
//               subject: "Your OTP Code",
//               text: `Your OTP is: ${otp}`,
//             });
        
           
//             await db.collection("otp-verification").doc(email).set({
//               otp,
//               expiresAt,
//             });
        
//             res.json({ success: true });
//           } catch (err) {
//             console.error(err);
//             res.status(500).json({ success: false });
//           }
//         }else{
//           return res.status(400).json({
//             success: false,
//             message: "User doesn't exists. Please signup first.",
//           });
//         }
       
//       } catch (err: any) {
//         if (err.code !== "auth/user-not-found") {
//           console.error("Error checking user existence:", err);
//           return res.status(500).json({ success: false, message: err.message });
//         }
//         console.log("✅ User not found, proceeding with OTP generation");
//       }
   
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }

// });
// export default Router
