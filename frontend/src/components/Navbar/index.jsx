import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 ">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearch className="size-4 absolute left-2 inset-y-2 "/>
            <input type="text" placeholder="Search here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* right side */}
        <div className='flex items-center md:space-x-3 space-x-2'>
          <Link to="/login"><FaRegUser className="size-6"/></Link>
         <button className="hidden sm:block"><FaRegHeart  className="size-6"/></button> 
         <Link to="/cart" className="p-1  md:px-6 px-2  flex items-center bg-primary rounded-sm">
          <MdOutlineShoppingCart className="size-5"/>
           <span className="text-sm font-semibold sm:ml-2">0</span>
         </Link>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
