import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TransferCoveImage } from './BookScreen'

let imageUrl;

export const ImageAddress = async(image)=>{
  imageUrl = image
  console.log(imageUrl)
}

function BookDetail() {
const [book, setBook] = useState()
const [imageAddress, setImageAddress] = useState(imageUrl)

const {filename} = useParams()
const navigate = useNavigate()

const getImageAddress = (image)=>{
  // ImageAddress()
}
getImageAddress()


useEffect(()=>{
const fetchData = async()=>{
    const {data} = await axios.get(`http://localhost:4000/api/books/bookdata/${filename}`)
    setBook(data)
}
fetchData()
},[])

// const getImage = async()=>{
//   const {data} = await axios.get(`http://localhost:4000/api/bookCover/image/${imageAddress}`)
//   console.log(data)
// }
// getImage()

console.log(imageAddress)

  return (
    <div className='book-detail book'>
      <div className='read'>
        {
          imageAddress && 
        <img  className="cover-image" alt="hello"  src={`http://localhost:4000/api/bookCover/image/${imageAddress}`}/>
        }
        <button onClick={()=>navigate(`/book/${filename}`)}>Read Book</button>
      </div>
      <div className='book-information'>
        { book &&
          book.map((data)=>{ return (
            <>
            <h2>{data.title}</h2>
            <p>{data.overView}</p>
            <h3>by {data.author}</h3>
            </>
          )
          })
        }
        
      </div>
    </div>
  )
}

export default BookDetail