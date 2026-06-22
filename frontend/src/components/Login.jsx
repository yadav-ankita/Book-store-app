import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
const Login = () => {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
        setVisible(!visible)
    }
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        try {
            await login(data);
            await Swal.fire({
                title: "Login successful!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            navigate("/");
            // setMessage("Login successful! Redirecting...");
            //setTimeout(() => navigate("/"), 800);
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Invalid email or password.";
            setMessage(errorMessage);
            console.error(error);
        }
    }
    //   const handleGoogleSignIn = async () => {
    //     try {
    //         alert("Login successful!");
    //         navigate("/")
    //     } catch (error) {
    //         alert("Google sign in failed!") 
    //         console.error(error)
    //     }
    //   }
    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            type="email" name="email" id="email" placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.email && (
                            <p className='text-red-500 text-xs italic mt-2 font-medium'>{errors.email.message}</p>
                        )}
                    </div>
                    <div className='mb-4 relative'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                            })}
                            type={visible ? "text" : "password"} name="password" id="password" placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        <span className='absolute top-10 right-5 cursor-pointer' onClick={toggleVisibility}>
                            {visible ? <FaEye className='text-lg' /> : <FaEyeSlash className='text-lg' />}
                        </span>
                        {errors.password && (
                            <p className='text-red-500 text-xs italic mt-2 font-medium'>{errors.password.message}</p>
                        )}
                    </div>
                    {
                        message && <p className={`${message.includes('successful') ? 'text-green-500' : 'text-red-500'} text-xs italic mb-3`}>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'>Haven't an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Register</Link></p>
                {/* google sign in */}
                {/* <div className='mt-4'>
                <button 
                onClick={handleGoogleSignIn}
                className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                <FaGoogle  className='mr-2'/>
                Sign in with Google
                </button>
            </div> */}
                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}
export default Login
