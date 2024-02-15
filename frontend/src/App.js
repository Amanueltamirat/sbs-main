import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ArticleScreen from './screen/articlesScreen/ArticleScreen';
import ArticleDetail from './screen/articlesScreen/ArticleDetail';
import AboutScreen from './screen/AboutScreen';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import HomeScreen from './screen/HomeScreen';
import SigninScreen from './screen/SigninScreen';
import { useContext } from 'react';
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
import SampleBook from './screen/bookScreen/SampleBook';
// import UpdateSermon from './screen/sermonsScreen/UpdateSermon';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar variant="dark" expand="lg" className="navbar">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-primary">SBC</Navbar.Brand>
              </LinkContainer>
              <div className="d-flex justify-content-between navlink ">
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="about">
                  About
                </NavLink>
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="articles">
                  Articles
                </NavLink>
                <NavLink to="books" className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'}>
                  Books
                </NavLink>
                <NavLink className={({isActive})=>isActive ? 'isActiveLink':'isNotActiveLink link'} to="sermons">
                  Sermons
                </NavLink>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    {userInfo.isAdmin && <LinkContainer to="/dashboared">
                      <NavDropdown.Item>Dashboared</NavDropdown.Item>
                    </LinkContainer>}
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
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
            </Container>
          </Navbar>
        </header>

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/books" element={<BookScreen />} />
          <Route path="/createbook" element={<CreateBook />} />
           {/* <Route path="/createbook" element={<SampleBook />} /> */}
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/readbook" element={<ReadBook />} />
          <Route path="/sermons" element={<SermonsScreen />} />
          <Route path="/createsermons" element={<CreateSermonsScreen />} />
          <Route path="/sermon/:id" element={<SermonDetail />} />
          <Route path="/updatesermon/:id" element={<UpdateSermon />} />
          <Route path="/articles" element={<ArticleScreen />} />
          <Route path="/newarticles" element={<NewAricles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/updatearticle/:id" element={<UpdateArticle />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/dashboared" element={<UserList />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/forget-password" element={<ForgetpasswordScreen />} />

          <Route
            path="/reset-password/:token"
            element={<ResetpasswordScreen />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
