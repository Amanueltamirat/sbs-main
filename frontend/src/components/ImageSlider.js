import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import Header from "./Header";
import SplitString from "./SplitString";
import img1 from './imge/image1.JPG'
import img2 from './imge/image2.JPG'
import img3 from './imge/image3.JPG'
import img4 from './imge/image4.JPG'
import img5 from './imge/image5.JPG'
import img6 from './imge/image6.jpg'
import img7 from './imge/img7.jpg'
const sliderVariants = {
   hidden:{
    opacity:0
   },
   reveal:{
    opacity:1
   }
}

const imageArray = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7
]

const text = 
        
        "God chose the lowly things of this world\n  and the despised things\n and the things that are not—to nullify the things that are,\n (1 Corinthians 1:28)"

function ImageSlider({ images }) {

const [currentImage, setCurrentImage] = useState(0);
const [isHome, setIsHome] = useState(true);

useEffect(()=>{

     const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => 
      (prevImage + 1) % imageArray.length);
      }, 4000)

       return () => clearInterval(intervalId);

},[imageArray.length])
const textCharacters = SplitString(text)

  return (
    <div className="imageslider" style={{backgroundImage:`url(${imageArray[currentImage]})`}}>
      <div className="dark-backg">
     
      <motion.div initial='hidden' animate='reveal' 
      transition={{staggerChildren:0.05}}
       className='sliding-text-container' >
              {
                textCharacters.map((char,i)=>(
                  <motion.span style={{whiteSpace: "pre-line"}} key={i} transition={{duration:0.5}} variants={sliderVariants} >{char}</motion.span> 
                ))
              } 
      </motion.div>
            <div className="dark-background"></div>     
      </div>
    </div>
  );
}

export default ImageSlider;
