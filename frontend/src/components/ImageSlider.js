import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion'

const sliderVariants = {
    initial:{
        x:0,
        
    },
     animate:{
        x:'-100%',
        transition:{
        repeat:Infinity,
        repeatType:'mirror',
        duration:25,
       
        },

    }
}

function ImageSlider({ images }) {
  return (
    <div className="imageslider">
              <motion.div className='sliding-text-container' variants={sliderVariants} initial='initial' animate='animate' >
                God chose the lowly things of this world and the despised things and the things that are not—to nullify the things that are, (1 Corinthians 1:28)
              </motion.div>  
            <div className="dark-background"></div>     
    </div>
  );
}

export default ImageSlider;
