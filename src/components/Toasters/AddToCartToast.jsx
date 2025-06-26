import { useEffect, useState } from "react";

export const Toaster = ({ message, type = "success", onClose, position= "bottom" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true); // fade in

    const timer = setTimeout(() => {
      setVisible(false); // start fade out
      setTimeout(() => {
        onClose(); // after fade out duration
      }, 300);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, onClose]);

  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const icon = type === "success" 
    ? (
      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ) 
    : (
      <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );

    const positionClasses = position === 'top' ? "top-24 right-5 z-[999]" : "bottom-5 right-5 z-56"

  return (
    <div
      className={`${bgColor} fixed ${positionClasses} flex items-center shadow-lg rounded-lg px-5 py-3 max-w-xs text-white
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(10px)",
      }}
    >
      {icon}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
