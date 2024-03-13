import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './SermonScreen.css'
import ReactPlayer from 'react-player'
import Button from 'react-bootstrap/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Store } from '../../Store';
import { getError } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, sermon: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

function SermonDetail() {
  const [{ sermon, error, loading }, dispatch] = useReducer(reducer, {
    sermon: [],
    error: '',
    loading: false,
  });

  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [videoOpen, setVideoOpen] = useState(false)

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
          `http://localhost:4000/api/sermons/${articleId}`
        );
    
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
         
      };
      fetchData();
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      console.log(err);
    }
  }, [articleId]);

const handleDeleteSermon =async()=>{

console.log('hello')

setShowModal(false)
  try{
    const res =  await fetch(`http://localhost:4000/api/sermons/deleteSermon/${deleteId}`, {
      method:'DELETE'
    })
// window.location.reload()
navigate('/sermons')
const data = res.json()
  } catch(err){
console.log(err)
  }

}
console.log(sermon.audioUrl)
  return (
    <div className='sermon-detail'>
      <Helmet>
        <title>{sermon.title}</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <div className="">
        <div  className='audio-content'>
          <div className='audio'>
        <a  target='_blank' href={`${sermon.audioUrl}`}>Listen Audio</a>
     <Link  className='video-link' hrefLang='video' onClick={()=>setVideoOpen(!videoOpen)} >{videoOpen ? 'Close Video' :'Watch Video' }</Link>
          </div>
   {videoOpen &&  <div className='youtube-video' id='video'>
     <ReactPlayer controls={true} className='youtube' url={sermon.videoUrl} />
    </div>}
        </div>
        <div className='sermon-content' >
          <h2>{sermon.title}</h2>
          <p>{sermon?.createdAt?.substring(0, 10) }</p>

            {userInfo?.isAdmin && <div className='btns'>
                <Button onClick={()=>navigate(`/updatesermon/${sermon._id}`)}>Edit sermon</Button>
                <Button variant='danger' onClick={()=>{
                  setShowModal(true)
                  setDeleteId(sermon._id)
                }}>Delete Sermon</Button>
                </div>}
                {showModal && 
            <div className='delete-btn'>
              <div>
                  <h3>Are you sure you want to delete this sermon?</h3>
                <div className='flex justify-center btns'>
                  <Button className='' variant='danger' onClick={handleDeleteSermon}>Yes, I'm sure</Button>
                  <Button onClick={()=>setShowModal(false)}>No, cancel</Button>
                </div>

              </div>

            </div>}
          </div>
        </div>
      )}
      {
        userInfo?.isAdmin &&
      <Link className='create-btn' to="/createsermons">Create New sermon</Link>
      }
    </div>
  );
}

export default SermonDetail;
