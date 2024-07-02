import React from 'react'
import img from './imge/result (1).png'
import img2 from './imge/CBE (2).png'

// '../../public/images/result (1).png'
function Support({setIsHome}) {
  setIsHome(false)
  return (
    <div className='support' >
        <div className='suport-text'>
        <h2>Support the SBC Financially!</h2>
        <p>Your support means a lot to our service achieving its vision. Thank you for loving to serve the gospel of Christ with us.
        You can send your financial support to SBC at the following bank address:</p>
        </div>
        <div className='logo-box'>
          <div>
            <img src={img} alt='logo'/>
            <p>33237685</p>
          </div>
        <div>
            <img src={img2} alt='logo'/>
            <p>10003689656338</p>
          </div>
        </div>
    </div>
  )
}

export default Support