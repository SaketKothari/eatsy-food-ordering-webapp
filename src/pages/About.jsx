import { useState } from 'react';

const About = () => {
  const [btnName, setBtnName] = useState('Login');
  return (
    <div>
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
