import axios from "axios";
import { pdfjs } from 'react-pdf';
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import './Book.css'
import { Store } from "../../Store";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();



const BookItem = ({ book, onDelete }) => {
  return (
    <div>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
};

// let files, coverImage, originalName;
// const initialData = [
//   files='',
//     coverImage = '',
//     originalName = '',
// ]

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
const {data:{files}} = await axios.get('http://localhost:4000/api/books/files')
setBooks(files)
// bookItems.files = files
// setBookItems((prevState)=>({
//   ...prevState,
//   files:files
// }))
} 
bookData()
},[])

useEffect(()=>{
const booksName = async ()=>{
  const {data} = await axios.get('http://localhost:4000/api/bookCover/bookNames')
  setCoverImage(data)
//   /setBookItems((prevState)=>({
//   ...prevState,
//   coverImage:data
// }))
}
booksName()
},[])

useEffect(()=>{

const booksName = async ()=>{
  const {data} = await axios.get('http://localhost:4000/api/books/bookNames')
  const result  =  data.filter((item) => item.file !== undefined);
  setOriginalName(result)
//   setBookItems((prevState)=>({
//   ...prevState,
//   originalName:result
// }))
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
  bookDatas[i].coverImage.push(image.image)
})

books.map((book,i)=>{
bookDatas[i].files.push(book.filename)
})

originalName.map((name,i)=>{
const result =  name.file.slice(0,-4).replace(/_/g, ' ')
bookDatas[i].orignalName.push(result)
})

let updatedItems
const handleDelete = (id) => {
  updatedItems = bookDatas.filter(book => book.id !== id); 
  };

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
            return ( book.files.length > 0  && <div className="book-info" key={i}>

      <img  className="cover-image" alt="hello" onClick={()=>navigate(`/book/${book.files}`)} src={`http://localhost:4000/api/bookCover//image/${book.coverImage}`}/>
         {/* book.orignalName.length >0 &&  */}
         <p>{book.orignalName}</p>
         {
          userInfo?.isAdmin
        &&
          <BookItem  book={book} onDelete={handleDelete} />
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
