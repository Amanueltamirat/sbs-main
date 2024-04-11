import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import htmlReactParcer from 'html-react-parser'
import { Link,useNavigate } from 'react-router-dom';

function Randomarticle() {
const [article, setArticle] = useState()
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

  const navigate = useNavigate();
useEffect(() => {
    async function fetachData() {
    try{
      setLoading(true)
      const {data:{articles}} = await axios.get(`${BASE_URL}/api/articles/getallarticles`);
      console.log(articles)
      setArticle( articles[Math.floor(Math.random() * ( articles.length - 1))
        ]
      );
      setLoading(false)
    } catch(err){
  setError(err)
    }
    }
    fetachData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n) + ". . ." : str;
  }

const readMore = ()=>{
  navigate(`/articles/${article?._id}`)

}

  return (
    <div className='randomarticle'>
    { loading ? <LoadingBox/> : error? <MessageBox variant='danger'>{error}</MessageBox>:
         <>
        <img alt='cover-image' src={article?.image} />
        <div className='absoluteposition'>
            <h1>{article?.title}</h1>
            <div>
           <p> {htmlReactParcer(String(truncate(article?.content,200)))}<button className='link' onClick={readMore}>Read More</button></p>
            </div>
            <p className='author'>Article by {article?.authorName}</p>
            {/* <img alt='pp' src={article?.profilePicture}/> */}
        </div>
        </>
    }
    <div className='shadow'></div>
    </div>
  )
}

export default Randomarticle