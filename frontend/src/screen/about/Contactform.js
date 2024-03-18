import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion'
import './About.css'
import emailJs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getError } from '../../utils'
import LoadingBox from '../../components/LoadingBox'
import MessageBox from '../../components/MessageBox'

function Contactform() {
const [error, setError] = useState(false)
const [success, setSuccess] = useState(false)
const [loading, setLoading] = useState(false)
const ref = useRef()
const navigte = useNavigate()

  const sendEmail = (e) => {
    e.preventDefault();
   setLoading(true)
    emailJs
      .sendForm('service_xzs87si', 'template_is8abuj', ref.current, {
        publicKey: 'IfqGvR-bZ8vq9_NNV',
      })
      .then(
        () => {
          setError(false)
          setSuccess(true)
          setLoading(false)
          toast.success('Thank you for your constructive messages.')
          if(!loading){
            navigte('/')
          }

        },
        (error) => {
            setError(true)
            setSuccess(false)
            toast.error(getError(err))
        },
      );
  };

  return (
        <div className='formContainer'>
            { loading ? <LoadingBox/> : error ? <MessageBox variant='danger'>{error}</MessageBox>:
            <form ref={ref} onSubmit={sendEmail}>
                <div>
                <input type="text" required placeholder='Name' name='name' />
                <input type="email" required placeholder='Email' name='email'/>
                </div>
                <textarea name="message" rows={8} placeholder='message'></textarea>
                <button disabled={loading}>{loading? 'Please wait':'Submit'}</button>
                {error && 'Error'}
                {success && 'Success' }
            </form> 
            }
        </div>
  )
}

export default Contactform