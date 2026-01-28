import React from 'react'
import Navbar from './components/Navbar/index'
import Footer from './components/Footer/index'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <>
     
        <Navbar />
        <main className='min-h-screen max-w-screen-2xl mx-auto'>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default App
