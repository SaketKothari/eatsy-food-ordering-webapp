import { useState } from 'react';

const Contact = () => {
  const [btnName, setBtnName] = useState('Login');

  return (
    <div>
      <h1>Contact Us Page</h1>
      <button
        onClick={() =>
          btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login')
        }
      >
        {btnName}
      </button>
    </div>
  );
};

export default Contact;
