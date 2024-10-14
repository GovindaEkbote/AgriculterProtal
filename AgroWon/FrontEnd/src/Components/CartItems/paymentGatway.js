import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './PaymentGateway.css'; // Import CSS file

const PaymentGateway = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const totalCartAmount = getTotalCartAmount();

  return (
    <div className="payment-container">
      <h3>Payment Details</h3>
      <form className="payment-form" action='https://formspree.io/f/xpzvpezl' method='POST'>
        <input type="text" className="input-field" name='fullname' placeholder="Full Name" required />
        <input type="text" className="input-field" name='mobile number' placeholder="Mobile Number" required/>
        <input type="text" className="input-field" name='address' placeholder="Address" required />
        <input type="text" className="input-field" name='pincode' placeholder="Pincode" required />Total Amount
        <input type="text" name='totalcartamount' value={`₹${totalCartAmount}`} readOnly required />
        
        <div className="checkbox-container">
          <input type="checkbox" className="checkbox" id="cashOnDelivery"  required/>
          <label htmlFor="cashOnDelivery">Cash on Delivery</label>
        </div>
        <button className="submit-button" type='submit' value='Send'>Proceed to Pay</button>
      </form>
    </div>
  );
}

export default PaymentGateway;

