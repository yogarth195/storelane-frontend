import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button"

export const AlreadyLoggedInPage = ()=> {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        //navigate to signup page. 
        navigate("/signup");
    }
    return <div className="min-h-screen grid grid-cols-2 md:grid-cols-4 bg-gray-700 p-5">
        <div><h1 className="text-xl font-extrabold">This is the Heading. </h1></div>
        <div>You are already logged in.</div>
        <div><Button label={"Logout Button"} onPress={handleLogout} color={"red"}></Button></div>
    </div>
}