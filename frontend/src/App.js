import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ArticleScreen from './screen/articlesScreen/ArticleScreen';
import ArticleDetail from './screen/articlesScreen/ArticleDetail';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import HomeScreen from './screen/HomeScreen';
import SigninScreen from './screen/SigninScreen';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import SignupScreen from './screen/SignupScreen';
import ForgetpasswordScreen from './screen/ForgetpasswordScreen';
import ResetpasswordScreen from './screen/ResetpasswordScreen';
import NewAricles from './components/NewAricles';
import UpdateArticle from './screen/articlesScreen/UpdateArticle';
import UserList from './screen/userlist/UserList';
import SermonsScreen from './screen/sermonsScreen/SermonsScreen';
import SignOutScren from './screen/SignOutScren';
import CreateSermonsScreen from './screen/sermonsScreen/CreateSermonsScreen';
import SermonDetail from './screen/sermonsScreen/SermonDetail';
import UpdateSermon from './components/UpdateSermon';
import BookScreen from './screen/bookScreen/BookScreen';
import CreateBook from './screen/bookScreen/CreateBook';
import BookDetail from './screen/bookScreen/BookDetail';
import ReadBook from './screen/bookScreen/ReadBook';
import Footer from './components/footer/Footer';
import AboutScreen from './screen/about/AboutScreen';
import Mission from './screen/about/Mission';
import History from './screen/about/History';
import Doctrine from './screen/about/Doctrine';
import Togglebutton from './screen/toggleButton/ToggleButton';
import {motion} from 'framer-motion'
import Search from './components/Search';
import SearchInput from './components/SearchInput';
import Support from './components/Support';
import Contact from './screen/about/Contact';
import Nopage from './components/Nopage';
import Analysis from './components/Analysis';
import AdminRoute from './components/AdminRoute';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
const  [open, setOpen] = useState(false)

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

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    
  };
 
  return (<div className='app'>
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar variant="dark" expand="lg" className="navbar">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-primary">SBC</Navbar.Brand>
              </LinkContainer>
               <SearchInput/>
              <div className='hidde-content'>
              <div className="d-flex justify-content-between navlink ">
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
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="support">
                  Support Us
                </NavLink>
                {userInfo ? (
                  <NavDropdown className='nav-drop' title={userInfo.name} id="basic-nav-dropdown">
                    {userInfo.isAdmin && <LinkContainer to="/userslist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>}{
                        userInfo.isAdmin &&
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
            <motion.div animate={open ? 'open':'closed'} className='motion-box'>
             <Togglebutton open={open} setOpen={setOpen}/>
              { open &&
              <div className="hidde">
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
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="support">
                  Support Us
                </NavLink>
                {userInfo ? (
                  <NavDropdown className='nav-drop'  title={userInfo.name} id="basic-nav-dropdown">
                    {userInfo.isAdmin && <LinkContainer to="/userslist">
                      <NavDropdown.Item>Dashboared</NavDropdown.Item>
                    </LinkContainer>}
                    { userInfo.isAdmin &&<>
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
            }
            </motion.div>
            </Container>
          </Navbar>
        </header>

        <Routes>
          <Route path="/*" element={<Nopage/>} />
           <Route path="/search" element={<Search />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/doctrine" element={<Doctrine />} />
          <Route path="/about/contact" element={<Contact />} />
          <Route path="/books" element={<BookScreen />} />
          <Route path="/book/:filename" element={<ReadBook />} />
          <Route path="/books/:filename" element={<BookDetail />} />
          <Route path="/createbook" element={<AdminRoute>
            <CreateBook />
          </AdminRoute>} />
          <Route path="/readbook" element={<ReadBook />} />
          <Route path="/sermons" element={<SermonsScreen />} />
          <Route path="/createsermons" element={<AdminRoute><CreateSermonsScreen /></AdminRoute>} />
          <Route path="/sermon/:id" element={<SermonDetail />} />
          <Route path="/updatesermon/:id" element={<AdminRoute><UpdateSermon /></AdminRoute>} />
          <Route path="/articles" element={<ArticleScreen />} />
          <Route path="/newarticles" element={<AdminRoute><NewAricles /></AdminRoute>} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/updatearticle/:id" element={<AdminRoute><UpdateArticle /></AdminRoute>} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/userslist" element={<AdminRoute><UserList /></AdminRoute>} />
          <Route path="/analysis" element={<AdminRoute><Analysis /></AdminRoute>} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/support" element={<Support />} />
          <Route path="/forget-password" element={<ForgetpasswordScreen />} />
          <Route
            path="/reset-password/:token"
            element={<ResetpasswordScreen />}
          />
        </Routes>
      </div>
      <Footer/>
      
    </BrowserRouter>
    </div>
  );
}

export default App;
