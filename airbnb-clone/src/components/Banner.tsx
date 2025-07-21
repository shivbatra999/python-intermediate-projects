import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <img
        className="h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        alt="Beautiful travel destination"
      />
      <div className="absolute top-1/2 w-full text-center transform -translate-y-1/2">
        <p className="text-sm sm:text-lg text-white mb-5 px-4">
          Not sure where to go? Perfect.
        </p>
        <button
          className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150 transform hover:bg-gray-50"
          aria-label="Flexible destination search"
        >
          I'm flexible
        </button>
      </div>
    </div>
  );
};

export default Banner;
