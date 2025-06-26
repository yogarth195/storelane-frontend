import React from 'react';

export const ScrollableSlider = () => {
  const images = [
    'https://via.placeholder.com/400x300?text=Nike+1',
    'https://via.placeholder.com/400x300?text=Nike+2',
    'https://via.placeholder.com/400x300?text=Nike+3',
    'https://via.placeholder.com/400x300?text=Nike+4',
    'https://via.placeholder.com/400x300?text=Nike+5',
  ];

  return (
    <div className="overflow-x-auto  scroll-smooth pb-6 ">
      <div className="flex space-x-4">
        {images.map((src, index) => (
          <div key={index} className="flex-none w-80 h-60 bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={src}
              alt={`Nike Shoe ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
