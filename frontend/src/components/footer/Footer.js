import React from 'react'
import './Footer.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
function Footer() {
  return (
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
  )
}

export default Footer