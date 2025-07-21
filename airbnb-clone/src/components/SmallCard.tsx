import React from 'react';

interface SmallCardProps {
  imageUrl: string;
  locationName: string;
  distance: string;
}

const SmallCard: React.FC<SmallCardProps> = ({ imageUrl, locationName, distance }) => {
  return (
    <div className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out p-3">
      <div className="relative h-16 w-16 flex-shrink-0">
        <img
          className="rounded-lg h-full w-full object-cover"
          src={imageUrl}
          alt={`${locationName} destination`}
        />
      </div>
      
      <div className="flex-grow">
        <h2 className="font-semibold text-lg">{locationName}</h2>
        <h3 className="text-gray-500">{distance}</h3>
      </div>
    </div>
  );
};

export default SmallCard;
