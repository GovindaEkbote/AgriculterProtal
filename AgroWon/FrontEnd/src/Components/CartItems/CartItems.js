import React, { useContext, useState } from "react";
import "./cartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { loadStripe } from "@stripe/stripe-js/pure";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
    email: "", // Add email here
  });

  // Calculate total cart amount
  const totalCartAmount = getTotalCartAmount();

  // Handle customer detail changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Payment Integration
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OkQrsSEom12v3h9DoH7lzd82v3GoKQQ6ETdFvQl1gb5ot3dBRCdVuqRLyD8wBKke80HH1h4SknFeHUz2Mby23EK0024uvQxMZ"
    );

    // Prepare the cart data for backend
    const cartProducts = all_product
      .filter(
        (product) => cartItems[product.id] && cartItems[product.id].quantity > 0
      )
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.new_price,
        quantity: cartItems[product.id].quantity,
      }));

    const body = {
      products: cartProducts,
      customerDetails: customerDetails, // Send customer details to backend
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("http://localhost:4000/payment", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error with payment gateway. Please try again later.");
    }
  };

  
  return (
    <div className="cartItems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product &&
        all_product.map((product) => {
          const { id, image, name, new_price } = product;
          const quantity = cartItems[id] ? cartItems[id].quantity : 0;
          const totalPrice = new_price * quantity;

          if (quantity > 0) {
            return (
              <div key={id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={image} alt="" className="carticon-product-icon" />
                  <p>{name}</p>
                  <p>₹{new_price}</p>
                  <button className="cartitems-quantity">{quantity}</button>
                  <p>₹{totalPrice}</p>
                  <img
                    className="cartitems-remove-icon"
                    src={remove_icon}
                    onClick={() => removeFromCart(id)}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>₹{totalCartAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>₹{totalCartAmount}</h3>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="customer-details">
            <h3>Customer Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={customerDetails.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="email" // New field for email
              placeholder="Email Address"
              value={customerDetails.email} // Ensure you're capturing this in state
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={customerDetails.mobile}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customerDetails.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={customerDetails.pincode}
              onChange={handleInputChange}
              required
            />
            <p>Select Payment Method</p>
              <input type="radio" id="cod" name="payment" value="COD" /> {" "}
            <label for="html">COD</label>
              <input
              type="radio"
              id="online"
              name="payment"
              value="Online"
            />  <label for="css">Online</label>
          </div>

          <button
            className="btn btn-success"
            type="button"
            onClick={makePayment}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
