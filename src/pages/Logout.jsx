import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate("/signin");
        }
        const timer = setTimeout(() => {
            localStorage.removeItem('token');
            navigate("/home");
        }, 5000);
        return () => clearTimeout(timer);
    }, [])
    //there is a reason why the below div is required bcs, 


    return <div>
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <p className="text-xl font-semibold">Logging you out...</p>
            <div className="mt-4 w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-gray-500">Redirecting to home in 5 seconds</p>
        </div>

    </div>
}