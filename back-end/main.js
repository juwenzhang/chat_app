import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/libs/db.lib.js';
import AuthRouter from './src/routes/auth.route.js';
import MessageRouter from './src/routes/message.route.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

app.listen(port, () => {
  console.log(`Server is running on port 3000, access address is http://localhost:${port}`);
  connectDB();
});