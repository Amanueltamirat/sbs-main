import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TransferCoveImage } from './BookScreen'
import { toast } from 'react-toastify';
import  {getError } from '../../utils';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

let imageUrl;

export const ImageAddress = async(image)=>{
  imageUrl = image

}

function BookDetail({setIsHome}) {
  setIsHome(false)
const [book, setBook] = useState()
const [imageAddress, setImageAddress] = useState(imageUrl)
const [loading, setLoading] = useState(false)
const [error, sedtError] = useState(null)
const {filename} = useParams()
const navigate = useNavigate()


useEffect(()=>{
const fetchData = async()=>{
  try{
    setLoading(true)
    const {data} = await axios.get(`/api/books/bookdata/${filename}`)
    setBook(data)
    setLoading(false)
  } catch(err){
   toast.error(getError(err))
   sedtError(err)
  }
}
fetchData()
},[])

  return (
    <div className='book-detail book'>
        { loading ? (<LoadingBox/> ): error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ): 
        <div className='about-book'>
        <div className='read'>
          {
            imageAddress && 
          <img  className="cover-image" alt="hello"  src={`/api/bookCover/image/${imageAddress}`}/>
          }
          <button onClick={()=>navigate(`/book/${filename}`)}>Read Book</button>
        </div>
        <div className='book-information'>
              { book &&
                book.map((data)=>{ return (
                  <>
                  <Helmet>
              <title>{data.title}</title>
            </Helmet>
                  <h2>{data.title}</h2>
                  <p>{data.overView}</p>
                  <h3>by {data.author}</h3>
                  </>
                )
                })
              }
        </div>
        </div>
        }
    </div>

  )
}

export default BookDetail