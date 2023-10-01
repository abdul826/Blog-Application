import express from 'express';
import { db } from './db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./route/auth.js";
import usersRoutes from "./route/users.js";
import postRoutes from "./route/posts.js";
import multer from "multer";
const app = express();

const port  = 8000;

app.use(cookieParser());

app.use(express.json());

app.use(cors());

// Upload Image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, ()=> {
    console.log(`Running on port ${port}`);
})