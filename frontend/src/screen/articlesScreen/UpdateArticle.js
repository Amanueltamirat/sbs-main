import React,{ useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import './UpdateArticle.css'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase'
import MessageBox from '../../components/MessageBox';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { BASE_URL, getError } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
const UpdateArticle = ()=> {
     const navigate = useNavigate();
      const [profilePicture, setProfilePicture] = useState(null)
     const [profilePictureUploadProgress, setProfilePictureProgress] = useState(null);
     const [profilePictureUploadError, setPropfilePictureUploadError] = useState(null);
      const [image, setImage] = useState(null);
      const [imageUploadProgress, setImageUploadProgress] = useState(null);
      const [imageUploadError, setImageUploadError] = useState(null);
      const [formData, setFormData] = useState({});
      const [loading, setLoding] = useState(false);
      const [error, setError] = useState(null)
     const [publishError, setPublishError] = useState(null)
     const {id} = useParams()

   useEffect(()=>{
    const fetchData = async()=>{
        const res = await fetch(`${BASE_URL}/api/articles/getArticle/${id}`)
        const data = await res.json()
        setFormData(data)
    }
    fetchData()
   },[])

   const handleUpdate= async (e) => {
    e.preventDefault();
    try{
   setLoding(true)
    const res = await fetch(
      `${BASE_URL}/api/articles/updateArticle/${formData._id}`,
      { method:"PUT",
      headers:{
        'Content-Type':'application/json',
      },
    body:JSON.stringify(formData)
      }
    );
    const data = await res.json()
    setFormData(data)
    setLoding(false)
    toast.success('Article Updated Successfully')
    navigate(`/articles/${formData._id}`);
    } catch(err){
     toast.error(getError(err))
     setError(err)
    }
  };


const handleProfilePictureInput = async(e)=>{
    try {
      if (!profilePicture) {
        setPropfilePictureUploadError('Please select an image');
        return;
      }
      setPropfilePictureUploadError(null);
      const storage = getStorage(app);
      const fileName = `image/${Date.now()}-${profilePicture.name}`
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, profilePicture);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProfilePictureProgress(progress.toFixed(0));
        },
        (error) => {
          setPropfilePictureUploadError('Image upload failed');
          setProfilePictureProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfilePictureProgress(null);
            setPropfilePictureUploadError(null);
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        }
      );
    } catch (err) {
      setPropfilePictureUploadError('Image upload failed');
      setProfilePictureProgress(null);
      console.log(err);
    }
}



      const handleFileInput = async (e) => {
        try {
          if (!image) {
            setImageUploadError('Please select an image');
            return;
          }
          setImageUploadError(null);
          const storage = getStorage(app);
          const fileName = new Date().getTime() + '-' + image.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, image);
    
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
              setImageUploadError('Image upload failed');
              setImageUploadProgress(null);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({ ...formData, image: downloadURL });
              });
            }
          );
        } catch (err) {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
          console.log(err);
        }
      };
  
      return (
        <div className='new-article' >
            <Helmet>
                <title>
                    Update-Article
                </title>
            </Helmet>
          <h1>Update Article</h1>
          { loading ? <LoadingBox/> :error ? <MessageBox variant='danger'>{error}</MessageBox>:
          <form onSubmit={handleUpdate}>
          <div className='img-info'>
            <label htmlFor="uploadBanner">
              <input
                id="image"
                name='image'
                type="file"
                accept="image/*"
                
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
           
            {imageUploadError && (
              <MessageBox variant="danger">{imageUploadError}</MessageBox>
            )}
            {formData.image && <img src={formData.image} alt="upload" />}
             <Button
             style={{color:'black', padding:'10px'}}
              type="button"
              onClick={handleFileInput}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? <div>Image Uploading</div> : 'Upload Image'}
            </Button>
          </div>

          <div className='author-info'>

          <div>
          <label>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title:e.target.value})}
            />
          </div>
            <div>
            <label>Author</label>
            <input
            value={formData?.authorName? formData.authorName:''}
              type="text"
              id="authorName"
              name="authorName"
              
              placeholder="author name..."
              onChange={(e) => setFormData({...formData, authorName:e.target.value})}
            />
            </div>
           <div>
            <input
            value={formData?.authorTitle? formData.authorTitle:''}
              type="text"
              id="authorTitle"
              name="authorTitle"
              placeholder="author title..."
              onChange={(e) => setFormData({...formData, authorTitle:e.target.value})}
            />
           </div>
          </div>
            <ReactQuill theme="snow" 
             className='react-quill'
            value={formData.content}
            onChange={(value)=>{
              setFormData({...formData, content:value})
            }}
            placeholder="Update article content" />

 <ReactQuill theme="snow" 
  className='react-quill'
 value={formData.overView}
        onChange={(value)=>{
          setFormData({...formData, overView:value})
        }}
        placeholder="Update article over veiw..." />
    <div className='img-info'>
          <label htmlFor="profilePicture:">
          <input
            id="profilePicture:"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </label>
       
        {profilePictureUploadError && (
          <MessageBox variant="danger">{profilePictureUploadError}</MessageBox>
        )}
        {formData.profilePicture && <img src={formData.profilePicture} alt="upload" />}
     <Button
     style={{color:'black', padding:'10px'}}
          type="button"
          onClick={handleProfilePictureInput}
          disabled={profilePictureUploadProgress}
        >
          {profilePictureUploadProgress ? <div>Image Uploading</div> : 'Upload Image'}
        </Button>
    </div>
            <Button style={{color:'black'}} type="submit">{loading ? 'Updating':'Update Article'}</Button>
            {publishError && (
              <MessageBox variant="danger">{publishError}</MessageBox>
            )}

          </form>
}
        </div>
      );
    }


export default UpdateArticle