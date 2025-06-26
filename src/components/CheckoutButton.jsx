import { useState } from "react";

export const CheckoutButton = ({ onClick }) => {
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        setIsShaking(true);
        if (onClick) onClick();
        setTimeout(() => setIsShaking(false), 400); // duration matches animation length
    };
    return (
        <button
            onClick={handleClick}
            className={`
                px-6 py-3
                bg-gradient-to-r from-emerald-600 to-emerald-400
                text-white font-semibold
                rounded-lg
                shadow-md
                transition 
                duration-300
                ease-in-out
                hover:from-emerald-700 hover:to-emerald-500
                active:scale-95
                select-none
                ${isShaking ? "animate-shake" : ""}
            `}
            type="button"
            >
            Proceed to Checkout
    </button>
    );
};
