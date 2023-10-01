import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../component/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from '../context/authContext.js';

const Single = () => {
  const {currentUser} = useContext(AuthContext);
  const [post, setPost] = useState([]);

  const location = useLocation();
  const postId =  location.pathname.split("/")[2];
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // Delete Post
  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
    <div className="content">
      <img src={`../upload/${post.img}`} alt="" />
      <div className="user">
        {post.userImg && <img
          src={post.userImg}
          alt=""
        />}
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username && (
          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
         )} 
      </div>
      <h1>{post.title}</h1>
      <p
        // dangerouslySetInnerHTML={{
        //   __html: DOMPurify.sanitize(post.desc),
        // }}
      > {getText(post.descripton)}</p>      </div>
    <Menu cat={post.category}/>
  </div>
  )
}

export default Single