import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from 'react-router-dom';

{/* <Link to='/LoginPage'><span>login here</span></Link> */}

const Footer = () => {
  return (
    <div className='Footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt='' />
            <p>Agriculter Portal</p>
        </div>
        <ul className='footer-links'>
        <li><Link to='/company'>Company</Link></li>
        <li><Link to='/product'>Products</Link></li>
        <li><Link to='/offices'>Offices</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <img src={instagram_icon} alt='' />
            </div>
            <div className='footer-icons-container'>
                <img src={pintester_icon} alt='' />
            </div>
            <div className='footer-icons-container'>
                 <img src={whatsapp_icon} alt='' />
            </div>
        </div>
        <div className='footer-copyright'>
            <hr></hr>
            <p>copyright @2023 - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer