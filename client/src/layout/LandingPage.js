import React from 'react'
import "./layout.css"
import Navbar from './Navbar'

export default function LandingPage({children}) {
  return (
    <div className='h-fill'>
      <Navbar/>
      {children}
    </div>
  )
}
