import { useEffect, useState } from "react";

export const JumpToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // console.log('scrollY:', window.scrollY, 'threshold:', 0.75 * window.innerHeight);
      setIsVisible(window.scrollY > 0.75 * window.innerHeight);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
        className={`
          fixed bottom-8 right-8 z-50
          transition-opacity duration-500
          ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <button
          onClick={handleClick}
          className="
            bg-emerald-600
            text-white
            px-4
            py-2
            rounded-full
            shadow-lg
            opacity-30
            hover:opacity-100
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500
            transition
            duration-300
            ease-in-out
            transform
            hover:-translate-y-1
            active:scale-95
            select-none
          "
          aria-label="Jump to top"
        >
          ↑
        </button>
      </div>
  );
};
