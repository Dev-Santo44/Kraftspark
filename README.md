# 💎 Game Top-Up Store (React + Node.js + MongoDB)

This project is a full-stack web application that allows users to purchase top-up game credits (like Diamond Packs) and store their order data. Admins can log in to view user orders and manage products. The application is built with:

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: Firebase Authentication (Phone + Gmail login)

---

## 🔧 Features

- User authentication with Firebase
- Add/remove items to/from the cart
- Order placement (saved in MongoDB)
- Admin-only dashboard to view orders and add new products

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/game-topup-store.git
cd game-topup-store
```


📁 Project Structure
bashCopyEditroot/
├── client/        # React frontend
├── server/        # Express backend
└── README.md


🔑 Environment Variables
Create a .env file inside both the client and server folders.
📦 .env for /client
envCopyEditVITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


📝 These values come from your Firebase project settings.


🔐 .env for /server
envCopyEditPORT=5000
MONGO_URI=your_mongodb_connection_string


✅ Make sure to replace your_mongodb_connection_string with your MongoDB URI from MongoDB Atlas.


▶️ Run the Project
Open two terminals: one for the frontend and one for the backend.
1️⃣ Start the Backend
bashCopyEditcd server
npm install
npm start

2️⃣ Start the Frontend
bashCopyEditcd client
npm install
npm run dev

The frontend will start on: http://localhost:5173
The backend runs on: http://localhost:5000


