import React from 'react'
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';

function History({setIsHome}) {
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
  <div className="about-conents history">
  <div className="about-links">
   <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink  about-link'} 
  to="/about/mission">Mission</NavLink>
   <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink about-link'} 
  to="/about/history">Our History</NavLink>
   <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink about-link'} 
  to="/about/doctrine">Doctrinal Statement</NavLink>
   <NavLink className={({isActive})=>isActive ? 'isActivelink':'isNotActivelink  about-link'} 
  to="/about/contact">Contact </NavLink>
  </div>
    <p>
   The church is of living God built on the foundation of the apostles and prophets. Jesus Christ himself being the cornerstone
   <span>
   Soddo Baptist Church is loacted in Wolaita Soddo. which is a reformed Baptist congregation subscribing to the 1689 London Baptist confession of faith. We started gathering in 2018. There had been a persistent persecution of members of our church before the establishment of soddo Baptist Church because of their faith. we embraced reformed theology and started raising questions on our former churches about their faith and the way they are practicing it. this continued and churches urged families to stop their children from going to bible studies and meetings because they were mostly on their families. Most of our church members are young High School and  University students. Some families even cut monthly stipends and school payments. However, God used theses persecution for the establishment of Soddo Baptist Church.
   </span> 
   <span>
  Since the gathering, God has richly blessed this church and now we have gratefully recognized 69 members. our small size setting has made it possible to form the depth of relationships that the Bible commends. We acknowledge thet God has designed us to grow in our relationship with one another as we love one another and speak the truth to one another.
   </span>
   <span>
   The story reminds us of what happened in the 16th century; the reformation . Understading this deep crisis, the church's true children, who were convinved of the church's reformation, ignited the fire of reformation in 1517 by Martin Luther. Among many reforemed churches that were born through the providential work of God, Soddo Baptist in one.
   </span>
    </p>
  </div>
     </div>
    </div>
  );
}

export default History