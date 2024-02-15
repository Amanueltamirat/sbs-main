import axios from "axios";
import { pdfjs } from 'react-pdf';
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import PDFDoc from "./PDFDoc";
import { Button } from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function BookScreen() {
const [books, setBooks] = useState([])

const navigate = useNavigate()
useEffect(()=>{

const bookData = async()=>{

const {data} = await axios.get('http://localhost:4000/api/books')
setBooks(data)
console.log(data)
} 

bookData()
},[])


  return (
    <div>
      <Helmet>
        <title>SBC-Books</title>
      </Helmet>

      <h1>Books</h1>
      {
          books.map((book, i)=>{
            return (
              
      <Button onClick={()=>navigate(`/book/${book._id}`)} >Book Number {i +1}</Button>
            )
          })
      }
      <Link to='/createbook'>Create Book</Link>
    </div>
  );
}

export default BookScreen;
