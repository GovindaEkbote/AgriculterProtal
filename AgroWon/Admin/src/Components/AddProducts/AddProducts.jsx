// import React, { useState } from 'react';
// import './addproduct.css';
// import upload_area from '../../assets/file.png';

// const AddProducts = () => {
//     const [image, setImage] = useState(null);
//     const [productDetails, setProductDetails] = useState({
//         name: "",
//         description: "",
//         image: "",
//         category: "Fertilizer",
//         new_price: "",
//         old_price: ""
//     });

// //     const imageHandler = (e) => {
// //         setImage(e.target.files[0]);
// //     };

//     const changeHandler = (e) => {
//         setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//     };

//     const imageHandler = (e) => {
//      setImage(e.target.files[0]); 
//  };
 
//  const AddProduct = async () => {
//      console.log(productDetails); // Log the product details
//      const formData = new FormData(); // Create FormData object
//      formData.append('product', image); // Append the image file to FormData
 
//      try {
//          // Upload the image
//          const response = await fetch('http://localhost:4000/upload', {
//              method: 'POST',
//              headers: {
//                  Accept: 'application/json',
//              },
//              body: formData,
//          });
 
//          if (response.ok) {
//              // Image uploaded successfully
//              const responseData = await response.json();
//              console.log(responseData);
             
//              // Add the product details
//              const productResponse = await fetch("http://localhost:4000/addproduct", {
//                  method: 'POST',
//                  headers: {
//                      Accept: 'application/json',
//                      'Content-Type': 'application/json' // Corrected 'content-Type' to 'Content-Type'
//                  },
//                  body: JSON.stringify(productDetails),
//              });
 
//              if (productResponse.ok) {
//                  // Product added successfully
//                  const productData = await productResponse.json();
//                  console.log(productData);
//                  alert("Product Added");
//              } else {
//                  // Failed to add product
//                  console.error('Failed to add product');
//                  alert("Failed to add product");
//              }
//          } else {
//              // Failed to upload image
//              console.error('Failed to upload image');
//              alert("Failed to upload image");
//          }
//      } catch (error) {
//          // Error uploading image or adding product
//          console.error('Error:', error);
//          alert("Error:", error);
//      }
//  };
 

 
//     return (
//         <div className='add-product'>
//             <div className='addproduct-itemfield'>
//                 <p>Product Title</p>
//                 <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type' />
//             </div>
//             <div className='addproduct-itemfield'>
//                 <p>Product Description</p>
//                 <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Description' />
//             </div>

//             <div className='addproduct-price'>
//                 <div className='addproduct-itemfield'>
//                     <p>Product Price</p>
//                     <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Old Price' />
//                 </div>
//                 <div className='addproduct-itemfield'>
//                     <p>Offer Price</p>
//                     <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='New Price' />
//                 </div>
//             </div>
//             <div className='addproduct-itemfield'>
//                 <p>Product Category</p>
//                 <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selectors'>
//                     <option value="Fertilizer">Fertilizer</option>
//                     <option value="Vegetables">Vegetables</option>
//                     <option value="Fruits">Fruits</option>
//                 </select>
//             </div>
//             <div className='addproduct-itemfield'>
//                 <label htmlFor='file-input'>
//                     <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-image' alt="Upload" />
//                 </label>
//                 <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
//             </div>
//             <button onClick={AddProduct} className='addproduct-btn'>ADD</button>
//         </div>
//     );
// };

// export default AddProducts;

import React, { useState } from 'react';
import './addproduct.css';
import upload_area from '../../assets/file.png';

const AddProducts = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        category: "Fatilizer",
        new_price: "",
        old_price: "",
        image: ""
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const imageHandler = (e) => {
        setImage(e.target.files[0]); // Set the image file
    };
 
    const AddProduct = async () => {
        const formData = new FormData();
        formData.append('product', image); // Append the image file to FormData

        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);

                // Update productDetails to exclude image property
                const { image, ...productData } = productDetails;
                productData.image = responseData.image_url;

                const productResponse = await fetch("http://localhost:4000/addproduct", {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData),
                });

                if (productResponse.ok) {
                    console.log("Product added successfully");
                    alert("Product Added");
                } else {
                    console.error('Failed to add product');
                    alert("Failed to add product");
                }
            } else {
                console.error('Failed to upload image');
                alert("Failed to upload image");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error:", error);
        }
    };
 
    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type' />
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Description</p>
                <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Description' />
            </div>

            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Product Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Old Price' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='New Price' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selectors'>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-image' alt="Upload" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={AddProduct} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProducts;

