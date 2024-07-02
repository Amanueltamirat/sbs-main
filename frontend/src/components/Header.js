import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store';
// import logoImg from '../imges/SBC Logo-upper.jpg'
import logoImg from '../imges/result (3).png'
import Togglebutton from '../screen/toggleButton/ToggleButton';
import {motion} from 'framer-motion'
import SearchInput from '../components/SearchInput';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import SignOutScren from '../screen/SignOutScren';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';

 const variants = {
    open:{
      clipPath:'circle(1200px at 50px 50px)',
      transition:{
        type:'spring',
        stiffness:20,
      }
    },
    closed:{
      clipPath:'circle(30px at 50px 50px)',
      transition:{
        delay:0.1,
        type:'spring',
        stiffness:400,
        damping:40
      }
    }
 }


function Header({isHome}) {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const  [open, setOpen] = useState(false)
  const [show, handleShow] = useState(false);
 


 const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    
  };


  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 160) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", removeEvent);
    };
  }, []);

function removeEvent() {}


  return (
  
   <header>
          <navbar className="navBar">
            <div className={`container ${show && "nav_black"} ${!isHome && "hd-black"}`}>
              <LinkContainer to="/">
                <Navbar.Brand className="text-primary">
                  <img alt='logo' src={logoImg}/>
                </Navbar.Brand>
              </LinkContainer>

               {/* <SearchInput/> */}
               <div>
              <div className='hidde-content'>
              <div className="navlink">
                <NavDropdown title={<NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="about">
                  About
                </NavLink>} id="basic-nav-dropdown">
                    <LinkContainer to="/about/mission">
                      <NavDropdown.Item>Mission</NavDropdown.Item>
                    </LinkContainer>
                     <LinkContainer to="/about/history">
                      <NavDropdown.Item>Our History</NavDropdown.Item>
                    </LinkContainer>
                     <LinkContainer to="/about/doctrine">
                      <NavDropdown.Item>Doctrinal Statement</NavDropdown.Item>
                    </LinkContainer>
                     <LinkContainer to="/about/contact">
                      <NavDropdown.Item>Contact</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </NavDropdown>

                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="articles">
                  Articles
                </NavLink>
                <NavLink to="books" className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'}>
                  Books
                </NavLink>
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="sermons">
                  Sermons
                </NavLink>
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="messages">
                  Messages
                </NavLink>
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="support">
                  Support Us
                </NavLink>
                {userInfo ? (
                  <NavDropdown className='nav-drop' title={userInfo.email} id="basic-nav-dropdown">
                    {userInfo.email === 'Perfecttesfa456@gmail.com' && <LinkContainer to="/userslist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>}{
                        userInfo.email === 'Perfecttesfa456@gmail.com' &&
                        <>
                    <LinkContainer to="/analysis">
                      <NavDropdown.Item>Analysis</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                        </>
                    }
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </div>
              </div>
            <motion.div animate={open ? 'open':'closed'} className='motion-box hidde'>
             <Togglebutton open={open} setOpen={setOpen}/>
              { open &&
              <div className="hidde" >
                <NavDropdown onClick={()=>setOpen(prev=>!prev)} title={<NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="about">
                  About
                </NavLink>} id="basic-nav-dropdown">
                    <LinkContainer to="/about/mission">
                      <NavDropdown.Item>Mission</NavDropdown.Item>
                    </LinkContainer>
                     <LinkContainer to="/about/history">
                      <NavDropdown.Item>Our History</NavDropdown.Item>
                    </LinkContainer>
                     <LinkContainer to="/about/doctrine">
                      <NavDropdown.Item>Doctrinal Statement</NavDropdown.Item>
                    </LinkContainer>
                      <LinkContainer to="/about/contact">
                      <NavDropdown.Item>Contact</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                  </NavDropdown>


                <NavLink onClick={()=>setOpen(prev=>!prev)} className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="articles">
                  Articles
                </NavLink>
                <NavLink onClick={()=>setOpen(prev=>!prev)} to="books" className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'}>
                  Books
                </NavLink>
                <NavLink onClick={()=>setOpen(prev=>!prev)} className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="sermons">
                  Sermons
                </NavLink>
                <NavLink onClick={()=>setOpen(prev=>!prev)} className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="messages">
                  Messages
                </NavLink>
                <NavLink onClick={()=>setOpen(prev=>!prev)} className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="support">
                  Support Us
                </NavLink>
                {userInfo ? (
                  <NavDropdown className='nav-drop'  title={userInfo.name} id="basic-nav-dropdown">
                    {userInfo.email === 'Perfecttesfa456@gmail.com' && <LinkContainer onClick={()=>setOpen(prev=>!prev)} to="/userslist">
                      <NavDropdown.Item>Dashboared</NavDropdown.Item>
                    </LinkContainer>}
                    { userInfo.email === 'Perfecttesfa456@gmail.com' &&<>
                    <LinkContainer onClick={()=>setOpen(prev=>!prev)} to="/analysis">
                      <NavDropdown.Item>Analysis</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    </>
                    }
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={(prev)=>{signoutHandler(), setOpen(prev=>!prev)}}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link onClick={()=>setOpen(prev=>!prev)} className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </div>
            }
            </motion.div>
            </div>
            </div>
          </navbar>
        </header>
  )
}

export default Header