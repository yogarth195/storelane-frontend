import { useNavigate } from "react-router-dom";

export const BecomeSeller = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 mt-10 bg-white gap-10">
      {/* Text Section */}
      <div className="flex-1 text-left space-y-6 ml-16">
        <h2 className="text-4xl font-bold text-gray-900">
          Become a Seller
        </h2>
        <p className="text-lg text-gray-600 max-w-lg">
          Start your journey as a seller and reach thousands of customers. Set up your store, manage your products, and grow your business effortlessly.
        </p>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 transition" onClick={() => navigate('/seller')}>
          Start Selling
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <img
          src="https://img.freepik.com/premium-vector/graphic-business-owner-accepting-payment-store-checkout_1298961-4440.jpg"
          alt="Become a seller"
          className="w-full max-w-md mx-auto object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
};
