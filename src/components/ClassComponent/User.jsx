import { useEffect } from 'react';

const User = ({ name }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("I'm Batman");
    }, 1000);
    console.log('useEffect()');

    return () => {
      clearInterval(timer);
      console.log('useEffect() return');
    };
  }, []);

  console.log('render');

  return (
    <div className="user-card">
      <h2>Name: {name}</h2>
      <h3>Location: Gotham</h3>
      <h4>Contact: @batman</h4>
    </div>
  );
};

export default User;
