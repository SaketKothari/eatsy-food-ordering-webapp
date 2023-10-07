const User = ({ name }) => {
  return (
    <div className="user-card">
      <h2>Name: {name}</h2>
      <h3>Location: Gotham</h3>
      <h4>Contact: @batman</h4>
    </div>
  );
};

export default User;
