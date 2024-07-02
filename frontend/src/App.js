import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ArticleScreen from './screen/articlesScreen/ArticleScreen';
import ArticleDetail from './screen/articlesScreen/ArticleDetail';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import SignOutScren from './screen/SignOutScren';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
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
import SearchInput from './components/SearchInput';
import Search from './components/Search';
import Support from './components/Support';
import Contact from './screen/about/Contact';
import Nopage from './components/Nopage';
import Analysis from './components/Analysis';
import AdminRoute from './components/AdminRoute';
import logoImg from './imges/SBC Logo-upper.jpg'
import axios from 'axios';
import { BASE_URL } from './utils';
import Messagescreen from './screen/messagescreen/Messagescreen';
import Header from './components/Header';
function App() {
 
const [isHome, setIsHome] = useState(true);


  return (<div className='app'>
    <BrowserRouter>
    {/* <h1 style={{textAlign:'center', backgroundColor:'lightgray'}}>Hello</h1> */}
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
         <Header isHome={isHome}/>
        <Routes>
          <Route path="/*" element={<Nopage setIsHome={setIsHome}/>} />
           <Route path="/search" element={<Search />} />
          <Route path="/about/mission" element={<Mission setIsHome={setIsHome} />} />
          <Route path="/about/history" element={<History setIsHome={setIsHome}/>} />
          <Route path="/about/doctrine" element={<Doctrine setIsHome={setIsHome}/>} />
          <Route path="/about/contact" element={<Contact setIsHome={setIsHome}/>} />
          <Route path="/books" element={<BookScreen setIsHome={setIsHome}/>} />
          <Route path="/book/:filename" element={<ReadBook setIsHome={setIsHome}/>} />
          <Route path="/books/:filename" element={<BookDetail setIsHome={setIsHome}/>} />
          <Route path="/createbook" element={<AdminRoute>
            <CreateBook setIsHome={setIsHome}/>
          </AdminRoute>} />
          <Route path="/readbook" element={<ReadBook />} />
          <Route path="/sermons" element={<SermonsScreen setIsHome={setIsHome}/>} />
          <Route path="/messages" element={<Messagescreen setIsHome={setIsHome}/>} />
          <Route path="/createsermons" element={<AdminRoute><CreateSermonsScreen setIsHome={setIsHome}/></AdminRoute>} />
          <Route path="/sermon/:id" element={<SermonDetail setIsHome={setIsHome}/>} />
          <Route path="/updatesermon/:id" element={<AdminRoute><UpdateSermon setIsHome={setIsHome}/></AdminRoute>} />
          <Route path="/articles" element={<ArticleScreen setIsHome={setIsHome} />} />
          <Route path="/newarticles" element={<AdminRoute><NewAricles setIsHome={setIsHome}/></AdminRoute>} />
          <Route path="/articles/:id" element={<ArticleDetail setIsHome={setIsHome}/>} />
          <Route path="/article/:id" element={<ArticleDetail setIsHome={setIsHome}/>} />
          <Route path="/updatearticle/:id" element={<AdminRoute><UpdateArticle setIsHome={setIsHome}/></AdminRoute>} />
          <Route path="/about" element={<AboutScreen setIsHome={setIsHome}/>} />
          <Route path="/userslist" element={<AdminRoute><UserList setIsHome={setIsHome}/></AdminRoute>} />
          <Route path="/analysis" element={<AdminRoute><Analysis setIsHome={setIsHome}/></AdminRoute>} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/" element={<HomeScreen setIsHome={setIsHome} />} />
          <Route path="/support" element={<Support setIsHome={setIsHome}/>} />
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
