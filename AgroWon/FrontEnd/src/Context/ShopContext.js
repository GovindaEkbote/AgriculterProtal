import React, { createContext, useEffect, useState } from 'react';
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    all_product.forEach(product => {
        cart[product.id] = { quantity: 0, price: product.new_price };
    });
    return cart;
}


const ShopContextProvider = (props) => {
    const [all_product,setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data));
    },[])

    const addToCart = (itemID, newPrice) => {
        console.log(`Adding item ${itemID} to cart with price ${newPrice}`);
        setCartItems(prev => ({
          ...prev,
          [itemID]: {
            ...prev[itemID],
            quantity: prev[itemID].quantity + 1,
            price: newPrice
          }
        }));
        if (localStorage.getItem('auth-token')) {
          fetch('http://localhost:4000/addtocart', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemID: itemID }),
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
      };
      
    


    const removeFromCart = (itemID) => {
        setCartItems(prev => ({
            ...prev,
            [itemID]: {
                ...prev[itemID],
                quantity: prev[itemID].quantity - 1
            }
        }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ itemID: itemID }),
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error('Error:', error));
          }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            totalAmount += cartItems[item].quantity * cartItems[item].price;
        }
        return totalAmount;
    }

    const getTotalCartAmounts = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            totalItems += cartItems[item].quantity;
        }
        return totalItems;
    }

    const ContextValue = {
        getTotalCartAmounts,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart
    };

    return (
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
