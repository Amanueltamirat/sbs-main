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
                እኛም በክርስቶስ ፍጹም የሚሆን ሰውን ሁሉ እናቀርብ ዘንድ ሰውን ሁሉ እየገሠጽን ሰውንም ሁሉ በጥበብ
                ሁሉ እያስተማርን የምንሰብከው እርሱ ነው። (ቆላስይስ 1፤28)
              </motion.div    >
           
    </div>
  );
}

export default ImageSlider;
