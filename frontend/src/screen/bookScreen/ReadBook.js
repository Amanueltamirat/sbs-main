import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../utils'

function BookDetail() {
const [book, setBook] = useState([])
const {filename} = useParams()

useEffect(()=>{
  try{
const bookData = async()=>{
  const {data} = await axios.get(`${BASE_URL}/api/books/document/${filename}`,{
      headers: {
        'Content-type': 'application/pdf',
      },
      responseType: 'blob' 
    },
   )
const url = window.URL.createObjectURL(new Blob([data], {type: "application/pdf"}))
console.log(url)
  setBook(url)
}
bookData();
  } catch(err){
    toast.error(getError(err))
  }
},[])

  return (
<div className='bookdetail' >
      <iframe src={`${book}`} width="100%" frameBorder='0'></iframe>
</div>
  
  ); 
}

export default BookDetail