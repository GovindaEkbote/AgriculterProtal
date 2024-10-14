import React, { useEffect, useState } from 'react';
import './listProducts.css';
import cross_icon from '../../assets/cart_cross_icon.png';

const ListProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_Product = async(id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Description</p>
        <p>Old Price</p>
        <p>Offer Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allProducts.map((product, index) => (
          <div key={index} className='listproduct-format-main listproduct-format'>
            <img src={product.image} className='listproduct-product-icon' alt='Product' />
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_Product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt='Remove' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
