import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_img from '../Assets/hero_image.png'

//  Change Images Here..
const Hero = () => {
    return (
        <div className="hero">
          <div className="hero-left">
            <h2>Who we are.</h2>
            <div>
                <p>AgroWon is the only global fertilizer association and has a membership of around 500 entities in some 80 countries, encompassing all actors in the fertilizer value chain.</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                Explore More  
                     <img src={arrow_icon} alt="" />
                </div>
            </div>
          </div>
          <div className="hero-right">
            <img src={hero_img} alt=""/>
          </div>
        </div>
      );
}

export default Hero