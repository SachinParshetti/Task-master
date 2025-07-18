import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ConnectDB} from './config/db.js';

import UserRoutes from './controllers/UserController.js';
import TaskRoutes from './controllers/TaskController.js';

dotenv.config();
const app = express();

await ConnectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:"https://taskmanagersapp.netlify.app",
    credentials: true,
  })
);

app.use('/user', UserRoutes);
app.use('/task', TaskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
