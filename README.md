# 🧠 Task Master App

A secure, full-stack Task Manager application built using the **MERN stack** with **JWT cookie-based authentication**. Users can register, log in, and manage their tasks in a sleek, responsive interface.

Deployed on:
- 🌐 **Frontend**: 
- 🔗 **Backend**: Render
- ☁️ **Database**: MongoDB Atlas

---

## 🌐 Live Demo

- 🔸 Frontend: [https://your-task-manager.netlify.app](https://your-task-manager.netlify.app)
- 🔸 API Base: [https://task-manager-api.onrender.com](https://task-manager-api.onrender.com)

---

## 📸 Screenshots

>![Login-page](login.png)
![Register-page](registration.png)
![User-Dashboard](user-dashboard.png)
![Add-Task](add-task.png)

---

## ⚙️ Tech Stack

### 🔹 Frontend (React + Vite)
- React
- Vite
- Axios
- Tailwind CSS / CSS
- JWT Cookie Handling
- SweetAlert2 for alerts
-MUI for Modal
-Toastify for notifications


### 🔹 Backend (Node.js + Express)
- Express.js
- MongoDB Atlas with Mongoose
- JWT (Token in HTTP-only cookie)
- CORS + Middleware

---

## 🔐 Authentication Flow (JWT with HTTP-only Cookies)

- Upon login, server returns a **JWT in an HTTP-only cookie**.
- On each authenticated request, browser automatically sends the cookie.
- Cookie is:
  - `httpOnly` (secure from JS access)
  - `secure` (sent only over HTTPS in production)
  - `sameSite=None` (for cross-origin)

#### 🛠 Sample Login Cookie Code:
```js
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000
});
🧹 Logout:
js
Copy
Edit
res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});
🧭 Features
✅ User Registration & Login

🛡 JWT Auth via HTTP-only cookies

🗂 Create, Read, Update, Delete tasks

📆 Task Timestamps

🌓 Task status toggle

📱 Fully responsive UI (Mobile & Desktop)

🔒 Protected Routes

🔧 Project Structure
arduino
Copy
Edit
task-master/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/Task.js, User.js
│   ├── controllers/TaskController.js, UserController.js
│   ├── middleware/authMiddleware.js
│   └── .env
│
├── src/
│   ├── component/
│   │   ├── dashboard.jsx
│   │   ├── home.jsx
│   │   ├── registration.jsx
│   │   └── addTaskModal.jsx
│   ├── App.jsx
│   └── App.css
│
├── vite.config.js
├── package.json (frontend)
└── README.md
🔧 Environment Variables
🗂 Backend .env
ini
Copy
Edit
PORT=10000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-very-secret-key
Set these in Render > Environment settings (do not push .env to GitHub).

🌐 Frontend .env.production
ini
Copy
Edit
VITE_API_URL=https://task-manager-api.onrender.com
Set this in Netlify > Environment variables before deploy.

🧠 CORS Configuration (in server.js)
js
Copy
Edit
import cors from 'cors';

app.use(cors({
  origin: ['http://localhost:5173', 'https://your-task-manager.netlify.app'],
  credentials: true
}));
🚀 Deployment Guide
🔸 Backend (Render)
Push code to GitHub

Create Web Service on Render

Set Root Directory: backend

Build Command: npm install

Start Command: node server.js

Add environment variables

🔸 Frontend (Netlify)
Push code to GitHub

Create new Site on Netlify

Build Command: npm run build

Publish Directory: dist

Add env var: VITE_API_URL=https://your-api-url

💡 Local Development
🛠 Install & Run Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
🛠 Install & Run Frontend
bash
Copy
Edit
npm install
npm run dev
📚 API Endpoints (Sample)
Method	Endpoint	Description
POST	/register	User Registration
POST	/login	User Login + Cookie
GET	/tasks	Get all tasks
POST	/tasks	Add a task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

🙋‍♂️ Author
Sachin Parashetti
📎 GitHub: @SachinParashetti
📎 LinkedIn: sachin-parashetti

📜 License
MIT License

📦 Improvements Coming Soon
🎨 Dark mode toggle

📂 Task filtering (completed/pending)

📲 PWA support (Add to home screen)

🔔 Toast notifications

