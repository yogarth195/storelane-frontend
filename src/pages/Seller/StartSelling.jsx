import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SellerPage = () => {
    const [storeName, setStoreName] = useState("");
    const [message, setMessage] = useState("");
    const [isSeller, setIsSeller] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Check if already a seller
    useEffect(() => {
        const checkSellerStatus = async () => {
        if (!token) return;

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
            });

            const roles = res.data?.user?.role || [];
            console.log("User roles:", roles);
            if (roles.includes("seller")) {
                setIsSeller(true);
                setMessage("You are already a seller. Redirecting...");
                setTimeout(() => navigate("/seller-dashboard"), 2000);
            }
        } catch (err) {
            console.error("Error checking seller status", err);
        }
        };

        checkSellerStatus();
    }, [token, navigate]);

    // Register as seller
    const handleRegister = async () => {
        if (!storeName.trim()) {
        setMessage("Please enter a valid store name.");
        return;
        }

        try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/seller/register`,
            { storeName },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const newToken = res.data?.token;
        if(newToken) {
            localStorage.setItem('token', newToken);            
            window.location.reload();

        };
        // below lines are irrelevant for now. will fix later
        // setMessage("Seller registered successfully! Redirecting...");
        // setTimeout(() => navigate("/seller-dashboard"), 2000);
        } catch (err) {
        console.error("Seller registration failed", err);
        setMessage(err.response?.data?.message || "Registration failed");
        }
    };

    if (isSeller) {
        return (
        <div className="p-6 text-center text-blue-600 font-semibold">
            {message}
        </div>
        );
    }

    return (
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
            {!isLoggedIn || !isSeller ? (
            <a
                href="/seller"
                className="border border-amber-500 text-amber-600 bg-white px-4 py-2 rounded-lg font-medium 
                hover:bg-amber-50 hover:shadow-md transition-all duration-300 text-center text-sm sm:text-base"
            >
                Become a Seller
            </a>
            ) : (
            <a
                href="/seller-dashboard"
                className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 
                text-white font-semibold px-4 py-2 rounded-lg shadow 
                hover:shadow-lg hover:scale-105 transition duration-300 text-sm sm:text-base"
            >
                Go To Your Store
            </a>
            )}
        </div>
        );

};
