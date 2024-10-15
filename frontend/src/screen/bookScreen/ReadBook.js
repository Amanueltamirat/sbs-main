import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getError } from '../../utils'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'

function BookDetail() {
const [book, setBook] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const {filename} = useParams()



useEffect(()=>{
  try{
const bookData = async()=>{
  setLoading(true)
  const {data} = await axios.get(`/api/books/document/${filename}`,{
      headers: {
        'Content-type': 'application/pdf',
      },
      responseType: 'blob' 
    },
   )
console.log(data)
const url = window.URL.createObjectURL(new Blob([data], {type: "application/pdf"}))
  setBook(url)
setLoading(false)
}
bookData();
  } catch(err){
    toast.error(getError(err))
    setError(err)
  }
},[])

  return (
<div className='bookdetail' >
  { loading ? <LoadingBox/>:error ? <MessageBox variant='danger'>{error}</MessageBox>:

      <iframe src={`${book}`} width="100%" frameBorder='0'></iframe>

  }
</div>
  
  ); 
}

export default BookDetail