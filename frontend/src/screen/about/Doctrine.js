import React from 'react'
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

function Doctrine() {
  return (
    <div>
      <Helmet>
        <title>SBC-About</title>
      </Helmet>
      <div className="about">
        <div className="about-header">
          <h2>Welcome to Soddo Baptist Church</h2>
        </div>
        <div className="about-conents doctrine">
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
            <p>
              <span>
              Soddo Baptist Church's doctrinal Statement is that of the London Baptist confession which was ratified in 1689. Our Church stands on the five Solas, by which reformation was hinged. we celebrate the work of Christ by participating in two ordinances-Baptism and Communion. Communion (The Lord's Supper) is for believers who wish to strengthen their faith and follow Jesus example of sacrifice and surrender. we generally celebrate this ordinance every Sunday.
              </span>  
            </p>
        </div>
        </div>
    </div>
  );
}

export default Doctrine