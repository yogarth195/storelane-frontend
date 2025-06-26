import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const items = [
  {
    src: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25302595/01_ThinkPad_T14s_5_Eclipse_Black_Intel_Front_open_display_JD_edit.jpg?quality=90&strip=all&crop=0,5.525906159662,100,88.948187680676",  
    alt: "ThinkPad",
  },
  {
    src: "https://m.media-amazon.com/images/I/71-6roO29AL.jpg",
    alt: "Macbook Pro",
  },
  {
    src: "https://suprememobiles.in/cdn/shop/files/Apple_iPhone_16_Pro_Sleek_design_and_cutting-edge_technology.webp?v=1739795264",
    alt: "iPhone 15",
  },
  {
    src: "https://images.hindustantimes.com/img/2022/09/01/1600x900/2df2032a-29d6-11ed-bc83-9c2713d606c3_1662038669844.jpg",
    alt: "Galaxy Z Fold 5",
  },
  {
    src: "https://hnsgsfp.imgix.net/4/images/detailed/120/Bose_QuietComfort_Ultra_Headphones_-_White.jpg?fit=fill&bg=0FFF&w=1536&h=900&auto=format,compress",
    alt: "Sony XM5",
  },
];

export const LaptopSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useNavigate();

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="mx-4 md:mx-10 mt-10 bg-white border shadow-sm overflow-hidden relative z-0">
      <div className="text-2xl font-semibold text-gray-900 px-4 py-3 border-b flex justify-center">
        Buy Laptops
      </div>

      <div className="flex w-full h-64">
        {/* Left  */}

        <div className="relative w-1/3 h-full overflow-hidden bg-white">
          <div className="w-full h-full relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={items[currentIndex].src}
                src={items[currentIndex].src}
                alt={items[currentIndex].alt}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                onClick={()=> navigate(`/searchresults?q=${items[currentIndex].alt}`)}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Right */}
        <div className="w-2/3 h-full bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400">Click a product to explore</p>
        </div>
      </div>
    </div>
  );
};
