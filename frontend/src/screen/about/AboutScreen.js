import React from "react";
import { Helmet } from "react-helmet-async";
import './About.css'
import { NavLink } from "react-router-dom";
function AboutScreen() {
  return (
    <div>
      <Helmet>
        <title>SBC-About</title>
      </Helmet>
  <div className="about">
  <div className="about-header">
  <h2>Welcome to Soddo Baptist Church</h2>
  </div>
  <div className="about-conents">
  <div className="about-links">
   <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink  about-link'} 
  to="mission">Mission</NavLink>
   <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink about-link'} 
  to="history">Our History</NavLink>
   <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink  about-link'} 
  to="doctrine">Doctrinal Statement</NavLink>
     <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink  about-link'} 
  to="/about/contact">Contact </NavLink>
  </div>
    <p>
    Wolaita is located in the southern part of Ethiopia within an area of about 4,400 square kilometers.the northern tip of the boundery of wolaita is about 360 km south of the capital Addis Ababa. Around thet 19th century protestant missionies came from abroad to the wolaita and started to preach the gospel. building schools and health centers. as a result, the people started to be conveted to the evangelical faith. currently, most people are evangelical protestant christains, some are orthodox christains and the rest are muslims and other christain denominations. and there is only one reforemed church we know in wilaita, which is Soddo Baptist Church.
    </p>
  </div>
     </div>
    </div>
  );
}

export default AboutScreen;
