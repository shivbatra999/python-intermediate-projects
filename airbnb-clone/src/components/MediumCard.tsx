import React from 'react';

interface MediumCardProps {
  imageUrl: string;
  title: string;
}

const MediumCard: React.FC<MediumCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out">
      <div className="relative h-80 w-80">
        <img
          className="rounded-xl h-full w-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </div>
      <h3 className="text-2xl mt-3 font-semibold">{title}</h3>
    </div>
  );
};

export default MediumCard;
