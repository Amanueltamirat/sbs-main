import axios from "axios";
import { pdfjs } from 'react-pdf';
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './Book.css'
import { Store } from "../../Store";
import { ImageAddress } from "./BookDetail";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


 
export const TransferCoveImage =  (coverimage) => {
  const imageAddress = coverimage
  return imageAddress
};


function BookScreen() {
const [books, setBooks] = useState([])
const [originalName, setOriginalName] = useState([])
const [coverImage, setCoverImage] = useState([])
const [bookItems, setBookItems] = useState([])
const navigate = useNavigate()

  const {state} = useContext(Store)
  const {userInfo} = state


useEffect(()=>{
  const bookData = async()=>{
    const {data} = await axios.get(`http://localhost:4000/api/books/alldata`)
    setBookItems(data)
  }
  bookData()
},[])

useEffect(()=>{
const booksName = async ()=>{
  const {data:{files}} = await axios.get('http://localhost:4000/api/bookCover/image')
  setCoverImage(files)
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
  await axios.delete(`http://localhost:4000/api/books/bookname/${name}`)
  console.log('success')
  } catch(err){
    console.log(err)
  }
  };

const deleteCoverImage = async(coverImage) => {
  
  try{
  await axios.delete(`http://localhost:4000/api/bookCover/coverimage/${coverImage}`)
  console.log('success')
  } catch(err){
    console.log(err)
  }
  };

const deleteCoverImageFromDb = async(coverImage) => {
  
  try{
  await axios.delete(`http://localhost:4000/api/bookCover/bookname/${coverImage}`)
  console.log('success')
  } catch(err){
    console.log(err)
  }
  };

const deleteBookFromDb = async(filename) => {
  try{
  await axios.delete(`http://localhost:4000/api/books/bookname/${filename}`)
  console.log('success')
    window.location.reload()
  } catch(err){
    console.log(err)
  }
  };


const handleDelete = async(filename, coverImage, name) => {
  deleteCoverImage(coverImage)
  deleteOriginalName(name)
  deleteBookFromDb(filename)
  deleteCoverImageFromDb(coverImage)
  try{
  await axios.delete(`http://localhost:4000/api/books/files/${filename}`)
  console.log('success')
    window.location.reload()
  } catch(err){
    console.log(err)
  }
  };
  console.log((bookDatas))

const coverimage = (coverImage)=>{
// TransferCoveImage(coverImage)
ImageAddress(coverImage)
}

  return (
    <div className="book-screen">
      <Helmet>
        <title>SBC-Books</title>
      </Helmet>

   
      <div className="container">
          <div className="image-box"> 
      {
          bookDatas?.map((book, i)=>{
            // && book.orignalName.length > 0
            return ( book.files.length > 0  && <div className="book-info" key={i} onClick={()=>coverimage(book.coverImage)} >

      <img  className="cover-image" alt="hello" onClick={()=>navigate(`/books/${book.files}`)} src={`http://localhost:4000/api/bookCover/image/${book.coverImage}`}/>
         {/* book.orignalName.length >0 &&  */}
         <p>{String(book.orignalName).replace(/_/g, ' ')}</p>
         {
          userInfo?.isAdmin
        &&
          <Button variant="danger" book={book} onClick={()=>handleDelete(book.files, book.coverImage, book.orignalName)}>Delete</Button>
         }
            </div>
            )
          })
      }
          </div>
      </div>{
        userInfo?.isAdmin
        &&
      <Link className="new-book" to='/createbook'>Create New Book</Link>
      }
    </div>
  );
}

export default BookScreen;
