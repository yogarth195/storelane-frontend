import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { BottomWarning } from '../components/BottomWarning';
import axios from 'axios';

export const SignUpApp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
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
            navigate('/alreadyLoggedInPage');
            } else {
            localStorage.removeItem('token');
            }
        } catch (err) {
            localStorage.removeItem('token');
        }
        };

        validateToken();
    }, [navigate]);

    const handleSubmit = async () => {
        try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, {
            username,
            firstName,
            lastName,
            password,
        });

        if (response.data.token) {
            const tokenFromBackend = response.data.token;
            localStorage.setItem('token', tokenFromBackend);
            navigate('/home');
        } else {
            setError(response.data.message || 'Unknown error occurred');
        }
        } catch (err) {
        console.log('Signup error:', err?.response?.data || err.message); // for debugging
        if (err.response?.data?.message) {
            setError(err.response.data.message);
        } else {
            setError('Something went wrong');
        }
        }
    };

    return (
        <div className="bg-[#7D938A] h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 pt-5">
            <Heading title={'Sign Up'} />
            <SubHeading label={'Create an Account'} />
            <InputBox
                lable={'First Name'}
                onTyping={(e) => setFirstName(e.target.value)}
                placeHolder={'Your Name'}
            />
            <InputBox
                lable={'Last Name'}
                onTyping={(e) => setLastName(e.target.value)}
                placeHolder={'Your LastName'}
            />
            <InputBox
                lable={'Email ID'}
                onTyping={(e) => setUsername(e.target.value)}
                placeHolder={'youremail@gmail.com'}
            />
            <InputBox
                type={'password'}
                lable={'Password'}
                onTyping={(e) => setPassword(e.target.value)}
                placeHolder={'*********'}
                onEnter={handleSubmit}
            />

            {error && (
                <div className="text-red-600 text-sm mt-2">
                {error}
                </div>
            )}

            <div className="pt-4">
                <Button onPress={handleSubmit} label={'Sign Up'} />
            </div>
            <BottomWarning messageWarning={'Already have an Account?'} whereToText={'Sign In'} to={'/signin'} />
            </div>
        </div>
        </div>
    );
};
