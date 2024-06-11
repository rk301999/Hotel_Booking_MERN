import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'

const home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className='homeContainer mt-[50px] flex flex-col  items-center gap-7'>
        <Featured/>     
        <h1 className="hometitle w-[1024px] text-2xl font-bold">Browse by Property Type</h1>
        <PropertyList/>
        <h1 className="hometitle w-[1024px] text-2xl font-bold">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default home
