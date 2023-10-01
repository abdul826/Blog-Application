import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const successMsg = (msg)=>{
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  } 

  const errorMsg = (msg)=>{
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  } 

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  // const [err, setError] = useState(null);

  const handleChange = (e)=>{
    setInputs((prev)=> ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  };

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      login(inputs);
      successMsg("User Login Successfully");
      navigate("/")
    } catch (err) {
      errorMsg(err.response.data);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="User Name"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {/* {err && <p>{err}</p>} */}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}


export default Login