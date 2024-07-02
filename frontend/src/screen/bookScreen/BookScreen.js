import axios from "axios";
import { pdfjs } from 'react-pdf';
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Book.css'
import { Store } from "../../Store";
import { ImageAddress } from "./BookDetail";
import { toast } from "react-toastify";
import { BASE_URL, getError } from "../../utils";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Header from "../../components/Header";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


 
export const TransferCoveImage =  (coverimage) => {
  const imageAddress = coverimage
  return imageAddress
};


function BookScreen({setIsHome}) {
  setIsHome(false)
const [showModel, setShowModal] = useState(null)
const [books, setBooks] = useState([])
const [originalName, setOriginalName] = useState([])
const [coverImage, setCoverImage] = useState([])
const [bookItems, setBookItems] = useState([])
const [loadingBook, setLoadingBookData] = useState(false)
const [error, setError] = useState(null)
const navigate = useNavigate()

  const {state} = useContext(Store)
  const {userInfo} = state


useEffect(()=>{
  const bookData = async()=>{
    const {data} = await axios.get(`${BASE_URL}/api/books/alldata`)
    setBookItems(data)
  }
  bookData()
},[])

useEffect(()=>{
const booksName = async ()=>{
  try{
    setLoadingBookData(true)
  const {data:{files}} = await axios.get(`${BASE_URL}/api/bookCover/image`)
  setCoverImage(files)
  setLoadingBookData(false)
  } catch(err){
    toast.error(getError(err))
    setError(err)
  }
}
booksName()
},[])

let bookDatas = [
  { id:0,
    files:[],
    orignalName:[],
    coverImage:[]
  },
   {id:1,
    files:[],
    orignalName:[],
    coverImage:[]
  },
   {id:2,
    files:[],
    orignalName:[],
    coverImage:[]
  },
     {id:3,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:4,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:5,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:6,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:7,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:8,
    files:[],
    orignalName:[],
    coverImage:[]
  },
  {id:9,
    files:[],
    orignalName:[],
    coverImage:[]
  },
  {id:10,
    files:[],
    orignalName:[],
    coverImage:[]
  },
  {id:11,
    files:[],
    orignalName:[],
    coverImage:[]
  },
  {id:12,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:13,
    files:[],
    orignalName:[],
    coverImage:[]
  },
    {id:14,
    files:[],
    orignalName:[],
    coverImage:[]
  }
]
/////////////////////////////////////////////////////////////


coverImage.map((image,i)=>{
  bookDatas[i].coverImage.push(image.filename)
})

bookItems.map((book,i)=>{
bookDatas[i].files.push(book.filename)
bookDatas[i].orignalName.push(book.title)
})

const deleteOriginalName = async(name) => {
  try{
  await axios.delete(`${BASE_URL}/api/books/bookname/${name}`)
  } catch(err){
    toast.error(getError(err))
  }
  };

const deleteCoverImage = async(coverImage) => {
  try{
  await axios.delete(`${BASE_URL}/api/bookCover/coverimage/${coverImage}`)
  } catch(err){
    toast.error(getError(err))
  }
  };

const deleteCoverImageFromDb = async(coverImage) => {
  try{
  await axios.delete(`${BASE_URL}/api/bookCover/bookname/${coverImage}`)
  } catch(err){
    toast.error(getError(err))
  }
  };

const deleteBookFromDb = async(filename) => {
  try{
  await axios.delete(`${BASE_URL}/api/books/bookname/${filename}`)
    window.location.reload()
  } catch(err){
    toast.error(getError(err))
  }
  };


const handleDelete = async(filename, coverImage, name) => {
  deleteCoverImage(coverImage)
  deleteOriginalName(name)
  deleteBookFromDb(filename)
  deleteCoverImageFromDb(coverImage)
  try{
  await axios.delete(`${BASE_URL}/api/books/files/${filename}`)
    window.location.reload()
  } catch(err){
    toast.error(getError(err))
  }
  };


const coverimage = (coverImage)=>{
ImageAddress(coverImage)
}
let isHome = false
  return (
    <div className="book-screen">
      <Helmet>
        <title>SBC-Books</title>
      </Helmet>
      { loadingBook ? <LoadingBox/> :error ? <MessageBox variant='danger'>{error}</MessageBox>:
      <>
      {/* <Header isHome={isHome}/> */}
        <div className="container">
            <div className="image-box"> 
            {
                bookDatas?.map((book, i)=>{
                  // && book.orignalName.length > 0
                  return ( book.files.length > 0  && <div className="book-info" key={i} onClick={()=>coverimage(book.coverImage)} >

            <img  className="cover-image" alt="hello" onClick={()=>navigate(`/books/${book.files}`)} src={`http://localhost:4000/api/bookCover/image/${book.coverImage}`}/>
              <p>{String(book.orignalName).replace(/_/g, ' ')}</p>
              {
                userInfo?.email === 'Perfecttesfa456@gmail.com'
              &&
                <Button className="d-btn" style={{color:'black'}} variant="danger" book={book} onClick={()=>
                { 
                setShowModal(true)
                }
                }>Delete Book</Button>
              }
                     {showModel && 
            <div className='delete-btn'>
              <div>
                  <h3>Are you sure you want to delete this book?</h3>
                <div className='flex justify-center btns'>
                  <Button  className='' variant='danger' onClick={()=>handleDelete(book.files, book.coverImage, book.orignalName)}>Yes, I'm sure</Button>
                  <Button  onClick={()=>setShowModal(false)}>No, cancel</Button>
                </div>

              </div>

            </div>}
                  </div>
                  )
                })
            }
            </div>
        </div>
        </>
}
        {
          userInfo?.email === 'Perfecttesfa456@gmail.com'
          &&
        <Link className="new-book" to='/createbook'>Create New Book</Link>
        }
    </div>
  );
}

export default BookScreen;
