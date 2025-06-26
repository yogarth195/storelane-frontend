import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SlidingBar = () => {
  const images = [
    { src: "/svgs/heroitems.png" },
    { src: "/svgs/GroceryStore.png" },
    { src: "/svgs/BecomeSeller.png" },
    { src: "/svgs/BeautyProducts.png" },
    { src: "/svgs/HEADPHONE.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // ✅ Auto Slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up
  }, [currentIndex]); // Re-run if index changes (keeps transition smooth)

  return (
    <div className="w-full px-6 md:px-12 my-12">
      <div
        className="relative w-full aspect-[1440/820] max-h-[600px] bg-center bg-contain bg-no-repeat rounded-3xl shadow-xl transition-all duration-700"
        style={{ backgroundImage: `url(${images[currentIndex].src})` }}
      >
        {/* Content layer */}
        <div className="h-full w-full px-6 md:px-16 flex items-center justify-start">
          <div className="text-white">
            {/* Add hero content here later */}
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg z-0"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-3 rounded-full shadow-lg z-0"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
