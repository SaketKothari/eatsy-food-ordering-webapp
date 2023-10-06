const Shimmer = () => {
  return (
    <div className="shimmer-container">
      {Array(10)
        .fill('')
        .map((index) => (
          <div key={index} className="shimmer-card"></div>
        ))}
    </div>
  );
};

export default Shimmer;
