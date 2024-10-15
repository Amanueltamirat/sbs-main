import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import  {getError } from '../../utils'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../LoadingBox'
import htmlReactParcer from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import './Homepage.css';
import {motion, useAnimation, useInView} from 'framer-motion';


function Homepage() {
const [lastMonthArticles, setLastMonthArticles] = useState()
const [lastMonthSermons, setLastMonthSermons] = useState()
const [totalArticles, setTotalArticles] = useState()
const [totalSermons, setTotalSermons] = useState()
const [ArticlesLoading, setArticlesLoading] = useState(false)
const [sermonsLoading, setSermonsLoading] = useState(false)
const [error, setError] = useState(null)

const ref = useRef(null)
const navigate = useNavigate()

    useEffect(()=>{
const allArticles = async()=>{
    try{
        setArticlesLoading(true)
    const {data} = await axios.get(`/api/articles/getallarticles`);
    setArticlesLoading(false)
    if(data.lastMonthArticles < 3 ){
      setLastMonthArticles(data.articleList)
    } else{
    setLastMonthArticles(data.lastMonthArticlesList)
    }
    setTotalArticles(data.lastMonthArticles)
    } catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
const allSermons = async()=>{
    try{
    setSermonsLoading(true)
    const {data} = await axios.get(`/api/sermons/allsermons`);
      setSermonsLoading(false);
       console.log(data)
      if(data.lastMonthSermons < 3){
        setLastMonthSermons(data.sermonList);
      } else{
      setLastMonthSermons(data.lastMonthSermonsList);
      }
      setTotalSermons(data.lastMonthSermons)
    }catch(err){
        toast.error(getError(err))
        setError(err)
    }
}
allArticles();
allSermons();

},[])

// const totalArticlesAndSermons = Number(totalArticles) + Number(totalSermons)

// let ranNum = []

// for (let i = 0; i < totalArticlesAndSermons; i++) {
// const randomNumber = Math.floor(Math.random()*2 + 1)
//    ranNum.push(randomNumber)
// }

 function truncate(str, n) {
    return str?.length > n ? str.substr(0, n) + ". . ." : str;
  }

  return (
 <div className="articles home-article">
      <Helmet>
        <title>SBC</title>
      </Helmet>

      {ArticlesLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
    <div ref={ref} className='homepage-data'>
       <div className='recent-articles'>
            <h2>Recent Articles</h2>
          </div>
          {ArticlesLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div  style={{position:'relative'}}   className="articles-detail">
          {lastMonthArticles?.map((article) => (
            <motion.div 
            variants={{
              hidden:{opacity:0, y:75 },
              visible:{opacity:1,y:0 }
        }}
            initial='hidden'  
            whileInView='visible'
            viewport={{once:true}} 
         transition={{duration:0.5, delay:0.15}} 
         key={article._id} className="aricle">
              <div  className='upper-part'>
                <img className='article-img'
                  src={article.image}
                  alt="aricles"
                  onClick={() => navigate(`/articles/${article._id}`)}
                />
                <div className='article-title'>
                  <h3>{article.title}</h3>
                  <p className='created-date'>{article.createdAt.substring(0, 10) }</p>
                  <p className='readMore' >{htmlReactParcer(String(truncate(article?.content,100)))}<button onClick={()=>navigate(`/articles/${article._id}`)}>Read more</button></p>
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
            </motion.div>
          ))}
        </div>
      )}
          <div className='recent-sermons'>
            <h2>Recent Sermons</h2>
          </div>
          {sermonsLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <div className='sermons home-article'>
           {lastMonthSermons?.map((sermon) => (
            <motion.div
              variants={{
              hidden:{opacity:0, y:75 },
              visible:{opacity:1,y:0 }
        }}
            initial='hidden'  
            whileInView='visible'
            viewport={{once:true}}
        //  animate ={mainControls}  
         transition={{duration:0.5, delay:0.25}} 
             key={sermon._id} className="aricle">
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
            </motion.div>
          ))}
     </div>
      )}
  </div>
      )}
    </div>
  )
}

export default Homepage