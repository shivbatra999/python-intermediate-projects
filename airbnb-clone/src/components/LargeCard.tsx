import React from 'react';

interface LargeCardProps {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
}

const LargeCard: React.FC<LargeCardProps> = ({ imageUrl, title, description, buttonText }) => {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px]">
        <img
          className="rounded-2xl h-full w-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </div>
      
      <div className="absolute top-32 left-12">
        <h3 className="text-4xl mb-3 w-64 font-bold text-white">{title}</h3>
        <p className="text-white mb-6 text-lg">{description}</p>
        
        <button
          className="text-gray-900 bg-white px-4 py-2 rounded-lg font-bold hover:bg-gray-100 hover:shadow-md active:scale-90 transition duration-150 transform"
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default LargeCard;
