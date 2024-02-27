import React, { useEffect, useState } from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PdfViewer() {
// const [book, setBook] = useState('')
const {id} = useParams()


// useEffect(()=>{
// const bookData = async()=>{
//   const {data} = await axios.get(`http://localhost:4000/api/books/document/${id}`)
//   // console.log(data)
//   // const fileData =  file[0].filename.blob()
//   //  const fileData =  data.blob()
//   // const url = URL.createObjectURL(data)
//   setBook(data)
// }
// bookData()
// },[])

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


    return (
   <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>text 1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  );
}

export default PdfViewer