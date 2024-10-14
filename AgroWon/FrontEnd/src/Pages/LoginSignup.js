import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const signup = async () => {
    console.log("Sing Up Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='LoginSignup'>
      <div className='LoginSignup-container'>
        <h1>Sign Up</h1>
        <div className='LoginSignup-fields'>
          <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Username' />
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type='password' placeholder='Password' />
        </div>
        <p className='LoginSignup-login'>
          Already have an account? <Link to='/LoginPage'><span>login here</span></Link>
        </p>
        <div className='LoginSignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continue, I agree to the terms of use & privacy policy. </p>
        </div>
        <button onClick={signup}>
          Continue
        </button>
      </div>
    </div>
  )
}

export default LoginSignup
