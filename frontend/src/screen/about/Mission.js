import React from 'react'
import { Helmet } from "react-helmet-async";
import './About.css'
import { NavLink } from "react-router-dom";
function Mission({setIsHome}) {
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
  <div className="about-conents mission">
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
    <small>
   Our mission is to worship God through Jesus Christ in the Spirit and truth with fellow believers and to share the Gospel with the world and equipping believers for ministry.
    </small>
   <span>
   <strong>18</strong> Then Jesus came to them and said, “All authority in heaven and on earth has been given to me. <strong>19</strong> Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, <strong>20</strong> and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age.” <strong>Math. 28:18-20</strong>
   </span> 
   <span>
   <strong>12</strong> to equip his people for works of service, so that the body of Christ may be built up <strong>13</strong> until we all reach unity in the faith and in the knowledge of the Son of God and become mature, attaining to the whole measure of the fullness of Christ.

<strong>14</strong> Then we will no longer be infants, tossed back and forth by the waves, and blown here and there by every wind of teaching and by the cunning and craftiness of people in their deceitful scheming. <strong>Eph. 4:12-14</strong>
   </span>
    </p>
  </div>
     </div>
    </div>
  );
}

export default Mission