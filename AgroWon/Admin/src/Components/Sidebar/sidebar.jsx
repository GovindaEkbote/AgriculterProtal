import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/add-product.png'
import list_product_icon from '../../assets/list_product_icon.png'

const sidebar = () => {
  return (
    <div className='sideBar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={add_product_icon} />
                <p>Add Products</p>
            </div>
        </Link>
        <Link to={'/listProducts'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={list_product_icon} />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default sidebar