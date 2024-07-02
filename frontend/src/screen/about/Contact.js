import React from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from 'react-router-dom'
import './About.css'
import Map from './Map'
import Contactform from './Contactform'

function Contact({setIsHome}) {
  setIsHome(false)
  return (
     <div>
      <Helmet>
        <title>SBC-About</title>
      </Helmet>
      <div className="about">
        <div className="about-header">
          <h2>Welcome to Soddo Baptist Church</h2>
        </div>
        <div className="about-conents contact">
          <div className="about-links">
            <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink  about-link'} 
            to="/about/mission">Mission</NavLink>
            <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink about-link'} 
            to="/about/history">Our History</NavLink>
            <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink  about-link'} 
            to="/about/doctrine">Doctrinal Statement</NavLink>
              <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink  about-link'} 
            to="/about/contact">Contact </NavLink>
          </div>
          <div className='contact-box'>
          <div className='loaction'>
            <div className='info-box'>
              <h2>Contact Information</h2>
              <div className='info'>
                 <div>
                  <strong>Phone:</strong>
                  <p>+251 92 888 4393</p>
                 </div>
                 <div>
                  <strong>Email:</strong>
                  <p>Perfecttesfa456@gmail.com</p>
                 </div>
                 <div>
                  <strong>Facebook:</strong>
                  <p>https://www.facebook.com/soddobaptist</p>
                 </div>
                  <div>
                  <strong>Youtube:</strong>
                  <p>https://www.youtube.com/@SoddoBaptistChurch</p>
                 </div>
              </div>
            </div>
            <div className='map'>
              <Map/>
            </div>
            
          </div>
             <div className='form-box'>
            <Contactform/>
          </div>
           </div>
          
        </div>
        </div>
    </div>
  )
}

export default Contact