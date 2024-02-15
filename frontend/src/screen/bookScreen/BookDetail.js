import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer';
import PDFDoc from './PDFDoc';

function BookDetail() {

const [book, setBook] = useState([])

const {id} = useParams()

useEffect(()=>{

const getBook = async()=>{
    const {data} = await axios.get(`http://localhost:4000/api/books/book/${id}`)
    setBook(data)
    console.log(data)
}
getBook()
},[])

  return (

    
      <PDFViewer>
         <PDFDoc book={book} />
     </PDFViewer>
  
  )
    
  
}

export default BookDetail