import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {motion} from 'framer-motion'
// import ReactQuill from 'react-quill';
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

const filters = [
  {id:2, name:'Loveing God', value:'Topical Series'},
  {id:3, name:'Romans', value:'Bible Book Series'},
  {id:4, name:'Holy God', value:'Topical'}
]


function UpdateSermon() {



const [filterName, setFilterName] = useState('')
const [filterManu, setFilterManu] = useState(false)
const [sermonFilter, setSermonFilter] = useState('')
var [sermonTitle, setSermonTitle] = useState('')
var [preacherName, setPreacherName] = useState('')
var [preacherTitle, setPreacherTitle] = useState('')
var [progress, setProgress] = useState(null)
var [imageUrl, setImageUrl] = useState('')
var [isImageLoading, setIsImageLoading] = useState(false)

var [profilePicture, setProfilePicture] = useState('')
var [profilePictureUploadingProgress, setProfilePictureUploadingProgress] = useState('')
var [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false)

var [audioUrl, setAudioUrl] = useState('')
var [audioUrlUploadingProgress, setAudioUrlUploadingProgress] = useState('')
var [isAudioLoading, setIsAudioLoading] = useState(false)
var [formData, setFormData] = useState({})

var [videoUrl, setVideoUrl] = useState('')
const navigate = useNavigate()
 const {id} = useParams()

const sermonData  = {
    title: sermonTitle,
    imageUrl: imageUrl,
    audioUrl: audioUrl,
    profilePicture:profilePicture,
    preacherTitle:preacherTitle,
    preacherName:preacherName,
    category:filterName,
      videoUrl:videoUrl,
    // videoUrl:req.body.videoUrl,
    // overView: req.body.overView,
    // content:req.body.content,
}



 useEffect(()=>{
    const fetchData = async()=>{
        const res = await fetch(`http://localhost:4000/api/sermons/${id}`)
        const data = await res.json()
        // sermonTitle = data.title
      //   preacherName = data.preacherName
      //   preacherTitle = data.preacherTitle
      //  imageUrl = data.imageUrl;
      //  audioUrl = data.audioUrl
       setFormData(data)
        // console.log(data)
    }
    fetchData()
   },[])

  //  console.log(formData)
   
  //   overView: req.body.overView,
  //   content:req.body.content,
  //   category: req.body.category,
const updateFilterButton = (name)=>{
  setFilterManu(false)
  setFilterName(name)
}

// const saveSermon = async(e)=>{
//   e.preventDefault();
//   const {data} = await axios.put(`http://localhost:4000/api/sermons/updateSermon/${formData._id}`, {
//     formData
//   })
//    navigate('/sermons')
//   console.log(data)
// }

const saveSermon= async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/sermons/updateSermon/${formData._id}`,
      { method:"PUT",
      headers:{
        'Content-Type':'application/json',
      },
    body:JSON.stringify(formData)
      }
    );
const data = await res.json()
  navigate('/sermons')
  console.log(data)
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

//////////////////////////////////////////////////

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
///////////////////////////////////////////////


////////////// update audio /////////////////
const handleAudioUrlInput = (e)=>{
   try {
          // if (!audioUrl) {
          //   console.log('Please select an image');
          //   return;
          // }
          // setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = `audio/${Date.now()}-${audioUrl.name}`
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, audioUrl);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setAudioUrlUploadingProgress(progress.toFixed(0));
            },
            (error) => {
              console.log('Image upload failed');
              // setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setAudioUrlUploadingProgress(null);
                // setImageUploadError(null);
                setFormData({ ...formData, audioUrl: downloadURL });
              });
            }
          );
        } catch (err) {
          console.log(err);
        }
}
///////////////////////////////////////////////

  return (
    <div>
    <Helmet>
        <title>{formData.title}</title>
      </Helmet>
  <div>
    <input value={formData?.title} type='text' placeholder='Type sermon title...' onChange={(e) => setFormData({...formData, title:e.target.value})} name='title' id='title'/>
    <input value={formData?.preacherName} id='preacherName' name='preacherName' type='text' placeholder='Type preacher name...'  onChange={(e) => setFormData({...formData, preacherName:e.target.value})}/>
      <input value={formData?.preacherTitle} name='preacherTitle' id='preacherTitle' type='text' placeholder='Type preacher title...'  onChange={(e) => setFormData({...formData, preacherTitle:e.target.value})}/>
       <input name='videoUrl' id='videoUrl' type='text' placeholder='video Url...' value={formData?.videoUrl} onChange={(e)=>setFormData({...formData, videoUrl:e.target.value})}/>
  </div>
  <div>
  <p onClick={()=>setFilterManu(!filterManu)}>{!filterName? 'Categorys':filterName}</p>

    {
      filterManu && <motion.div initial={{opacity: 0, y:50}}
      animate={{opacity:1, y:0}}
      exit={{opacity:0, y:50}}
      >
    {filters.map(data=><p onClick={()=>updateFilterButton(data.name)} key={data.id}>{data.name}</p>)
    }
    </motion.div>
    }

  
<div>
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
              <Button disabled={progress} type='button' onClick={handleImageUrlInput} >update cover image</Button>
              </div>}
        </>
      )}
</div>

  <div>
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
              <Button disabled={profilePictureUploadingProgress} type='button' onClick={handleProfilePictureInput} >update Profile Picture</Button>
              </div>}
              </>
        )}
  </div>
  <div>
          {isAudioLoading && <div>
            <p>{Math.round(audioUrlUploadingProgress) > 0 && <>{`${Math.round(audioUrlUploadingProgress)}%`}</>}</p>
          </div>}
          {!isAudioLoading && (
                  <>
                <input
                id="audioUrl"
                name='audioUrl'
                type="file"
                accept="audio/*"
                onChange={(e) => setAudioUrl(e.target.files[0])}
              />
              {formData.audioUrl &&<div>
               <audio src={formData?.audioUrl} controls/>
              <Button disabled={audioUrlUploadingProgress} type='button' onClick={handleAudioUrlInput} >update Sermon audio image</Button>
              </div>}
        </>

                 
          )}
  </div>

 </div>

  <div>
  {
        isImageLoading || isAudioLoading ? (
        <DisabledButton/>) :(
          <Button onClick={saveSermon} >Save</Button>
        )
  }
  </div>
</div>
  )
}
      


export default UpdateSermon