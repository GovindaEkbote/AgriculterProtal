// import React, { useContext, useState } from 'react';
import "./productDisplay.css";
import star_icon from "../Assets/star_icon.png";
import { ShopContext } from "../../Context/ShopContext";
// import DescriptionBox from "../DescriptionBox/descriptionBox.js"; // Adjusted path

import React, { useContext, useState } from "react";
import "./productDisplay.css";


const ProductDisplay = (props) => {
  const { Products } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedWeight, setSelectedWeight] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const calculateNewPrice = () => {
    const totalPrice = Products.new_price * selectedWeight;
    return totalPrice;
  };

  const handleAddToCart = () => {
    addToCart(Products.id, calculateNewPrice());
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={Products.image} alt="" />
          <img src={Products.image} alt="" />
          <img src={Products.image} alt="" />
          <img src={Products.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={Products.image}
            alt=""
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{Products.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-prices-old">
            ₹{Products.old_price}
          </div>
          <div className="productdisplay-right-prices-new">
            ₹{calculateNewPrice()}
          </div>
        </div>
        <div className="productdisplay-right-description">
          {Products.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div onClick={() => setSelectedWeight(1)}>1 Kg</div>
            <div onClick={() => setSelectedWeight(5)}>5 Kg</div>
            <div onClick={() => setSelectedWeight(10)}>10 Kg</div>
            <div onClick={() => setSelectedWeight(15)}>15 Kg</div>
            <div onClick={() => setSelectedWeight(20)}>20 Kg</div>
          </div>
        </div>
        <button onClick={handleAddToCart}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category:</span> {Products.category}
        </p>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Item added to cart successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
