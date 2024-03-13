// import { Button } from '@mui/material'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Book.css'


  // "proxy": "http://localhost:4000",


function CreateBook() {
const [file, setFile] = useState('')
const [coverImage, setCoverImage] = useState('')
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [overView, setOverView] = useState('')
const [formData, setFormData] = useState([])
const [fileUploadingProgress, setFileUploadingProgress] = useState('')
const navigate = useNavigate()



const submitHandler = async(e)=>{

       e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('author', author)
        formData.append('overView', overView)
      try{
           const {data} = await axios.post(`http://localhost:4000/api/books/createbook`,
          formData,
           )
          console.log(data)    
      } catch(err){
        console.log(err)
      }
}
const bookCoverHandler = async(e)=>{
       e.preventDefault()
        const formData = new FormData()
        formData.append('image', coverImage)
      try{
           const {data} = await axios.post(`http://localhost:4000/api/bookCover/creatcoverimage`,
       formData
           )
          console.log(data)
      } catch(err){
        console.log(err)
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
           const {data} = await axios.post(`http://localhost:4000/api/authors/author`,
          { 
            mode:'cors',
            headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(datas)
           }

           )
          console.log(data)
      } catch(err){
        console.log(err)
      }
}
// console.log(title)
const submitBookDatas = async(e)=>{
  e.preventDefault()
      bookCoverHandler(e)
      submitHandler(e)
      handleInput(e)
  navigate('/books')
}

  return (
    <div className='create-book'>
      <h2>CreateBook</h2>
      
      <input type='text' name='author' id='author' required placeholder='Enter Author Name...' onChange={(e)=>setAuthor(e.target.value)}/>
      <input type='text' name='title' id='title' required placeholder='Enter Book Title...' onChange={(e)=>setTitle(e.target.value)} />
      <input type='text' name='overView' id='overView' required placeholder='Write over view...' onChange={(e)=>setOverView(e.target.value)} />
   <label htmlFor='file'><strong>Book in PDF format</strong>
    <input type='file' required accept='application/*' name='file' id='file' placeholder='choose book' onChange={(e)=>setFile(e.target.files[0])} />
   </label>
        {/* <Button type='button' onClick={submitHandler} >Save Book</Button> */}
    <label htmlFor='image'><strong>Cover Image</strong>
    <input type='file' required accept='image/*' name='image' placeholder='choose cover image' id='image' onChange={(e)=>setCoverImage(e.target.files[0])}/>
    </label>
     <Button className='book-btn' type='submit'  onClick={submitBookDatas} >Save Book Data</Button>
      
    {/* <Button type='button' disabled={fileUploadingProgress}>Submit book</Button> */}
    </div>
  );
}

export default CreateBook