import React from 'react'
import './NavBar.css'
import navlogo from '../../assets/logo.png'


const NavBar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt='' className='nav-logo' />
        <h1>AgroWon</h1>
    </div>
  )
}

export default NavBar