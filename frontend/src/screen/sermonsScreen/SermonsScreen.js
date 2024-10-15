import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'
import htmlReactParcer from 'html-react-parser'
import './SermonScreen.css'
import {getError } from '../../utils'
import { toast } from 'react-toastify'
import { Store } from '../../Store'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, sermons: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};


function SermonsScreen({setIsHome}) {
  setIsHome(false)

 const [{ loading, error, sermons }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
   sermons: [],
  });

 const {state} = useContext(Store)
  const {userInfo} = state
const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/sermons/getAllSermons`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        toast.error(getError(err))
      }
    };
    fetchData();
  }, []);


  return (
    <div>
     <div className="articles sermons only">
      <Helmet>
        <title>SBC-Sermons</title>
      </Helmet>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="articles-detail">

          {sermons.map((sermon) => (
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
      )}
       {
        userInfo?.email === 'Perfecttesfa456@gmail.com'&&
      <Link className='create-btn' to="/createsermons">Create New sermon</Link>
      }
    </div>
    </div>
  )
}

export default SermonsScreen