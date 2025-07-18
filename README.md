# 🧠 Task Master App

A secure, full-stack Task Manager application built using the **MERN stack** with **JWT cookie-based authentication**. Users can register, log in, and manage their tasks in a sleek, responsive interface.

---

## 🌍 Deployed On

- 🌐 **Frontend**: [https://your-task-manager.netlify.app](https://your-task-manager.netlify.app)
- 🔗 **Backend**: [https://task-manager-api.onrender.com](https://task-manager-api.onrender.com)
- ☁️ **Database**: MongoDB Atlas

---

## 📸 Screenshots

> ![Login-page](login.png)  
> ![Register-page](registration.png)  
> ![User-Dashboard](user-dashboard.png)  
> ![Add-Task](add-task.png)

---

## ⚙️ Tech Stack

### 🔹 Frontend (React + Vite)

- React
- Vite
- Axios
- Tailwind CSS
- SweetAlert2 (Alerts)
- MUI (Modals)
- React-Toastify (Notifications)
- JWT Cookie Handling

### 🔹 Backend (Node.js + Express)

- Express.js
- MongoDB Atlas with Mongoose
- JWT (Stored in HTTP-only cookies)
- CORS + Middleware

---

## 🔐 Authentication Flow (JWT + HTTP-only Cookies)

- On login, the server returns a **JWT token** in an **HTTP-only cookie**.
- Browser sends the cookie with each authenticated request.
- Cookie properties:
  - `httpOnly`: Not accessible via JavaScript
  - `secure`: Only sent via HTTPS in production
  - `sameSite=none`: Allows cross-origin cookies

### 🔑 Sample Login & Logout Code

```js
// Login: Send JWT as cookie
res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
js
Copy
Edit
// Logout: Clear cookie
res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});
🧭 Features
✅ User Registration & Login
🛡 JWT Auth via HTTP-only Cookies
🗂 Task CRUD (Create, Read, Update, Delete)
📆 Task Timestamps
🔁 Toggle Task Completion
📱 Fully Responsive UI
🔒 Protected Routes

📁 Project Structure
arduino
Copy
Edit
task-master/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── TaskController.js
│   │   └── UserController.js
│   ├── middleware/authMiddleware.js
│   └── .env
│
├── src/
│   ├── component/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Registration.jsx
│   │   └── AddTaskModal.jsx
│   ├── App.jsx
│   └── App.css
│
├── vite.config.js
├── package.json (frontend)
└── README.md
🧪 Environment Variables
🔧 Backend .env
env
Copy
Edit
PORT=10000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-very-secret-key
Set these in Render → Environment → Environment Variables.

🔧 Frontend .env.production
env
Copy
Edit
VITE_API_URL=https://task-manager-api.onrender.com
Set this in Netlify → Site settings → Environment variables.

🌐 CORS Configuration (server.js)
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
Push backend to GitHub

Go to Render

Create → Web Service

Root Directory: backend

Build Command: npm install

Start Command: node server.js

Add Environment Variables from .env

🔸 Frontend (Netlify)
Push frontend to GitHub

Go to Netlify

Create New Site → From Git

Build Command: npm run build

Publish Directory: dist

Set VITE_API_URL environment variable

💻 Local Development
▶️ Run Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
▶️ Run Frontend
bash
Copy
Edit
npm install
npm run dev
📚 API Endpoints
Method	Endpoint	Description
POST	/register	User Registration
POST	/login	User Login + Cookie
GET	/tasks	Get all tasks
POST	/tasks	Add a task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

📦 Improvements Coming Soon
🎨 Dark Mode Toggle

📂 Task Filtering (Completed / Pending)

📲 PWA Support

🙋‍♂️ Author
📎 GitHub – @SachinParashetti
📎 LinkedIn – sachin-parashetti

📜 License
MIT License

yaml
Copy
Edit

---

If you'd like me to help update this directly in your GitHub repo (via a PR or upload), just let me know. This is ready for production and looks sharp on GitHub and Netlify project pages!







You said:
dont add env block


ChatGPT said:
Thanks, Sachin! Here's your cleaned-up and optimized README.md file (without the .env blocks), properly formatted and looking professional:

markdown
Copy
Edit
# 🧠 Task Master App

A secure, full-stack Task Manager application built using the **MERN stack** with **JWT cookie-based authentication**. Users can register, log in, and manage their tasks in a sleek, responsive interface.

**Deployed on:**
- 🌐 **Frontend**: Netlify  
- 🔗 **Backend**: Render  
- ☁️ **Database**: MongoDB Atlas

---

## 🌐 Live Demo

- 🔸 Frontend: [your-task-manager.netlify.app](https://your-task-manager.netlify.app)  
- 🔸 API Base: [task-manager-api.onrender.com](https://task-manager-api.onrender.com)


---

## 📸 Screenshots

![Login-page](login.png)  
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
- SweetAlert2 (alerts)
- MUI (Modal)
- Toastify (notifications)

### 🔹 Backend (Node.js + Express)
- Express.js
- MongoDB Atlas + Mongoose
- JWT (Token in HTTP-only cookie)
- CORS + Middleware

---

## 🔐 Authentication Flow (JWT + HTTP-only Cookies)

- On login, server returns a **JWT in an HTTP-only cookie**.
- Browser sends this cookie automatically with each authenticated request.
- Cookie attributes:
  - `httpOnly` – prevents access via JavaScript
  - `secure` – only sent over HTTPS
  - `sameSite=None` – required for cross-origin

### 🧹 Logout:
```js
res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None"
});
🧭 Features
✅ User Registration & Login
🛡 JWT Auth via HTTP-only cookies
🗂 Create, Read, Update, Delete tasks
📆 Task timestamps
🌓 Task status toggle
📱 Fully responsive UI
🔒 Protected Routes

🗂 Project Structure
arduino
Copy
Edit
task-master/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── TaskController.js
│   │   └── UserController.js
│   ├── middleware/authMiddleware.js
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Registration.jsx
│   │   └── AddTaskModal.jsx
│   ├── App.jsx
│   └── App.css
│
├── vite.config.js
├── package.json (frontend)
└── README.md
🚀 Deployment Guide
🔸 Backend (Render)
Push your backend folder to GitHub.

Create a Web Service on Render.

Set root directory to backend.

Build Command: npm install

Start Command: node server.js

Add environment variables in the Render dashboard.

🔸 Frontend (Netlify)
Push your frontend to GitHub.

Create a new site on Netlify.

Build Command: npm run build

Publish Directory: dist

Set environment variable: VITE_API_URL=https://task-manager-api.onrender.com

💡 Local Development
▶️ Run Backend:
bash
Copy
Edit
cd backend
npm install
npm run dev
▶️ Run Frontend:
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
POST	/tasks	Add a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task

📦 Coming Soon
🎨 Dark mode toggle
📂 Task filtering (completed/pending)
📲 PWA support

## 🙋‍♂️ Author  
**Sachin Parashetti**  
🧑‍💻 Passionate Full-Stack  Developer | MERN | REST API | JWT Auth  

- 📎 [GitHub – @SachinParashetti](https://github.com/SachinParashetti)  
- 📎 [LinkedIn – sachin-parashetti](https://www.linkedin.com/in/sachin-parashetti-99b255259/)


📜 License
MIT License