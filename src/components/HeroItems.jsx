import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleData = [
  {
    id: 1,
    title: "Selfcare",
    image:
      "https://www.victoriassecret.in/on/demandware.static/-/Sites-vs_master_catalog/default/dwba4697b3/large/111857322068_OF_F.jpg",
  },
  {
    id: 2,
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    title: "Fashion",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "Home",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 5,
    title: "Books",
    image:
      "https://images.unsplash.com/photo-1697029749544-ffa7f15f9dd0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const HeroItems = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const handleClick = (title) => {
    const query = encodeURIComponent(title.toLowerCase());
    navigate(`/searchresults?q=${query}`);
  };

  return (
    <div className="w-full overflow-hidden bg-white py-8">
      <div className="flex gap-4 max-w-6xl mx-auto px-6 min-w-0">
        {sampleData.map((item, index) => {
          const isHovered = hovered === index;
          const isOther = hovered !== null && hovered !== index;

          return (
            <div
              key={item.id}
              className={`relative flex-shrink-0 h-64 rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300
                ${isHovered ? "flex-[2.5]" : isOther ? "flex-[1.2]" : "flex-[1.6]"}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(item.title)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-center text-sm py-2 px-1">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
