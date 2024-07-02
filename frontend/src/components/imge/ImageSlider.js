import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import Header from "./Header";
import SplitString from "./SplitString";
import img1 from './imge/image1.JPG'

const sliderVariants = {
   hidden:{
    opacity:0
   },
   reveal:{
    opacity:1
   }
}

// God chose the lowly things of this world <br/> and the despised things <br/> and the things that are not—to nullify the things that are,<br/> (1 Corinthians 1:28)
const text = 
        
        "God chose the lowly things of this world\n  and the despised things\n and the things that are not—to nullify the things that are,\n (1 Corinthians 1:28)"

function ImageSlider({ images }) {

const [isHome, setIsHome] = useState(true);

const textCharacters = SplitString(text)

  return (
    <div className="imageslider" style={{backgroundImage:`url(${img1})`}}>
      <div className="dark-backg">
     
      <motion.div initial='hidden' animate='reveal' 
      transition={{staggerChildren:0.05}}
       className='sliding-text-container' >
              {
                textCharacters.map((char)=>(
                  <motion.span style={{whiteSpace: "pre-line"}} key={char} transition={{duration:0.5}} variants={sliderVariants} >{char}</motion.span> 
                ))
              } 
      </motion.div>
            <div className="dark-background"></div>     
      </div>
    </div>
  );
}

export default ImageSlider;
