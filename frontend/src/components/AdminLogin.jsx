import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import { FaGoogle,FaEye,FaEyeSlash } from "react-icons/fa";
import getBaseUrl from '../utils/getBaseUrl'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
const AdminLogin = () => {
  const [message, setMessage] = useState("");
   const [visible,setVisible]=useState(false);
       const toggleVisibility=()=>{
           setVisible(!visible)
       }
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
      const navigate = useNavigate();
      const { login }=useAuthContext();
      const onSubmit = async (data) => {
        // console.log(data)
        try {
            await login(data);
            navigate("/dashboard")
        } catch (error) {
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
      }
  return (
    <div className='h-screen flex justify-center items-center '>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                    {...register("email", { required: true })} 
                    type="email" name="email" id="email" placeholder='Email'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                    <input 
                    {...register("password", { required: true })} 
                    type={visible?"text" : "password"} name="password" id="password" placeholder='Password'
                    className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                    {/* <span className='absolute top-9 left-115' onClick={toggleVisibility}>
                                              {
                                                  visible ? <> <FaEye className='size-5'/></> : <><FaEyeSlash className='size-5'/></>
                                              }
                                        </span> */}
                </div>
                {
                    message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                }
                <div className='w-full'>
                    <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
                </div>
            </form>
            <p className='mt-5 text-center text-gray-500 text-xs'>©2026 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}
export default AdminLogin
