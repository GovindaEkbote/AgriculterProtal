import React from 'react'
import './Offers.css';
import exclucive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className="offer">
      <div className="offer-left">
        <h1>AgroWon</h1>
        <h2>OUR COMPANY ADDRESS :- </h2>
        <p>67 MIG SAGAR CHOWK VIDI GHARKUL SOLAPUR - 413005</p>
        <button>Our Location</button>
      </div>
      <div className="offer-right">
        <img src={exclucive_image} alt="" />
      </div>
    </div>
  );
}

export default Offers