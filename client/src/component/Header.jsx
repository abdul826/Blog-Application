import { Link } from 'react-router-dom'
import React, { useContext } from 'react';
import blog from '../img/bog.gif';
import { AuthContext } from '../context/authContext'

const Header = () => {

  const {currentUser, logout} = useContext(AuthContext);
  const imagestyle = {
    width:"50px",
    height:"50px",
    borderRadius:"100%"
  };

  return (
     <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={blog} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : ( 
            <>
              <Link className="link" to="/login">
              Login
            </Link>
            <Link className="link" to="/Registre">
            Register
          </Link>
            </>
           )} 
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          <span >
          <img style={imagestyle} src={`../upload/${currentUser.img}`} alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Header