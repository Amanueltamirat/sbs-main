import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {motion} from 'framer-motion'
import './SermonScreen.css'
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import MessageBox from '../../components/MessageBox';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { BASE_URL, getError } from '../../utils';
import LoadingBox from '../../components/LoadingBox';

function CreateSermonsScreen({setIsHome}) {
  setIsHome(false)

const [filterName, setFilterName] = useState('')
const [sermonTitle, setSermonTitle] = useState('')
var [content, setContent] = useState('')
const [preacherName, setPreacherName] = useState('')
const [preacherTitle, setPreacherTitle] = useState('')
const [progress, setProgess] = useState(null)
const [imageUrl, setImageUrl] = useState('')
const [isImageLoading, setIsImageLoading] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)

const [coverImga,setCoverImage] = useState()
const [coverImageError, setCoverImageError] = useState(null)
const [ppIMage, setPpImage]  = useState()


const [profilePicture, setProfilePicture] = useState('')
const [profilePictureUploadingProgress, setProfilePictureUploadingProgress] = useState(0)
const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false)

const [audioUrl, setAudioUrl] = useState('')
const [audioUrlUploadingProgress, setAudioUrlUploadingProgress] = useState(0)
const [isAudioLoading, setIsAudioLoading] = useState(false)
const [videoUrl, setVideoUrl] = useState('')
const navigate = useNavigate()

const deleteFileObject = (url, isImage)=>{
  if(isImage){
    setIsImageLoading(true)
    setIsAudioLoading(true)
  }
   const storage = getStorage(app);
  const deleteRef = ref(storage, url);
  deleteObject(deleteRef).then(()=>{
    setImageUrl(null)
    // setAudioUrl(null)
    setIsImageLoading(false)
    setIsAudioLoading(false)
  })

}
const sermonData  = {
    title: sermonTitle,
    imageUrl: imageUrl,
    audioUrl: audioUrl,
    profilePicture:profilePicture,
    preacherTitle:preacherTitle,
    preacherName:preacherName,
    category:filterName,
    videoUrl:videoUrl,
    content:content,
    // overView: req.body.overView,
}

const saveSermon = async()=>{
  const {data} = await axios.post(`${BASE_URL}/api/sermons/newSermons`, {
    ...sermonData
  })
  console.log(data)
}


const saveProfilePicture = async()=>{
  try{
  setLoading(true)
   const {data} = await axios.post(`${BASE_URL}/api/sermons/newSermons`, {
    ...sermonData
  })
    saveSermon()
    setLoading(false)
    toast.success('Sermon Created Successfully')
  } catch(err){
    setError(err)
    toast.error(getError(err))
  }
}

  return (
    <div className='create-sermon'>
    <Helmet>
        <title>Create-Sermons</title>
      </Helmet>
      { loading ? <LoadingBox/> :error ? <MessageBox variant='danger'>{error}</MessageBox> : <>
      <h1>Create Sermon</h1>
  <div className='sermon-inputs'>
    <input type='text' placeholder='Insert sermon title...' value={sermonTitle} onChange={(e)=>setSermonTitle(e.target.value)} name='title' id='title'/>
    <input id='preacherName' name='preacherName' type='text' placeholder='Insert preacher name...' value={preacherName} onChange={(e)=>setPreacherName(e.target.value)}/>
      <input name='preacherTitle' id='preacherTitle' type='text' placeholder='Insert preacher title...' value={preacherTitle} onChange={(e)=>setPreacherTitle(e.target.value)}/>
       <input name='videoUrl' id='videoUrl' type='text' placeholder='Insert video Url...' value={videoUrl} onChange={(e)=>setVideoUrl(e.target.value)}/>
         <input name='audioUrl' id='audioUrl' type='text' placeholder='Insert audio Url...' value={audioUrl} onChange={(e)=>setAudioUrl(e.target.value)}/>
  </div>
  <div className='file-uploader'>

        <div> 
      <div>
            {isImageLoading && <div>
              <p>{Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}</p>
            </div>}
            {
             !isImageLoading &&  (
              <>
                  {!imageUrl ?  (<FileUploader coverImga={coverImga} setCoverImage={setCoverImage} setCoverImageError={setCoverImageError}  isImageLoading={isImageLoading} updateState = {setImageUrl} setProgress = {setProgess} isLoading={setIsImageLoading} isImage={true}/>) : <div>
                    <>{
                    coverImageError ? <MessageBox variant='danger'>{coverImageError}</MessageBox>: 
                    <>
                  <img src={imageUrl} alt='image'/>
                  <button type='button' onClick={()=>deleteFileObject(imageUrl, true)} >Delete image</button>
                    </>
                    }
                    </>
                  </div>}
              </>
            )}
      </div>
      </div>

        <div>
        {
              isImageLoading || isAudioLoading && (
              <DisabledButton/>) 
        }
        </div>

<ReactQuill theme="snow" 
        className='react-quill'
        onChange={(value)=>{
          setContent(content = value)
        }}
        placeholder="write article content" />

      <div>

      <div>
              {isProfilePictureLoading && <div>
                <p>{Math.round(profilePictureUploadingProgress) > 0 && <>{`${Math.round(profilePictureUploadingProgress)}%`}</>}</p>
              </div>}
              {!isProfilePictureLoading && (
                    <>
                    {!profilePicture ? (<Profilepicture ppIMage={ppIMage} setPpImage={setPpImage} isProfilePictureLoading={isProfilePictureLoading} updateState = {setProfilePicture} setProgress = {setProfilePictureUploadingProgress} isLoading={setIsProfilePictureLoading} />):<div>
                    <img src={profilePicture} alt='image'/>
                    <button type='button' onClick={()=>deleteFileObject(profilePicture, true)} >Delete image</button>
                    </div>}
                    </>
              )}
        </div>

      <div>
        {
              isProfilePictureLoading ? (
              <DisabledButton/>) :(
                <Button style={{color:'black'}} onClick={()=>{
                  saveProfilePicture()
                  navigate('/sermons')
                  }} >{loading ? 'Saving Sermon':'Create Sermon'}</Button>
              )
        }
        </div>

      </div>

  </div>
  </>
}
</div>
  )
}

export const DisabledButton = ()=>{
  return (
    
<div role="status">
    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

  )
}

export const FileUploader = ({setCoverImageError,setCoverImage,coverImga,isImageLoading,updateState,setProgress, isLoading, isImage })=>{
 

 const uploadFile = async(e)=>{
  try{
     if (!coverImga) {
        setCoverImageError('Please select an image');
        return;
      }
       setCoverImageError(null);
  isLoading(true)
  // `image/${Date.now()}-${coverImga.name}`
  const storage = getStorage(app);
  const storageRef = ref(
    storage, new Date().getTime() + '-' + coverImga.name
  )
const uploadTask = uploadBytesResumable(storageRef, coverImga)

uploadTask.on(
  'state_changed',
  (snapshot)=>{
setProgress((snapshot.bytesTransferred / snapshot.totalBytes)* 100)
  },
  (error)=>{
    console.log(error)
  },
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    updateState(downloadURL);
    isLoading(false)
  })
}
)
 } catch(err){
  setCoverImageError(err)
 }
 }
 
  return (
    <>
  <label className='label'>
      <div>
            <div>
            <strong>Click to upload Cover image</strong>
            </div>
      </div>
      <input
      type='file'
      name='upload-file'
      accept='image/*'
      onChange={(e)=>setCoverImage(e.target.files[0])}
      />
   <Button
       style={{color:'black'}}
          type="button"
          onClick={uploadFile}
          disabled={isImageLoading}
        >
          {isImageLoading ? <div>Cover image Uploading</div> : 'Upload Cover image'}
        </Button>
  </label>
    </>
  )
}
////////// PP ////////////////////

export const Profilepicture = ({ppIMage,setPpImage,isProfilePictureLoading,updateState,setProgress, isLoading})=>{
 
 const uploadFile = (e)=>{
  isLoading(true)
  // const uploadedFile = ppIMage.files[0]
   const fileName = new Date().getTime() + '-' + ppIMage.name;
  const storage = getStorage(app);
  const storageRef = ref(
    storage, fileName
  )
const uploadTask = uploadBytesResumable(storageRef, ppIMage)

uploadTask.on(
  'state_changed',
  (snapshot)=>{
setProgress((snapshot.bytesTransferred / snapshot.totalBytes)* 100)
  },
  (error)=>{
    console.log(error)
  },
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
    updateState(downloadURL);
    isLoading(false)
  })
}
)
 }
 
 
  return (
    <>
  <label className='label'>
      <div>
            <div>
            <strong>Click to upload Profile Picture</strong>
            </div>
      </div>
      <input
      type='file'
      name='upload-file'
      accept='image/*'
      onChange={(e)=>setPpImage(e.target.files[0])}
      />
   <Button
       style={{color:'black'}}
          type="button"
          onClick={uploadFile}
          disabled={isProfilePictureLoading}
        >
          {isProfilePictureLoading? <div>Profile Picture is Uploading</div> : 'Upload Profile Picture'}
        </Button>
  </label>
    </>
  )
}
export default CreateSermonsScreen