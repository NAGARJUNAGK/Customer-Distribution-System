Customer Distribution System

The Customer Distribution System is a MERN stack-based web application that allows users to manage agents and distribute uploaded customer lists among them evenly.
Each user’s data is isolated, supporting secure multi-user access with authentication.

🚀 Features
🔐 Authentication

Register and Login using JWT-based authentication.
User-specific data isolation (each user can manage their own agents and customers).

👥 Agent Management

Add and list agents created by the logged-in user.
Prevent duplicate agents for the same user.
Delete individual agents.

📂 Customer Upload & Distribution

Upload CSV files containing customer data.
Automatically distribute customers evenly among agents belonging to the logged-in user.
Prevent duplicate customers based on phone numbers (per user).
Option to delete all customers at once.

🧭 Navigation

Fixed Navbar (with app name on the left and Logout/Login on the right).
Fixed Footer with developer name “Nagarjuna GK”.

🏗️ Tech Stack

Frontend: React.js, React Router, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Token (JWT)
File Upload: Multer + csv-parser

⚙️ Setup Instructions
🔧 Prerequisites

Node.js (v16 or above)
MongoDB (local or cloud via MongoDB Atlas)
npm

🗂️ customer-distribution-system/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
│
└── README.md

🧩 Backend Setup

Navigate to the backend folder:
cd backend

Install dependencies:
npm install
Create a .env file inside backend/ with the following:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/customer-distribution
JWT_SECRET=your_jwt_secret

Start the server:
npm start

Server runs at http://localhost:5000

💻 Frontend Setup

Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the development server:
npm start

Frontend runs at http://localhost:3000

🧠 How It Works

User registers and logs in.
User adds agents.
User uploads a CSV file of customers (name, email, phone).
Backend distributes customers evenly among agents belonging to that user.
Users can view assigned customers, delete all customers, or remove individual agents.

📽️ Demo Video
🎥 Google Drive Link: [Add your demo video link here after uploading]

👨‍💻 Developer

Developed by: Nagarjuna GK
Role: Full Stack Developer (MERN Stack)