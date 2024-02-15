import { Button } from '@mui/material'
import React, { useState } from 'react'

function SampleBook() {
const [values, setValues] = useState('')

const create = async (media) => {
 try {
 let response = await fetch('http://localhost:4000/api/books/createpost', {
 method: 'POST',
 headers: {
 'Accept': 'application/json'
 },
 body: media
 })
 const data = await response.json()
 console.log(data)
 return data
 } catch(err) {
 console.log(err)
 }
}


const handleChange = name => event => {
 const value = name === 'file'
 ? event.target.files[0]
 : event.target.value
 setValues({ ...values, [name]: value })
}
/////// form Data ///////
const clickSubmit = () => {
 let mediaData = new FormData()
 values.files && mediaData.append('file', values.files)
 create(mediaData).then((data) => {
 if (data.error) {
 setValues({...values, error: data.error})
 } else {
 setValues({...values, error: '', mediaId: data._id,
 redirect: true})
 }
 })
 }



  return (
    <div>
    <input accept="file/*"
    onChange={handleChange('file')}
    id="file"
    type="file"
    // style={{display: 'none'}}
    />
    <label htmlFor="icon-button-file">
 <Button color="secondary" variant="contained" component="span" onClick={clickSubmit} >
 Upload 
 {/* <FileUpload/> */}
 </Button>
</label>
    </div>
  )
}

export default SampleBook