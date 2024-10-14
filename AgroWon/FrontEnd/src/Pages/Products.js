import React, { useContext } from 'react';
import { ShopContext } from "../Context/ShopContext";
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/productDisplay'; 
import DescriptionBox from '../Components/DescriptionBox/descriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Products = () => {
    const { all_product }  = useContext(ShopContext);
    const { productId } = useParams();
    const Products = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            <Breadcrums Products={Products} />
            <ProductDisplay Products={Products} /> 
            <DescriptionBox />
            <RelatedProducts />
        </div> 
    );
};

export default Products;
