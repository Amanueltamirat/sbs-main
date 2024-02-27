import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../../components/LoadingBox';
import { getError } from '../../utils';
import MessageBox from '../../components/MessageBox';
import htmlReactParcer from 'html-react-parser'
import './ArticleScreen.css'



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

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`http://localhost:4000/api/articles`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
     
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        console.log(err);
      }
    };
    fetchData();
  }, []);
console.log(articles)
  return (
    <div className="articles home-article">
      <Helmet>
        <title>SBC-Articles</title>
      </Helmet>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="articles-detail">
          {articles.map((article) => (
            <div key={article._id} className="aricle">
            <div className='upper-part'>
              <img className='article-img'
                src={article.image}
                alt="aricles"
                onClick={() => navigate(`/articles/${article._id}`)}
              />
              <div className='article-title'>
                <h3>{article.title}</h3>
                <p className='created-date'>{article.createdAt.substring(0, 10) }</p>
                <p>{htmlReactParcer(article?.overView?article.overView:article.content)}</p>
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
    </div>
  );
}

export default ArticleScreen;
