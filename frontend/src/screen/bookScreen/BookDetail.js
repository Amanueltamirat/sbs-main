import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BookDetail() {
const [book, setBook] = useState([])
const {filename} = useParams()

useEffect(()=>{
  try{
const bookData = async()=>{
  const {data} = await axios.get(`http://localhost:4000/api/books/document/${filename}`,{
      headers: {
        'Content-type': 'application/pdf',
      },
      responseType: 'blob' 
    },
   )
  // const len =  data.length;
  // let bytes = new Uint8Array( len );
  //   for (let i = 0; i < len; i++){
  //      bytes[i] =  data.charCodeAt(i);
  //   }
  //    const renderPdf = bytes.buffer
    
  //    console.log(renderPdf)
 console.log(data)

// const uintArr = new Uint8Array(renderPdf);
// const uintArr = new Uint8Array(renderPdf);
// const regularArr = Array.from(uintArr);
// console.log(uintArr)
//  window.open(url);
const url = window.URL.createObjectURL(new Blob([data], {type: "application/pdf"}))
console.log(url)
  setBook(url)
}


bookData();
  } catch(err){
    console.log(err)
  }

},[])

  return (
<div className='book-detail' >
      <iframe src={`${book}`} width="100%" height="500" frameBorder='0'></iframe>
</div>
  
  ); 
}

export default BookDetail