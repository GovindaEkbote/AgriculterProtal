// import React from 'react'
// import './NewsLetter.css'

// const NewsLetter = () => {
//   return (
//     <div className='NewsLetter'>
//         <h1>Get Exclusive Offers On Your Email</h1>
//         <p>Subscribe to our newsletter and stay update</p>
//         <div>
//             <input type='email' placeholder='Your Email id'  />
//             <button>Subscribe</button>
//         </div>
//     </div>
//   )
// }

// export default NewsLetter


import React from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div className='NewsLetter'>
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <form action='https://formspree.io/f/xpzvpezl' method='POST'>
        <input type='email' name='email' placeholder='Your Email id' required />
        <button type='submit'>Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetter;

