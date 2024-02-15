import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import {
  getDownloadURL,
  deleteObject,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';



function CreateBook() {

const [file, setFile] = useState('')
const [formData, setFormData] = useState([])
const [fileUploadingProgress, setFileUploadingProgress] = useState('')
const navigate = useNavigate()



const submitHandler = async(e)=>{
e.preventDefault()
const formData = new FormData()
formData.append('file', file)
try{
const res = await axios.post(`http://localhost:4000/api/books/createbook`,
formData,
)
const data = await res.json()
console.log(data)
navigate('/books')
}catch(err){
  console.log(err)
}
}

//////////////////////////////

const bookData = {
  file:file
}
 const createBook= async (e) => {
    e.preventDefault();
    const {data} = await axios.post(
      `http://localhost:4000/api/books/createbook`,
      { 
  ...bookData
      }
    );
    // const data = await res.json()
    console.log(data)
    navigate(`/books`);
  };
///////////////////////
const handleFileInput = async(e)=>{
    try {
      // if (!profilePicture) {
      //   setPropfilePictureUploadError('Please select an image');
      //   return;
      // }
      // setPropfilePictureUploadError(null);
      const uploadedFile = e.target.files[0]
      const storage = getStorage(app);
      // const fileName = new Date().getTime() + '-' + profilePicture.name;
      const fileName = `books/${Date.now()}-${uploadedFile.name}`
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          // setPropfilePictureUploadError('Image upload failed');
          // setProfilePictureProgress(null);
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUploadingProgress(null);
            // setPropfilePictureUploadError(null);
            setFile(downloadURL);
          });
        }
      );
    } catch (err) {
      // setPropfilePictureUploadError('Image upload failed');
      setFileUploadingProgress(null);
      console.log(err);
    }
}
  return (
    <div>CreateBook
    

    <input type='file' accept='application/*' name='file' id='file' onChange={(e)=>setFile(e.target.files[0])} />
    {/* <Button type='button' disabled={fileUploadingProgress}>Submit book</Button> */}
        <Button type='button' onClick={submitHandler} >Save Book</Button>
    </div>
  )
}

export default CreateBook