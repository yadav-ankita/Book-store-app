import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
const Register = () => {
    const [message, setMessage] = useState("");
    const [isVisible, setIsvisible] = useState(false);
    const toggleVisibility = () => {
        setIsvisible(!isVisible);
    }
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    //   register user
    const { registerUser } = useAuthContext();
    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            await Swal.fire({
                title: "Signup successful!",
                text: "You can now login with your credentials!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Go to Login"
            });

            navigate('/Login');
            // reset();
            // setTimeout(() => {
            //     navigate('/Login')
            // }, 1000)
        } catch (error) {
            setMessage("Please provide a valid email and password")
            console.error(error)
        }
    }
    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="text">Username</label>
                        <input
                            {...register("username", { required: "Name is required" })}
                            type="text" name="username" id="username" placeholder='Name'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs italic mt-3 font-medium">{errors.username.message}</p>
                        )}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email" name="email" id="email" placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic mt-3 font-medium">{errors.email.message}</p>
                        )}
                    </div>
                    <div className='mb-4 relative'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                                    message: "Password must include uppercase, lowercase, number, and special character",
                                },
                            })}
                            type={isVisible ? "text" : "password"} name="password" id="password" placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        <span className='absolute top-10 right-5' onClick={toggleVisibility}>
                            {isVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && (
                            <p className="text-red-500 text-xs italic mt-3 font-medium">{errors.password.message}</p>
                        )}
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Register</button>
                    </div>
                </form>
                <p className='align-baseline font-medium mt-4 text-sm'>Have an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link></p>
                {/* google sign in */}
                {/* <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div> */}
                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Register
