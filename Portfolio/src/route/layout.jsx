import React from 'react'
import {Outlet} from "react-router-dom"
import Footer from '../components/Footer/Footer'

const layout = () => {
  return (
    <div className = "flex flex-col min-h-screen">
      <main className = "flex-1">
        <Outlet/>
      
      </main>

    <Footer/>
    </div>
  )
}

export default layout
