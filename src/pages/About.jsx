import { useState } from 'react';

const About = () => {
  const [btnName, setBtnName] = useState('Login');
  return (
    <div>
      <h1>About Us Page</h1>
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

export default About;
