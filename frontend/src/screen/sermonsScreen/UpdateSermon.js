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
import { app } from '../../firebase';
import MessageBox from '../../components/MessageBox';

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
var [progress, setProgess] = useState(null)
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
       setFormData(data)
        // console.log(data)
    }
    fetchData()
   },[id])
   
   console.log(formData)

  //   overView: req.body.overView,
  //   content:req.body.content,
  //   category: req.body.category,
const updateFilterButton = (name)=>{
  setFilterManu(false)
  setFilterName(name)
}

const deleteFileObject = (url, isImage)=>{
  if(isImage){
    setIsImageLoading(true)
    setIsAudioLoading(true)
  }
   const storage = getStorage(app);
  const deleteRef = ref(storage, url);
  deleteObject(deleteRef).then(()=>{
    setImageUrl(null)
    setAudioUrl(null)
    setIsImageLoading(false)
    setIsAudioLoading(false)
  })

}


const saveSermon = async()=>{
  const {data} = await axios.put(`http://localhost:4000/api/sermons/updateSermon/${formData._id}`, {
    formData
  })
   navigate('/sermons')
  console.log(data)
}




  return (
    <div>
    <Helmet>
        <title>SBC-Sermons</title>
      </Helmet>
  {/* < motion.div>
    <input type='text' placeholder='seach sermon' value={sermonFilter} onChange={(e)   =>setSermonFilter(e.target.value)}/>
 </ motion.div> */}
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
            {!formData.imageUrl ? (<FileUploader updateState = {setImageUrl} setProgress = {setProgess} isLoading={setIsImageLoading} isImage={true}/>):<div>
            <img src={formData?.imageUrl} alt='img' name='imageUrl' id ='imageUrl'/>
            <button type='button' onClick={()=>deleteFileObject(imageUrl, true)} >Delete image</button>
            </div>}
        </>
      )}
</div>

  <div>
        {isProfilePictureLoading && <div>
          <p>{Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}</p>
        </div>}
        {!isProfilePictureLoading && (
              <>
              {!formData.profilePicture ? (<FileUploader updateState = {setProfilePicture} setProgress = {setProgess} isLoading={setIsProfilePictureLoading} isImage={true}/>):<div>
              <img src={formData?.profilePicture} alt='img' id ='profilePicture' name='profilePicture'/>
              <button type='button' onClick={()=>deleteFileObject(profilePicture, true)} >Delete image</button>
              </div>}
              </>
        )}
  </div>
  <div>
          {isAudioLoading && <div>
            <p>{Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}</p>
          </div>}
          {!isAudioLoading && (
                  <>
                  {!formData.audioUrl? (<FileUploader updateState = {setAudioUrl} setProgress = {setProgess} isLoading={setIsAudioLoading} isImage={false}/>):
                  <div>
                    <audio src={formData?.audioUrl} controls name='audioUrl' id ='audioUrl' />
                  <button type='button' onClick={()=>deleteFileObject(profilePicture, true)} >Delete image</button>
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

export const FileUploader = ({updateState,setProgress, isLoading, isImage })=>{
 
 const uploadFile = (e)=>{
  isLoading(true)
  const uploadedFile = e.target.files[0]
  const storage = getStorage(app);
  const storageRef = ref(
    storage, `${isImage ? "image":"audio"}/${Date.now()}-${uploadedFile.name}`
  )
const uploadTask = uploadBytesResumable(storageRef, uploadedFile)

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
  <label>
      <div>
            <div>
            <p>Click to upload {isImage ? 'an image':'an audio'}</p>
            </div>
      </div>
      <input
      type='file'
      name='upload-file'
      accept={`${isImage ? 'image/*':'audio/*'}`}
      onChange={uploadFile}
      />
  </label>
  )
}
export default UpdateSermon