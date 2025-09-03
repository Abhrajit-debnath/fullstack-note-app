// // // import express from "express";
// // // import { db, admin } from "../config/firebase";

// // // const Router = express.Router();

// // // Router.post("/", async (req, res) => {
// // //   const { email, otp, name, dob } = req.body;

// // //   if (!email || !otp) {
// // //     return res.status(400).json({ success: false, message: "Email and OTP required" });
// // //   }
// // //   try {
// // //     const docRef = db.collection("otp-verification").doc(email)
// // //     const doc = await docRef.get()
// // //     if (!doc.exists) {
// // //       return res.status(404).json({ success: false, message: "OTP not found" });
// // //     }
// // //     const data = doc.data()
// // //     if (!data) return res.status(500).json({ success: false, message: "Internal error" });
// // //     if (Date.now() > data.expiresAt) {
// // //       return res.status(400).json({ success: false, message: "OTP expired" });
// // //     }

// // //     if (Number(otp) !== data.otp) {

// // //       return res.status(400).json({ success: false, message: "Invalid OTP" });
// // //     }
// // //     else {
// // //       try {
// // //         let userRecord;
// // //         try {
// // //           // Try fetching the user by email
// // //           userRecord = await admin.auth().getUserByEmail(email);
// // //           console.log("✅ User already exists:", userRecord.uid);
// // //         } catch (err: any) {
// // //           console.log("ℹ️ User not found in Auth, creating new one...");
// // //           userRecord = await admin.auth().createUser({
// // //             email,
// // //             displayName: name,
// // //           });
// // //           console.log("✅ New user created in Auth:", userRecord.uid);
// // //         }

// // //         // Store additional user data in Firestore
// // //         console.log("ℹ️ Writing user profile to Firestore...");
// // //         await db.collection("users").doc(userRecord.uid).set({
// // //           email,
// // //           name,
// // //           dob,
// // //           createdAt: new Date(),
// // //         });
// // //         console.log("✅ User profile written to Firestore");

// // //         // Delete OTP doc
// // //         await docRef.delete();
// // //         console.log("✅ OTP deleted");

// // //         return res.json({ success: true, message: "OTP verified successfully", uid: userRecord.uid });
// // //       } catch (err: any) {
// // //         console.error("🔥 Firebase Auth/Firestore Error:", err.code, err.message);
// // //         return res.status(500).json({ success: false, message: err.message });
// // //       }

// // //     }




// // //   } catch (error) {
// // //     console.error(error);
// // //     return res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // })

// // // export default Router


// // import express from "express";
// // import { db, admin } from "../config/firebase";

// // const Router = express.Router();

// // Router.post("/", async (req, res) => {
// //   const { email, otp, name, dob } = req.body;

// //   if (!email || !otp) {
// //     return res
// //       .status(400)
// //       .json({ success: false, message: "Email and OTP required" });
// //   }

// //   try {
// //     const docRef = db.collection("otp-verification").doc(email);
// //     const doc = await docRef.get();
// //     if (!doc.exists) {
// //       return res.status(404).json({ success: false, message: "OTP not found" });
// //     }

// //     const data = doc.data();
// //     if (!data) return res.status(500).json({ success: false, message: "Internal error" });

// //     if (Date.now() > data.expiresAt) {
// //       return res.status(400).json({ success: false, message: "OTP expired" });
// //     }

// //     if (Number(otp) !== data.otp) {
// //       return res.status(400).json({ success: false, message: "Invalid OTP" });
// //     }

// //     // ✅ OTP is correct
// //     try {
// //       let userRecord;
// //       try {
// //         userRecord = await admin.auth().getUserByEmail(email);
// //         console.log("✅ User already exists:", userRecord.uid);
// //         return userRecord
// //       } catch (err: any) {
// //         console.log("ℹ️ User not found in Auth, creating new one...");
// //         userRecord = await admin.auth().createUser({
// //           email,
// //           displayName: name,
// //         });
// //         console.log("✅ New user created in Auth:", userRecord.uid);
// //       }

// //       // Save profile in Firestore
// //       await db.collection("users").doc(userRecord.uid).set(
// //         {
// //           email,
// //           name,
// //           dob,
// //           createdAt: new Date(),
// //         },
// //         { merge: true }
// //       );

// //       // Delete OTP doc
// //       await docRef.delete();

// //       // 🔥 Create a custom token for frontend login
// //       const token = await admin.auth().createCustomToken(userRecord.uid);
// //       console.log("✅ Custom token created for UID:", userRecord.uid);
// //       console.log("Token length:", token.length);

// //       return res.json({
// //         success: true,
// //         message: "OTP verified successfully",
// //         uid: userRecord.uid,
// //         token,
// //       });
// //     } catch (err: any) {
// //       console.error("🔥 Firebase Auth/Firestore Error:", err.code, err.message);
// //       return res.status(500).json({ success: false, message: err.message });
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // export default Router;
// import express from "express";
// import { db, admin } from "../config/firebase";

// const Router = express.Router();

// Router.post("/", async (req, res) => {
//   const { email, otp, name, dob, mode } = req.body;

//   if (!email || !otp || !mode) {
//     return res.status(400).json({ success: false, message: "Email, OTP, and mode are required" });
//   }

//   // For signup mode, name and dob are required
//   if (mode === "signup" && (!name || !dob)) {
//     return res.status(400).json({ success: false, message: "Name and date of birth are required for signup" });
//   }

//   try {
//     const docRef = db.collection("otp-verification").doc(email);
//     const doc = await docRef.get();

//     if (!doc.exists) {
//       return res.status(404).json({ success: false, message: "OTP not found" });
//     }

//     const data = doc.data();
//     if (!data) return res.status(500).json({ success: false, message: "Internal error" });

//     if (Date.now() > data.expiresAt) {
//       return res.status(400).json({ success: false, message: "OTP expired" });
//     }

//     if (Number(otp) !== data.otp) {
//       return res.status(400).json({ success: false, message: "Invalid OTP" });
//     }

//     // ✅ OTP is correct
//     try {
//       let userRecord;

//       try {
//         userRecord = await admin.auth().getUserByEmail(email);
//         console.log("✅ User already exists:", userRecord.uid);

//         if (mode === "signup") {
//           return res.status(400).json({ success: false, message: "User already exists. Please login." });
//         }

//       } catch (err: any) {
//         if (mode === "signin") {
//           return res.status(400).json({ success: false, message: "User not found. Please signup first." });
//         }

//         console.log("ℹ️ User not found in Auth, creating new one...");
//         userRecord = await admin.auth().createUser({
//           email,
//           displayName: name,
//         });
//         console.log("✅ New user created in Auth:", userRecord.uid);
//       }

//       // Save/update profile in Firestore
//       await db.collection("users").doc(userRecord.uid).set(
//         {
//           email,
//           name,
//           dob,
//           updatedAt: new Date(),
//         },
//         { merge: true }
//       );

//       // Delete OTP doc
//       await docRef.delete();

//       // Create custom token for frontend login
//       const token = await admin.auth().createCustomToken(userRecord.uid);
//       console.log("✅ Custom token created for UID:", userRecord.uid);

//       return res.json({
//         success: true,
//         message: "OTP verified successfully",
//         uid: userRecord.uid,
//         token,
//       });

//     } catch (err: any) {
//       console.error("🔥 Firebase Auth/Firestore Error:", err.code, err.message);
//       return res.status(500).json({ success: false, message: err.message });
//     }

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default Router;



import express from "express";
import { db, admin } from "../config/firebase";

const Router = express.Router();

type userdata = {
  email: string,
  name: string,
  dob: string,
  createdAt: Date,
  updatedAt: Date
}

Router.post("/", async (req, res) => {
  const { email, otp, name, dob, mode } = req.body;

  if (!email || !otp || !mode) {
    return res
      .status(400)
      .json({ success: false, message: "Email, OTP, and mode are required" });
  }

  // For signup mode, name and dob are required
  if (mode === "signup" && (!name || !dob)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name and date of birth are required for signup",
      });
  }

  try {
    const docRef = db.collection("otp-verification").doc(email);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ success: false, message: "OTP not found" });
    }

    const data = doc.data();
    if (!data)
      return res
        .status(500)
        .json({ success: false, message: "Internal error" });

    if (Date.now() > data.expiresAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    if (Number(otp) !== data.otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ OTP is correct
    try {
      let userRecord: any;

      if (mode === "signin") {
        // For signin, user must already exist
        try {
          userRecord = await admin.auth().getUserByEmail(email);
          console.log("✅ User found for signin:", userRecord.uid);
        } catch (err: any) {
          return res
            .status(400)
            .json({
              success: false,
              message: "User not found. Please signup first.",
            });
        }
      } else if (mode === "signup") {
        // For signup, check if user already exists
        try {
          userRecord = await admin.auth().getUserByEmail(email);
          console.log("✅ User already exists:", userRecord.uid);
          return res
            .status(400)
            .json({
              success: false,
              message: "User already exists. Please login.",
            });
        } catch (err: any) {
          // User doesn't exist, create new one
          console.log("ℹ️ User not found in Auth, creating new one...");
          userRecord = await admin.auth().createUser({
            email,
            displayName: name,
          });
          console.log("✅ New user created in Auth:", userRecord.uid);
        }
      }

      // Save profile only for signup
      if (mode === "signup") {
        const userData: userdata = {
          email,
          dob,
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Only add name and dob if they exist
        if (name) userData.name = name;
        if (dob) userData.dob = dob;

        await db.collection("users").doc(userRecord.uid).set(userData, { merge: true });
      }

      // Delete OTP doc after use
      await docRef.delete();

      // Create custom token for frontend login
      const token = await admin.auth().createCustomToken(userRecord.uid);
      console.log("✅ Custom token created for UID:", userRecord.uid);

      let profile = null;
      if (mode === "signin") {
        // Fetch Firestore profile for frontend use
        const userDoc = await db.collection("users").doc(userRecord.uid).get();
        profile = userDoc.exists ? userDoc.data() : null;
      }

      return res.json({
        success: true,
        message: "OTP verified successfully",
        uid: userRecord.uid,
        token,
        profile,
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
