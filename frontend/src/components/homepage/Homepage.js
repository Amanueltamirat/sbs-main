import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL, getError } from '../../utils'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../LoadingBox'
import htmlReactParcer from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import './Homepage.css'
function Homepage() {
const [lastMonthArticles, setLastMonthArticles] = useState()
const [lastMonthSermons, setLastMonthSermons] = useState()
const [totalArticles, setTotalArticles] = useState()
const [totalSermons, setTotalSermons] = useState()
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [randomNumber, setRandomNumber] = useState()

const navigate = useNavigate()


    useEffect(()=>{
const allArticles = async()=>{
    try{
        setLoading(true)
    const {data} = await axios.get(`${BASE_URL}/api/articles/getallarticles`);
    setLoading(false)
    setLastMonthArticles(data.lastMonthArticlesList)
    setTotalArticles(data.lastMonthArticles)
    } catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
const allSermons = async()=>{
    try{
    setLoading(true)
    const {data} = await axios.get(`${BASE_URL}/api/sermons/allsermons`);
      setLoading(false);
      setLastMonthSermons(data.lastMonthSermonsList);
      setTotalSermons(data.lastMonthSermons)
    }catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
allArticles();
allSermons();

},[])
const totalArticlesAndSermons = Number(totalArticles) + Number(totalSermons)

let ranNum = []

for (let i = 0; i < totalArticlesAndSermons; i++) {
const randomNumber = Math.floor(Math.random()*2 + 1)
   ranNum.push(randomNumber)
}

console.log(ranNum)

  return (
 <div className="articles home-article">
      <Helmet>
        <title>SBC</title>
      </Helmet>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
    <div className='homepage-data'>
       <div className='recent-articles'>
            <h2>Recent Articles</h2>
          </div>
        <div className="articles-detail">
          {lastMonthArticles?.map((article) => (
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
          <div className='recent-sermons'>
            <h2>Recent Sermons</h2>
          </div>
          <div className='sermons'>
           {lastMonthSermons?.map((sermon) => (
            <div key={sermon._id} className="aricle">
            <div className='upper-part'>
              <img className='article-img'
                src={sermon.imageUrl}
                alt="sermon"
                onClick={() => navigate(`/sermon/${sermon._id}`)}
              />
              <div className='article-title'>
                <h3>{sermon.title}</h3>
                <p className='created-date'>{sermon.createdAt.substring(0, 10) }</p>
                <p>{htmlReactParcer(sermon?.overView?sermon.overView:'')}</p>
               </div>
           </div>
                <div className='author-info'>
                <div className='pp-box'>
                <img className='profile-picture' 
                src={sermon?.profilePicture?sermon?.profilePicture:''} 
                alt='profilePicture' />
                </div>
                <p className="author-name">{sermon?.preacherName?sermon.preacherName:''}</p>
                </div>
            </div>
          ))}
     </div>
  </div>
      )}
    </div>
  )
}

export default Homepage