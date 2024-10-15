import React, { useContext, useEffect, useState } from 'react'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import { BASE_URL, getError } from '../../utils';
import axios from 'axios';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
function Footer() {

const [email, setEmail] = useState('')
 const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
const navigate = useNavigate();
const { search } = useLocation();
  const redirectURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectURL ? redirectURL : "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `$/api/users/signin`,
        { email}
      );
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      // console.log(data);
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };


//  useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [userInfo, redirect, navigate]);

  return (
    <div className='footer-container'>
      <div className='subscribe-box'>
        <h1>Subscribe</h1>
        <form>
          <input  onChange={(e)=>setEmail(e.target.value)} type='email' required placeholder='Enter your email'/>
        <button onClick={()=>{
          submitHandler()
        }}>Subscribe</button>
        </form>
      </div>
      <div className='footer-box'>
        <div className='social-media-links'>
          <p>Find Us Here</p>
          <div>
            <a target='_blank' href='https://www.facebook.com/soddobaptist' className='icon' > <FacebookIcon/></a>
            <a target='_blank' href='https://www.youtube.com/@SoddoBaptistChurch' className='icon'><YouTubeIcon/></a>
            <a target='_blank' href='https://www.instagram.com/soddobaptistchurch/' className='icon'><InstagramIcon/></a>
            <a target='_blank' href='https://t.me/gbaptist' className='icon'><TelegramIcon/></a>
          </div>
        </div>
          <div className='footer'>
            <p>Copyright © {new Date().getFullYear()} Soddo Baptist Church. All Rights Reserved.</p>
          </div>
      </div>
    </div>
  )
}

export default Footer