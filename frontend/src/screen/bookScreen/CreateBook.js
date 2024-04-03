// import { Button } from '@mui/material'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Book.css'
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { BASE_URL, getError } from '../../utils';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

function CreateBook() {
const [file, setFile] = useState('')
const [coverImage, setCoverImage] = useState('')
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [overView, setOverView] = useState('')
const [formData, setFormData] = useState([])
const [fileUploadingProgress, setFileUploadingProgress] = useState('')
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const navigate = useNavigate()



const submitHandler = async(e)=>{

       e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('author', author)
        formData.append('overView', overView)
      try{
        setLoading(true)
           const {data} = await axios.post(`${BASE_URL}/api/books/createbook`,
          formData,
           )
          setLoading(false)
          toast.success('Book Created Successfully')    
      } catch(err){
       toast.error(getError(err))
       setError(err)
      }
}
const bookCoverHandler = async(e)=>{
       e.preventDefault()
        const formData = new FormData()
        formData.append('image', coverImage)
      try{
           const {data} = await axios.post(`${BASE_URL}/api/bookCover/creatcoverimage`,
       formData
           )
      } catch(err){
        toast.error(getError(err))
      }
}

const handleInput = async(e)=>{
        e.preventDefault()
        const datas = {
          title,
          author,
          overView
        }
      try{
           const {data} = await axios.post(`${BASE_URL}/api/authors/author`,
          { 
            mode:'cors',
            headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(datas)
           }

           )
      } catch(err){
        toast.error(getError(err))
      }
}
const submitBookDatas = async(e)=>{
  e.preventDefault()
      bookCoverHandler(e)
      submitHandler(e)
      handleInput(e)
  navigate('/books')
}

  return (
    <div className='create-book'>
       <Helmet>
        <title>Creat-Book</title>
      </Helmet>
      <h1>Create Book</h1>
      {loading ? <LoadingBox/> : error ? <MessageBox variant='danger'>{error}</MessageBox>: <>
      <input type='text' name='author' id='author' required placeholder='Enter Author Name...' onChange={(e)=>setAuthor(e.target.value)}/>
      <input type='text' name='title' id='title' required placeholder='Enter Book Title...' onChange={(e)=>setTitle(e.target.value)} />
      <input type='text' name='overView' id='overView' required placeholder='Write over view...' onChange={(e)=>setOverView(e.target.value)} />
   <label htmlFor='file'><strong>Book in PDF format</strong>
    <input type='file' required accept='application/*' name='file' id='file' placeholder='choose book' onChange={(e)=>setFile(e.target.files[0])} />
   </label>
    <label htmlFor='image'><strong>Cover Image</strong>
    <input type='file' required accept='image/*' name='image' placeholder='choose cover image' id='image' onChange={(e)=>setCoverImage(e.target.files[0])}/>
    </label>
     <Button style={{color:'black'}} className='book-btn' type='submit'  onClick={submitBookDatas} >{loading ? 'Saving Book Data':'Save Book Data'}</Button>
    </>
}
    </div>
  );
}

export default CreateBook