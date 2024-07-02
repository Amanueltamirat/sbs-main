import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import { BASE_URL, getError } from '../../utils';
import MessageBox from '../../components/MessageBox';
import htmlReactParcer from 'html-react-parser'
import './ArticleScreen.css'
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import Header from '../../components/Header'
import {motion} from 'framer-motion'


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, articles: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


 const textVariants = {
    hidden: { x: '-10%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  };

function ArticleScreen({setIsHome}) {
setIsHome(false)
  //  const [isHome, setIsHome] = useState(false)
  const [{ loading, error, articles }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    articles: [],
  });
  const navigate = useNavigate();

 const {state} = useContext(Store)
  const {userInfo} = state
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`${BASE_URL}/api/articles`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
     
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      toast.error(getError(err))
      }
    };
    fetchData();
  }, []);


 function truncate(str, n) {
    return str?.length > n ? str.substr(0, n) + '. . .'  : str;
  }

  return (
    <div className="articles only">
      <Helmet>
        <title>SBC-Articles</title>
      </Helmet>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <motion.div
        
         className="articles-detail article-page">
          {/* <Header isHome={isHome}/> */}
          {articles.map((article) => (
            <div
             key={article._id} className="aricle">
            <div className='upper-part'>
              <motion.div onClick={() => navigate(`/articles/${article._id}`)} className='article-img' style={{backgroundImage:`url(${article?.image})`, backgroundRepeat:'no-repeat', backgroundSize:'cover',backgroundPosition: 'center', position:'relative'}}>
                        <motion.div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                  color: '#fff',
                                  fontSize: '24px',
                                  opacity: 0,
                                }}
                                  variants={textVariants}
                                  initial="hidden"
                                   exit="exit"
                                  whileHover="visible"
                                  transition={{ type: 'tween', duration: 0.5 }}
                            // whileHover={{ opacity: 1 }}
                                // initial={{ opacity: 0 }}
                              >
                               {article.title}
              </motion.div>
              </motion.div>
              {/* <motion.img className='article-img'
                src={article?.image}
                alt="aricles"
                onClick={() => navigate(`/articles/${article._id}`)}
              /> */}
              <div className='article-title'>
                {/* <h3>{article.title}</h3> */}
                <p className='created-date'>{article.createdAt.substring(0, 10) }</p>
                
                <p className='readMore' >{htmlReactParcer(String(truncate(article?.content,150)))} <button onClick={()=>navigate(`/articles/${article._id}`)}>Read more</button></p>
                
               </div>
           </div>
                <div className='author-info'>
                    <div className='pp-box'>
                      <img className='profile-picture' 
                      src={article.profilePicture} 
                      alt='profilePicture' />
                    </div>
                    <p className="author-name">{article?.authorName?article.authorName:''}</p>
                </div>
            </div>
          ))}


        </motion.div>
      )}
      {
        userInfo?.email === 'Perfecttesfa456@gmail.com' &&

      <Link className='new-btn' to="/newarticles">Create New Article</Link>
      }
    </div>
  );
}

export default ArticleScreen;
