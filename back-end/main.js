import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './src/libs/db.lib.js';
import AuthRouter from './src/routes/auth.route.js';
import MessageRouter from './src/routes/message.route.js';
import bodyParser from 'body-parser';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ 
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({ 
  limit: '50mb', 
  extended: true 
}));

const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

app.listen(port, () => {
  console.log(`Server is running on port 3000, access address is http://localhost:${port}`);
  connectDB();
});
