import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div>
      <h2 className='contactpage'>Contact Page</h2>
      <div className='map'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.6020804400573!2d73.73643844011495!3d18.591970067061176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbddacb3f4ef%3A0x38f9fdd2ec3b10dc!2sShivaji%20Chowk%20Hinjawadi!5e0!3m2!1sen!2sin!4v1707415571156!5m2!1sen!2sin"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

{/*  https://formspree.io/forms/xpzvpezl/integration */}

        <div className='LoginSignup'>
          <div className='LoginSignup-container'>
            <form action='https://formspree.io/f/xpzvpezl' method='POST'>
              <div className='LoginSignup-fields'>
                <input type='text' placeholder='Username' name='username' required />
                <input type='email' placeholder='Email' name='email' autoComplete='off' required />
                <textarea name='message' cols='22' rows='10' placeholder='Enter Your message' required></textarea>
              </div>
              <p className='LoginSignup-login'>
                <div className='submit'>
                  <input style={{ background: 'red', cursor: 'pointer' }} type='submit' value='Send' />
                </div>
              </p>
            </form>
          </div>
        </div>
      </div>
    
  );
};

export default Contact;
