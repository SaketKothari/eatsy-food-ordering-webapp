const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {Array(10)
        .fill('')
        .map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse m-5 p-5"
          >
            <div className="relative h-[400px] w-[300px] rounded-md overflow-hidden">
              <div className="h-full w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <div className="animate-pulse bg-gray-200 h-6 w-32 rounded-md mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-40 rounded-md mb-2"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-24 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
