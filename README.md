
# 📝 HD Notes App

Welcome to the HD Notes App — a fullstack note-taking application built with React, Node.js, and Firebase. Users can sign up using email + OTP or Google, create and delete notes, and enjoy a clean, mobile-friendly interface.

This project was built with love (and TypeScript) to be fast, secure, and easy to use.

---

## 🚀 Features

- 🔐 **Authentication** via Firebase (Email/OTP + Google Sign-In)
- 🧾 **Note Management** — create and delete personal notes
- 📱 **Responsive Design** using TailwindCSS
- 🧠 **Error Handling** with toast notifications
- 🔒 **JWT Authorization** for secure backend access
- ☁️ **Cloud Deployment** ready

---

## 🧰 Tech Stack

**Frontend**  
- React + TypeScript  
- Vite  
- TailwindCSS  
- Firebase Auth  
- React Hook Form  
- React Hot Toast  

**Backend**  
- Node.js + TypeScript  
- Express  
- Firebase Admin SDK  
- MongoDB (via Mongoose)  
- dotenv + cors  

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hd-notes-app.git
cd hd-notes-app
```

### 2. Set up Firebase

- Create a Firebase project
- Enable Email/Password and Google sign-in
- Add your Firebase config to the frontend (`.env` file)

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
...
```

- Add Firebase Admin credentials to the backend (`.env` file)

```env
GOOGLE_APPLICATION_CREDENTIALS=./firebase-adminsdk.json
MONGO_URI=your_mongodb_uri
PORT=5000
```

### 3. Install dependencies

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🧪 API Overview

| Endpoint        | Method | Description                  |
|----------------|--------|------------------------------|
| `/signup`       | POST   | Sign up with email/OTP       |
| `/login`        | POST   | Log in with email or Google  |
| `/notes`        | GET    | Fetch user notes             |
| `/notes`        | POST   | Create a new note            |
| `/notes/:id`    | DELETE | Delete a note                |

All protected routes require a valid Firebase JWT in the `Authorization` header.

---

---

## 🌐 Deployment

- **Frontend**: Vercel  
- **Backend**: Railway  
- **Database**: MongoDB Atlas  

Once deployed, share the live URL here.

---