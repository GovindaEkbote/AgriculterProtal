// import React, { useContext, useState } from 'react';
// import './CSS/ShopCategories.css';
// import { ShopContext } from '../Context/ShopContext';
// import dropdown_icon from '../Components/Assets/dropdown_icon.png';
// import Item from '../Components/Item/Item';

// const ShopCategories = (props) => {
//   const { all_product } = useContext(ShopContext);
//   const [sortBy, setSortBy] = useState('Sort_by');

//   const sortingOptions = [
//     { value: 'Sort_by', label: ' Sort by' },
//     { value: 'price_low_to_high', label: 'Price Low to High' },
//     { value: 'price_high_to_low', label: 'Price High to Low' },
//     { value: 'name_asc', label: 'Name A-Z' },
//     { value: 'name_desc', label: 'Name Z-A' },
//     // Add more sorting options as needed
//   ];

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const filteredProducts = all_product.filter((item) => {
//     if (props.category === item.category) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   // Apply sorting if needed
//   let sortedProducts = [...filteredProducts];
//   if (sortBy === 'price_low_to_high') {
//     sortedProducts.sort((a, b) => a.new_price - b.new_price);
//   } else if (sortBy === 'price_high_to_low') {
//     sortedProducts.sort((a, b) => b.new_price - a.new_price);
//   } else if (sortBy === 'name_asc') {
//     sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
//   } else if (sortBy === 'name_desc') {
//     sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
//   }

//   return (
//     <div className='shop-category'>
//       <img className='shopcategory-banner' src={props.banner} alt='' />
//       <div className='shopcategories-indexsort'>
//         <p>
//           <span>Showing 1-{filteredProducts.length > 12 ? 12 : filteredProducts.length}</span> out of {filteredProducts.length} Products
//         </p>
//         <div className='shopcategory-sort'>
         
//           <select value={sortBy} onChange={handleSortChange}>
//             {sortingOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className='shopcategory-products'>
//         {sortedProducts.slice(0, 12).map((item, i) => (
//           <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
//         ))}
//       </div>
//       <div className='shopcategory-loadmore'>Explore More</div>
//     </div>
//   );
// };

// export default ShopCategories;


import React, { useContext, useState } from 'react';
import './CSS/ShopCategories.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategories = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(12);

  const sortingOptions = [
    // { value: 'price_low_to_high', label: 'price low to high' },
    { value: 'price_low_to_high', label: 'Price Low to High' },
    { value: 'price_high_to_low', label: 'Price High to Low' },
    { value: 'name_asc', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    // Add more sorting options as needed
  ];

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 12); 
  };

  const filteredProducts = all_product.filter((item) => {
    return props.category === item.category &&
           item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  let sortedProducts = [...filteredProducts];
  if (sortBy === 'price_low_to_high') {
    sortedProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortBy === 'price_high_to_low') {
    sortedProducts.sort((a, b) => b.new_price - a.new_price);
  } else if (sortBy === 'name_asc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name_desc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt='' />
      <div className='shopcategories-indexsort'>
        <p>
          <span>Showing 1-{Math.min(displayCount, filteredProducts.length)}</span> out of {filteredProducts.length} Products
        </p>

        <div className='search-bar'>
      {/* <label>Search by</label> */}
        <input type='text' placeholder='Search products...' value={searchQuery} onChange={handleSearchChange} />
      </div>
      

        <div className='shopcategory-sort'>
          Sort by
          <select value={sortBy} onChange={handleSortChange}>
            {sortingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

     
     

      <div className='shopcategory-products'>
        {sortedProducts.slice(0, displayCount).map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      
     
        <div className='shopcategory-loadmore'>
          Explore More
        </div>
    </div>
  );
};

export default ShopCategories;

