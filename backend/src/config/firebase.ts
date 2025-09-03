


import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let serviceAccount: admin.ServiceAccount;

// Check if local file exists
const localPath = path.resolve(__dirname, "serviceAccount.json");
if (fs.existsSync(localPath)) {
  serviceAccount = require(localPath);
} else {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Export both admin and Firestore DB
const db = admin.firestore();

export { admin, db }; // named exports

