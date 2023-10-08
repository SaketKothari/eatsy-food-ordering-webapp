import { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

const Contact = () => {
  const [btnName, setBtnName] = useState('Login');
  const { loggedInUser, setUserName } = useContext(UserContext);

  return (
    <div className='flex justify-center'>
      <div className="flex mt-5 w-full space-x-2 md:w-1/3">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          value={loggedInUser}
          type="text"
          id="name"
          onChange={(e) => setUserName(e.target.value)}
        />

        <button
          type="button"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={() =>
            btnName === 'Login' ? setBtnName('Logout') : setBtnName('Login')
          }
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default Contact;
