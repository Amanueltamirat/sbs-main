import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import MessageBox from './MessageBox';
import { prototype } from 'react-quill';
import DisabledButton from './DisabledButton';
import { toast } from 'react-toastify';
import { BASE_URL, getError } from '../utils';
import LoadingBox from './LoadingBox';

function UpdateSermon() {

const [loading, setLoading] = useState(false);
const [error, setError] = useState(null)
var [progress, setProgress] = useState(null)
var [imageUrl, setImageUrl] = useState('')
var [isImageLoading, setIsImageLoading] = useState(false)
var [profilePicture, setProfilePicture] = useState('')
var [profilePictureUploadingProgress, setProfilePictureUploadingProgress] = useState('')
var [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false)


var [isAudioLoading, setIsAudioLoading] = useState(false)
var [formData, setFormData] = useState({})
const navigate = useNavigate()
 const {id} = useParams()

 useEffect(()=>{
    const fetchData = async()=>{
        const res = await fetch(`${BASE_URL}/api/sermons/${id}`)
        const data = await res.json()
       setFormData(data)
    }
    fetchData()
   },[])

const saveSermon= async (e) => {
    e.preventDefault();
    try{
   setLoading(true)
    const res = await fetch(
      `${BASE_URL}/api/sermons/updateSermon/${formData._id}`,
      { method:"PUT",
      headers:{
        'Content-Type':'application/json',
      },
    body:JSON.stringify(formData)
      }
    );
const data = await res.json()
setLoading(false)
toast.success('Sermon Updated Successfully')
  navigate('/sermons')
    } catch(err){
setError(err)
toast.error(getError(err))
    }
}

////////////////////Profile Picture////////////////////////////////
const handleProfilePictureInput = async (e) => {
        try {
          // if (!profilePicture) {
          //   console.log('Please select an image');
          //   return;
          // }
          // setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = `image/${Date.now()}-${profilePicture.name}`
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, profilePicture);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProfilePictureUploadingProgress(progress.toFixed(0));
            },
            (error) => {
              console.log('Image upload failed');
              // setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setProfilePictureUploadingProgress(null);
                // setImageUploadError(null);
                setFormData({ ...formData, profilePicture: downloadURL });
              });
            }
          );
        } catch (err) {
          // setImageUploadError('Image upload failed');
          // setImageUploadProgress(null);
          console.log(err);
        }
      };

///////////// cover image////////////////////////
const handleImageUrlInput = (e)=>{
   try {
          // if (!imageUrl) {
          //   console.log('Please select an image');
          //   return;
          // }
          // setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = `image/${Date.now()}-${imageUrl.name}`
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, imageUrl);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress.toFixed(0));
            },
            (error) => {
              console.log('Image upload failed');
              // setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setProgress(null);
                // setImageUploadError(null);
                setFormData({ ...formData, imageUrl: downloadURL });
              });
            }
          );
        } catch (err) {
          console.log(err);
        }
}
  return (
    <div className='update-sermon'>
    <Helmet>
        <title>Update-Sermon</title>
      </Helmet>
      { loading ? <LoadingBox/> : error ? <MessageBox variant='danger'>{error}</MessageBox> : <>
  <div className='input-data'>
    <input value={formData?.title} type='text' placeholder='Type sermon title...' onChange={(e) => setFormData({...formData, title:e.target.value})} name='title' id='title'/>
    <input value={formData?.preacherName} id='preacherName' name='preacherName' type='text' placeholder='Type preacher name...'  onChange={(e) => setFormData({...formData, preacherName:e.target.value})}/>
      <input value={formData?.preacherTitle} name='preacherTitle' id='preacherTitle' type='text' placeholder='Type preacher title...'  onChange={(e) => setFormData({...formData, preacherTitle:e.target.value})}/>
       <input name='videoUrl' id='videoUrl' type='text' placeholder='video Url...' value={formData?.videoUrl} onChange={(e)=>setFormData({...formData, videoUrl:e.target.value})}/>
       <input name='audioUrl' id='audioUrl' type='text' placeholder='audio Url...' value={formData?.audioUrl} onChange={(e)=>setFormData({...formData, audioUrl:e.target.value})}/>
  </div>
  <div>
  
    <div className='sermon-img'>
      {isImageLoading && <div>
        <p>{Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}</p>
      </div>}
      {!isImageLoading && (
        <>
                <input
                id="imageUrl"
                name='imageUrl'
                type="file"
                accept="image/*"
                
                onChange={(e) => setImageUrl(e.target.files[0])}
              />
              {<div>
              <img src={formData?.imageUrl} alt='img'/>
              <Button style={{color:'black'}} className='sermon-btn' disabled={progress} type='button' onClick={handleImageUrlInput} >update cover image</Button>
              </div>}
                </>
              )}
        </div>

          <div className='profile-pic'>
                {isProfilePictureLoading && <div>
                  <p>{Math.round(profilePictureUploadingProgress) > 0 && <>{`${Math.round(profilePictureUploadingProgress)}%`}</>}</p>
                </div>}
                {!isProfilePictureLoading && (
                      <>
                        <input
                        id="profilePicture"
                        name='profilePicture'
                        type="file"
                        accept="image/*"
                        
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                      />
                      {<div>
                      <img src={formData?.profilePicture} alt='img'/>
                      <Button style={{color:'black'}} disabled={profilePictureUploadingProgress} type='button' onClick={handleProfilePictureInput} >update Profile Picture</Button>
                      </div>}
                      </>
                )}
          </div>

 </div>

  <div>
  {
        isImageLoading || isAudioLoading ? (
        <DisabledButton/>) :(
          <Button style={{color:'black'}} className='save-btn' onClick={saveSermon} >{loading ? 'Updating Sermon':'Update Sermon'}</Button>
        )
  }
  </div>
      </>}
</div>
  )
}
      


export default UpdateSermon