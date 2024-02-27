import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PDFViewer } from '@react-pdf/renderer';
import PdfViewer from './PdfViewer';
import { Button } from '@mui/material';
import {Document, Page} from 'react-pdf'
// import PDF from 'react-pdf-scroll'
import File from 'fs'
function BookDetail() {

const [book, setBook] = useState([])
const [numPage, setNumPage] = useState(null)
const [pageNumber, setPageNumber] = useState(1)
const {id} = useParams()

// const downloadUrl = ()=>{
//   try{
// const bookData = async()=>{
//   const {data} = await axios.get(`http://localhost:4000/api/books/document/${id}`)
//   console.log(data)
//  const url = window.URL.createObjectURL(new Blob([data]))
//  const link = document.createElement('a')
//  link.href = url;
//  link.setAttribute('download', 'receipt-pdf');
//  document.body.appendChild(link)
//  link.click()
 
// }
// bookData();
//   } catch(err){
//     console.log(err)
//   }
// }


useEffect(()=>{
  try{
const bookData = async()=>{
  const {data} = await axios.get(`http://localhost:4000/api/books/document/${id}`)
  const len =  data.length;
  let bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++){
       bytes[i] =  data.charCodeAt(i);
    }
     const renderPdf = bytes.buffer
     console.log(renderPdf)


// const uintArr = new Uint8Array(renderPdf);
// const regularArr = Array.from(uintArr);
// console.log(regularArr)
// const url = window.URL.createObjectURL(new Blob([data]))
//  const link = document.createElement('a')
//  link.href = url;
//   link.setAttribute('download', 'receipt-pdf');
//  document.body.appendChild(link)
//  link.click()
//  console.log(link)


  setBook(data)
}


bookData();
  } catch(err){
    console.log(err)
  }

},[])


const pdfString = `${book}`

const onLoading = ({numPage })=>{
setNumPage(numPage)
setPageNumber(1)
}

  return (
<div className='book-detail' >
      {/* <PDFViewer>
         <PdfViewer book={book} />
     </PDFViewer> */}
      <iframe src='pdfString' width="100%" height="500"></iframe>
    {/* <iframe src={`${book}`} width="100%" height="500"></iframe>
    <embed src={book} width="100" height="500" type="application/pdf"></embed> */}
    {/* <Button onClick={downloadUrl} >Download</Button> */}
    {/* <Document file={`${book}`} onLoadSuccess={onLoading}>
    <Page height='700' pageNumber={pageNumber}/>
    </Document> */}

</div>
  
  );
    
  
}

export default BookDetail