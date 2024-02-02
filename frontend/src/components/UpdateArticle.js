import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase'
import MessageBox from '../components/MessageBox';
import { Helmet } from 'react-helmet-async';
const UpdateArticle = ()=> {
     const navigate = useNavigate();
      const [title, setTitle] = useState('');
      const [authorName, setAuthorName] = useState('');
      const [authorTitle, setAuthorTitle] = useState('');
      const [image, setImage] = useState(null);
      const [imageUploadProgress, setImageUploadProgress] = useState(null);
      const [imageUploadError, setImageUploadError] = useState(null);
      const [formData, setFormData] = useState({});
     const [publishError, setPublishError] = useState(null)
     const {id} = useParams()

     

   useEffect(()=>{
    const fetchData = async()=>{
        const res = await fetch(`http://localhost:4000/api/articles/getArticle/${id}`)
        const data = await res.json()
        // console.log(data)
        setFormData(data)
        // console.log(formData)
    }
    fetchData()
   },[])

   const handleUpdate= async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:4000/api/articles/updateArticle/${formData._id}`,
      { method:"PUT",
      headers:{
        'Content-Type':'application/json',
      },
    body:JSON.stringify(formData)
      }
    );
    const data = await res.json()
    console.log(data)
    setFormData(data)
    console.log(formData)
    navigate('/articles');
  };

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
        <div>
            <Helmet>
                <title>
                    Update-Article
                </title>
            </Helmet>
          <h1>Update Article</h1>
          <form onSubmit={handleUpdate}>
            <label htmlFor="uploadBanner">
              <input
                id="image"
                name='image'
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
              value={formData.title}
              onChange={(e) => setFormData({...formData, title:e.target.value})}
            />
            <label>Author</label>
            <input
            value={formData.author?.authorName? formData.author.authorName:''}
              type="text"
              id="authorName"
              name="authorName"
              
              placeholder="author name..."
              onChange={(e) => setFormData({...formData, authorName:e.target.value})}
            />
    
            <input
            value={formData.author?.authorTitle? formData.author.authorTitle:''}
              type="text"
              id="authorTitle"
              name="authorTitle"
              placeholder="author title..."
              onChange={(e) => setFormData({...formData, authorTitle:e.target.value})}
            />
            <ReactQuill theme="snow" 
            value={formData.content}
            onChange={(value)=>{
              setFormData({...formData, content:value})
            }}
            placeholder="write something" />
            <Button type="submit">Update</Button>
            {publishError && (
              <MessageBox variant="danger">{publishError}</MessageBox>
            )}

          </form>
        </div>
      );
    }


export default UpdateArticle