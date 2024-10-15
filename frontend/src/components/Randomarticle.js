import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import htmlReactParcer from 'html-react-parser'
import { Link,useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';
const variants = {
    initial:{
        x:-500,
        y:100,
        opacity:0
    },
     animate:{
        x:0,
        y:0,
        opacity:1,
        transition:{
            duration:1,
            staggerChildren:0.1
        }
    }
}

const textVariants = {
    initial:{
        x:-500,
        opacity:0
    },
     animate:{
        x:0,
        opacity:1,
        transition:{
        duration:1.5,
        staggerChildren:0.1
        },

    },
    scrollButton:{
     opacity:0,
     y:10,
    transition:{
       duration:2,
       repeat:Infinity
     }
}

}


function Randomarticle() {
const [article, setArticle] = useState()
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

  const navigate = useNavigate();
useEffect(() => {
    async function fetachData() {
    try{
      setLoading(true)
      const {data:{articles}} = await axios.get(`/api/articles/getallarticles`);
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
    <motion.div  variants={textVariants} initial='initial' animate='animate' className='randomarticle'>
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
    </motion.div>
  )
}

export default Randomarticle