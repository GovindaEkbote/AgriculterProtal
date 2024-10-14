import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

const login = async () => {
  console.log("Login Function Executed",formData);
  let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }else{
      alert(responseData.errors)
    }
}



  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className='LoginSignup'>
      <div className='LoginSignup-container'>
        <h1>Login</h1>
        <div className='LoginSignup-fields'>
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <button onClick={login}>
          Login
        </button>
        <div className='LoginSignup-agree'>
          <p>
            Don't have an account? <Link to='/login'><span>Sign Up</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
