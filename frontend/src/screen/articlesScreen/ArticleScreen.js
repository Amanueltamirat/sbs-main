import React, { useContext, useEffect, useReducer } from 'react';
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

function ArticleScreen() {
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

 const countWords = (inputText) => {
    // const wordsArray = inputText.trim().split(/\s+/);
     const wordsArray = inputText.trim().toLowerCase().replace(/[>]/g,' ').split(' ').join(' ')
    return wordsArray.length > 50 ?wordsArray.slice(2,50)+ '</p>':wordsArray;
  };


  return (
    <div className="articles">
      <Helmet>
        <title>SBC-Articles</title>
      </Helmet>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="articles-detail article-page">
          {articles.map((article) => (
            <div key={article._id} className="aricle">
            <div className='upper-part'>
              <img className='article-img'
                src={article?.image}
                alt="aricles"
                onClick={() => navigate(`/articles/${article._id}`)}
              />
              <div className='article-title'>
                <h3>{article.title}</h3>
                <p className='created-date'>{article.createdAt.substring(0, 10) }</p>
                
                <p className='article_overview' >{htmlReactParcer(String(article?.overView? countWords(article.overView):countWords(article.content)))}. . . <button onClick={()=>navigate(`/articles/${article._id}`)}>Read more</button></p>
                {/* <p>{htmlReactParcer(String(article?.overView?article.overView:article.content))}</p> */}
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


        </div>
      )}
      {
        userInfo.email === 'Perfecttesfa456@gmail.com' &&

      <Link className='new-btn' to="/newarticles">Create New Article</Link>
      }
    </div>
  );
}

export default ArticleScreen;
