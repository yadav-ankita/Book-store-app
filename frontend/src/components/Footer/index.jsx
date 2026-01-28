import React from 'react'
import book from '../../assets/footer-logo.png'
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className='text-white bg-gray-900 py-10 px-15 max-w-screen-2xl mx-auto'>
      {/* top section */}
      <div className='container flex flex-col md:flex-row items-center justify-between mx-auto  gap-8'>
        {/* left side */}
        <div className='w-full md:w-1/2'>
          <img src={book} className='mb-5 w-36' />
          <ul className='flex flex-col md:flex-row gap-4'>
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#about" className="hover:text-primary">About Us</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>
        {/* right side */}
        <div className='w-full md:w-1/2 '>
          <p className='mb-3'>Subsrcibe to our newsletter to receive the latest updates,news and offers!</p>
          <div className='flex'>
            <input placeholder='Enter your email' className='w-full px-4 py-2 rounded-l-md text-black bg-white focus:outline-none' />
            <button className='bg-primary rounded-r-lg px-3 cursor-pointer '>Subscribe</button>
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className='flex md:justify-between flex-col md:flex-row mx-auto items-center  mt-10 border-t border-gray-700 pt-6'>
        {/* left side */}
        <ul className='flex gap-6 mb-4 md:mb-0'>
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>
        {/* right side */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
