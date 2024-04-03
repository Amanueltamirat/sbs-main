import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import { BASE_URL, getError } from '../../utils';
import MessageBox from '../../components/MessageBox';
import htmlReactParcer from 'html-react-parser'
import { Store } from '../../Store';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import './ArticleScreen.css'
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, article: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function ArticleDetail() {
  const [{ article, error, loading }, dispatch] = useReducer(reducer, {
    article: [],
    error: '',
    loading: false,
  });

  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [userlist, setUserlist] = useState([])
  const {state} = useContext(Store)
  const {userInfo} = state
  const navigate = useNavigate()
  const params = useParams();
  const { id: articleId } = params;
  useEffect(() => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const fetchData = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/api/articles/${articleId}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      };
      fetchData();
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      toast.error(getError(err))
    }
  }, [articleId]);

const handleDeleteArticle =async()=>{
setShowModal(false)
  try{
    const res =  await fetch(`${BASE_URL}/api/articles/deleteArticle/${deleteId}`, {
      method:'DELETE'
    })
navigate('/articles')
const data = res.json()
  } catch(err){
toast.error(getError(err))
  }

}

useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `${BASE_URL}/api/users`
        );
        setUserlist(data)
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

let allEmaill = []

userlist.map((user)=>{
  allEmaill.push(user.email)
})

var subject = article.title
var message = `<div style=${{maxWidth:400}}  >
<h3>${article.title}</h3>
  <img src=${article.image} alt=${article.title} style={{maxWidth:200px}}/>
  <p>${article?.content?article.content:''}</p>
  <a href='http://localhost:3000/articles/${article._id}'>Read More</a>
</div>`
const sendMail =  async ()=>{
  try{
setSendingEmail(true)
const data =  await axios.post(`${BASE_URL}/sendmail`, {
  emails:allEmaill,
  subject,
  message
})
/setSendingEmail(false)
 toast.success('Email Sent')
  } catch(err){
     toast.error(getError(err))
  }
navigate('/articles');

}

  return (
    <div className="article-detail">
      <Helmet>
        <title>{article.title}</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="article">
          <h2>{article.title}</h2>
          <img src={article.image} alt={article.title}  />
          <p className='article-content'>{htmlReactParcer(article?.content?article.content:'')}</p>
          <div className='author-profile'>
          <div>
           <img className='profile-picture' 
                src={article.profilePicture} 
                alt='profilePicture' />
          </div>
          <div className='author-name-title'>
          <p className='name'>
            {article?.authorName? article.authorName:''}
          </p>
          <p className='title'>{article?.authorTitle?article.authorTitle:''}</p>
          </div>
          </div>
          <p>{article?.createdAt?.substring(0, 10) }</p>

            {userInfo.email === 'Perfecttesfa456@gmail.com' && <div className='btns'>
                <Button style={{color:'black'}} onClick={()=>navigate(`/updatearticle/${article._id}`)}>Edit Article</Button>
                <Button style={{color:'black'}} variant='danger' onClick={()=>{
                  setShowModal(true)
                  setDeleteId(article._id)
                }}>Delete Article</Button>
                </div>}
                {showModal &&
                <div className='delete-btn'>
                 <div>
                  <h3>Are you sure you want to delete this acount?</h3>
                <div className='flex justify-center btns'>
                  <Button  className='' variant='danger' onClick={handleDeleteArticle}>Yes, I'm sure</Button>
                  <Button  onClick={()=>setShowModal(false)}>No, cancel</Button>
                </div>
              </div>
              </div>
              }
              {
                userInfo.email === 'Perfecttesfa456@gmail.com' &&
              <Button style={{color:'black'}} onClick={sendMail}  disabled={sendingEmail} className='email-btn' >{sendingEmail ? 'Seinding':'Send Article To Users'}</Button>
              }
        </div>
      )}
    </div>
  );
}

export default ArticleDetail;
