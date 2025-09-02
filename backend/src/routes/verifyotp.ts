// import express from "express";
// import { db, admin } from "../config/firebase";

// const Router = express.Router();

// Router.post("/", async (req, res) => {
//   const { email, otp, name, dob } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ success: false, message: "Email and OTP required" });
//   }
//   try {
//     const docRef = db.collection("otp-verification").doc(email)
//     const doc = await docRef.get()
//     if (!doc.exists) {
//       return res.status(404).json({ success: false, message: "OTP not found" });
//     }
//     const data = doc.data()
//     if (!data) return res.status(500).json({ success: false, message: "Internal error" });
//     if (Date.now() > data.expiresAt) {
//       return res.status(400).json({ success: false, message: "OTP expired" });
//     }

//     if (Number(otp) !== data.otp) {
    
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }
//     else {
//       try {
//         let userRecord;
//         try {
//           // Try fetching the user by email
//           userRecord = await admin.auth().getUserByEmail(email);
//           console.log("✅ User already exists:", userRecord.uid);
//         } catch (err: any) {
//           console.log("ℹ️ User not found in Auth, creating new one...");
//           userRecord = await admin.auth().createUser({
//             email,
//             displayName: name,
//           });
//           console.log("✅ New user created in Auth:", userRecord.uid);
//         }
      
//         // Store additional user data in Firestore
//         console.log("ℹ️ Writing user profile to Firestore...");
//         await db.collection("users").doc(userRecord.uid).set({
//           email,
//           name,
//           dob,
//           createdAt: new Date(),
//         });
//         console.log("✅ User profile written to Firestore");
      
//         // Delete OTP doc
//         await docRef.delete();
//         console.log("✅ OTP deleted");
      
//         return res.json({ success: true, message: "OTP verified successfully", uid: userRecord.uid });
//       } catch (err: any) {
//         console.error("🔥 Firebase Auth/Firestore Error:", err.code, err.message);
//         return res.status(500).json({ success: false, message: err.message });
//       }
      
//     }
    



//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// })

// export default Router


import express from "express";
import { db, admin } from "../config/firebase";

const Router = express.Router();

Router.post("/", async (req, res) => {
  const { email, otp, name, dob } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP required" });
  }

  try {
    const docRef = db.collection("otp-verification").doc(email);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "OTP not found" });
    }

    const data = doc.data();
    if (!data) return res.status(500).json({ success: false, message: "Internal error" });

    if (Date.now() > data.expiresAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (Number(otp) !== data.otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ OTP is correct
    try {
      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(email);
        console.log("✅ User already exists:", userRecord.uid);
        return userRecord
      } catch (err: any) {
        console.log("ℹ️ User not found in Auth, creating new one...");
        userRecord = await admin.auth().createUser({
          email,
          displayName: name,
        });
        console.log("✅ New user created in Auth:", userRecord.uid);
      }

      // Save profile in Firestore
      await db.collection("users").doc(userRecord.uid).set(
        {
          email,
          name,
          dob,
          createdAt: new Date(),
        },
        { merge: true }
      );

      // Delete OTP doc
      await docRef.delete();

      // 🔥 Create a custom token for frontend login
      const token = await admin.auth().createCustomToken(userRecord.uid);
      console.log("✅ Custom token created for UID:", userRecord.uid);
      console.log("Token length:", token.length);

      return res.json({
        success: true,
        message: "OTP verified successfully",
        uid: userRecord.uid,
        token,
      });
    } catch (err: any) {
      console.error("🔥 Firebase Auth/Firestore Error:", err.code, err.message);
      return res.status(500).json({ success: false, message: err.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default Router;
