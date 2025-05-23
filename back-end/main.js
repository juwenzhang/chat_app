import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './src/libs/db.lib.js';
import AuthRouter from './src/routes/auth.route.js';
import MessageRouter from './src/routes/message.route.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization",
  optionsSuccessStatus: 200,
  preflightContinue: false,
}))

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

app.listen(port, () => {
  console.log(`Server is running on port 3000, access address is http://localhost:${port}`);
  connectDB();
});