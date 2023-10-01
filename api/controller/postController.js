import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Fetch All Post
export const getPosts = async(req,res)=>{
    const q = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
}

// Fetch Single Post
export const getPost = async(req,res)=>{
    const q = 'Select `username`, `title`, `descripton`, p.img, u.img AS userImg, `category`,`date`,p.id FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?'; 
    
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
}

// Add Post
export const addPost = async(req,res)=>{
    console.log(req.body.category);
    console.log(req.body.descripton);
    const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `descripton`, `img`, `category`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.descripton,
      req.body.img,
      req.body.category,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
}

// Delete Post
export const deletePost = async(req,res)=>{
    const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
}


// Update Post
export const updatePost = async(req,res)=>{
    const token = req.cookies.access_token;
    console.log(req.body.category);
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`descripton`=?,`img`=?,`category`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.descripton, req.body.img, req.body.category];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
}