import Tilt from 'react-parallax-tilt';
import { ArrowDownRight, ArrowUpRight, MessageSquare } from "lucide-react";

const cardColors = {
  "Total Revenue": "from-rose-500 to-pink-400",
  "Total Orders": "from-green-500 to-emerald-400",
  "Total Reviews": "from-yellow-500 to-amber-400",
  "Products Listed": "from-sky-500 to-indigo-400",
  default: "from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900",
};

export const SummaryCard = ({ title, value, change, previous, isIncrease }) => {
  const gradient = cardColors[title] || cardColors.default;
  const textColor = isIncrease ? "text-green-700" : "text-red-700";
  const ArrowIcon = isIncrease ? ArrowUpRight : ArrowDownRight;

  const formatValue = () => {
    if (title.toLowerCase().includes("revenue") || title.toLowerCase().includes("earning")) {
      return `₹${value}`;
    }
    return value;
  };

  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.05} scale={1.02} className="w-full">
      <div
        className={`rounded-xl p-5 bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-200`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-black tracking-wide">{title}</h3>
          {title === "Total Reviews" && (
            <MessageSquare size={20} className="text-white/90" />
          )}
        </div>
        <p className="text-3xl font-bold text-black">{formatValue()}</p>
        <div
          className={`mt-2 flex items-center gap-2 text-sm font-medium ${textColor} bg-white/30 px-2 py-1 rounded-full w-fit`}
        >
          <ArrowIcon size={16} />
          <span>{change}% from {previous}</span>
        </div>
      </div>
    </Tilt>
  );
};
