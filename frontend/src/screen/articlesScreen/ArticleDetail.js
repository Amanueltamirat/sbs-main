import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import { getError } from '../../utils';
import MessageBox from '../../components/MessageBox';
import htmlReactParcer from 'html-react-parser'
import { Store } from '../../Store';
import Button from 'react-bootstrap/Button';
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
  // const [emails, setEmails] = useState([])
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
          `http://localhost:4000/api/articles/${articleId}`
        );
        // console.log(data);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      };
      fetchData();
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      console.log(err);
    }
  }, [articleId]);

const handleDeleteArticle =async()=>{
setShowModal(false)
  try{
    const res =  await fetch(`http://localhost:4000/api/articles/deleteArticle/${deleteId}`, {
      method:'DELETE'
    })
// window.location.reload()
navigate('/articles')
const data = res.json()
  } catch(err){
console.log(err)
  }

}

useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `http://localhost:4000/api/users`
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
// console.log(allEmaill)

var subject = article.title
var message = `<div style={{maxWidth:300}}  >
<h3>${article.title}</h3>
  <img src=${article.image} alt=${article.title} style={{maxWidth:100}}/>
  <p>${article?.content?article.content:''}</p>
</div>`
const sendMail =  async ()=>{
  try{

const data =  await axios.post(`http://localhost:4000/sendmail`, {

  emails:allEmaill,
  subject,
  message

})

  } catch(err){
    console.log(err)
  }

console.log('sent')
navigate('/articles');

}

  // console.log(article.author.name);
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
          <p>{htmlReactParcer(article?.content?article.content:'')}</p>
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

            {userInfo?.isAdmin && <div className='btns'>
                <Button onClick={()=>navigate(`/updatearticle/${article._id}`)}>Edit Article</Button>
                <Button variant='danger' onClick={()=>{
                  setShowModal(true)
                  setDeleteId(article._id)
                }}>Delete Article</Button>
                </div>}
                {showModal && <div>
                  <h3>Are you sure you want to delete this acount?</h3>
                <div className='flex justify-center btns'>
                  <Button className='' variant='danger' onClick={handleDeleteArticle}>Yes, I'm sure</Button>
                  <Button onClick={()=>setShowModal(false)}>No, cancel</Button>
                </div>
              </div>}
              {
                userInfo?.isAdmin &&
              <Button onClick={sendMail} className='email-btn' > Send Article To Users</Button>
              }
        </div>
      )}
      {
        userInfo?.isAdmin &&

      <Link className='new-btn' to="/newarticles">Create New Article</Link>
      }
    </div>
  );
}

export default ArticleDetail;
