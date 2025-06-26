import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios';

export const SignInApp = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const token = localStorage.getItem('token');

    

    //checking if any token is already present. 
    const navigate = useNavigate();
    
    useEffect(() => {
        
        window.scrollTo(0, 0);
        const validateToken = async () => {
            if (!token) return;

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data && res.data.username) {
                    navigate("/alreadyLoggedInPage");
                } else {
                    localStorage.removeItem("token");
                }
            } catch (err) {
                // Invalid or expired token
                localStorage.removeItem("token");
            }
        };

        validateToken();
    }, [navigate]);

    const handleSubmit = async ()=> {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signin`, {
            username, 
            password
        }).catch(err => {
            if(err.response){
                setError(err.response.data.message);
            } else {
                setError("NetWork or server error");
            }
        }) 
        console.log(response.data);
        if(response.data.token) {
            //we got a token. 
            const tokenFromBackend = response.data.token;
            localStorage.setItem('token', tokenFromBackend);
            navigate("/home");
        } else {
            setError(response.data.message || "Unknown error occured");
        }
    }
    return <div className='bg-[#7D938A]  h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4 pt-5'>
                <Heading title={"Sign In"}/>
                <SubHeading label={"Sign into your Account"}/>
                <InputBox lable={"Email ID/Username"} onTyping={e =>{
                    setUsername(e.target.value);
                }} placeHolder={"youremail@gmail.com"} onEnter={handleSubmit}/>
                <InputBox type={"password"} lable={"Password"} onTyping={e =>{
                    setPassword(e.target.value);
                }} placeHolder={"*********"} onEnter={handleSubmit}/>
                <div className='pt-4'>
                    {error && <div className='text-red-500'>{error}</div>}
                    <Button onPress={handleSubmit} label={"Sign In"}/>
                </div>
                <BottomWarning messageWarning={"Don't have an Account?"} whereToText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}