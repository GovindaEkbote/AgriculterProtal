import React from 'react'
import './Breadcrums.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrums = (props) => {
    const {Products} = props;
  return (
    <div className='breadcrum'>
        HOME <img src={arrow_icon} alt='' />
        SHOP <img src={arrow_icon} alt=''/> {Products.category} 
        <img src={arrow_icon} alt=''/>{Products.name};
    </div>
  )
}

export default Breadcrums