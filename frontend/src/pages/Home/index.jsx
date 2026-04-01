import React, { useEffect } from 'react'
import Banner from './Banner'
import News from './News'
import TopSellers from './TopSellers'
import Recommended from './Recommended'
import { useAuthContext } from '../../context/AuthContext'
const Home = () => {
  const {getAllBooks}=useAuthContext();
  useEffect(()=>{
      getAllBooks();
  },[])
  return (
    <>
        <Banner/>
        <TopSellers/>
        <Recommended/>
        <News/>
    </>
  )
}

export default Home