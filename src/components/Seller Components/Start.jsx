import axios from "axios";
import { useEffect, useState } from "react";

export const StartSelling = () => {
    const [userIn, setUserIn] = useState(false);
    const isLoggedIn = localStorage.getItem('token');
    const [isSeller, setIsSeller] = useState(false);
    
    
    
    useEffect(() => {
        const fetchUserData = async () => {
            if(!isLoggedIn) {
                // there is no user data to fetch since the user isn't logged in
                console.log("there is no token present");
                
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
                    headers: { Authorization : `Bearer ${isLoggedIn}`},
                });
                if(response.data.user) {
                    const roles = response.data.user.role;
                    if(roles.includes('seller')) {
                        setIsSeller(true);
                        // console.log("Yes it is a seller");
                    }
                    
                }
            } catch(err) {
                console.error("Error", err.message);
                setUserIn(false);
                setIsSeller(false);
                console.log("Some error");
                
            }
        }
        fetchUserData();
    }, [isLoggedIn])
    if(!isLoggedIn || !isSeller) {
        return (
            <div className="border border-amber-500 text-amber-600 bg-white px-6 py-2.5 rounded-xl font-medium 
                hover:bg-amber-50 hover:shadow-md transition-all duration-300 text-center inline-block">
                <a href="/seller">
                    Become a Seller
                </a>
            </div>

        )
    }
    return <div className="bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-600 
                text-white font-semibold px-6 py-3 rounded-2xl shadow-lg 
                hover:shadow-2xl hover:scale-105 transition-all duration-300 
                border border-yellow-100/60 ring-1 ring-yellow-100/40">
        <a href="/seller-dashboard" className="">
            Go To you store
        </a>
    </div>
}