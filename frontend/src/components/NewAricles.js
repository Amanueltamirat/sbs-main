import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import MessageBox from './MessageBox';
function NewAricles() {
  const navigate = useNavigate();
  // const [title, setTitle] = useState('');
  // const [authorName, setAuthorName] = useState('');
  // const [authorTitle, setAuthorTitle] = useState('');
  const [image, setImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null)
  const [profilePictureUploadProgress, setProfilePictureProgress] = useState(null);
  const [profilePictureUploadError, setPropfilePictureUploadError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
 const [publishError, setPublishError] = useState(null)

const handleProfilePictureInput = async(e)=>{
    try {
      if (!profilePicture) {
        setPropfilePictureUploadError('Please select an image');
        return;
      }
      setPropfilePictureUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + profilePicture.name;
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
const handleSubmit = async (e)=>{
  e.preventDefault()
  try{
    const res = await fetch(`http://localhost:4000/api/articles/newarticles`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
    if(!res.ok){
      setPublishError(data.message)
      return
    }
    if(res.ok){
      setPublishError(null)
      navigate(`/article/${data._id}`);
    }

  }catch(err){
setPublishError('Somthing went wrong')
  }
}
  return (
    <div>
      <h1>New Articles</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="uploadBanner">
          <input
            id="uploadBanner"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          type="button"
          onClick={handleFileInput}
          disabled={imageUploadProgress}
        >
          {imageUploadProgress ? <div>Image Uploading</div> : 'Upload Image'}
        </button>
        {imageUploadError && (
          <MessageBox variant="danger">{imageUploadError}</MessageBox>
        )}
        {formData.image && <img src={formData.image} alt="upload" />}
        <label>Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder='article title ...'
          onChange={(e) => setFormData({...formData, title:e.target.value})}
        />
        <label>Author Name</label>
        <input
          type="text"
          id="authorName"
          name="authorName"
          placeholder="author name..."
          onChange={(e) => setFormData({...formData, authorName:e.target.value})}
        />
 <label>Author Title</label>
        <input
          type="text"
          id="authorTitle"
          name="authorTitle"
          placeholder="author title..."
          onChange={(e) => setFormData({...formData, authorTitle:e.target.value})}
        />
        <ReactQuill theme="snow" 
        onChange={(value)=>{
          setFormData({...formData, content:value})
        }}
        placeholder="write something" />

  <ReactQuill theme="snow" 
        onChange={(value)=>{
          setFormData({...formData, overView:value})
        }}
        placeholder="write over veiw..." />
  <label htmlFor="profilePicture:">
          <input
            id="profilePicture:"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </label>
        <button
          type="button"
          onClick={handleProfilePictureInput}
          disabled={profilePictureUploadProgress}
        >
          {profilePictureUploadProgress ? <div>Image Uploading</div> : 'Upload Image'}
        </button>
        {profilePictureUploadError && (
          <MessageBox variant="danger">{profilePictureUploadError}</MessageBox>
        )}
        {formData.profilePicture && <img src={formData.profilePicture} alt="upload" />}


        <Button type="submit">Submit</Button>
        {publishError && (
          <MessageBox variant="danger">{publishError}</MessageBox>
        )}
      </form>
    </div>
  );
}

export default NewAricles;