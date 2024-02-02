import React, { useEffect, useState } from "react";

function ImageSlider({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    console.log(images[currentImageIndex]);
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 5000);

    return () => clearInterval(intervalId); // Clear the interval when the component unmounts or re-renders
  }, []); // Re-run the effect when the interval changes

  return (
    <div className="imageslider">
      <button onClick={goToPreviousSlide}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <img
        src={`${images[currentImageIndex]}`}
        alt={`Slide${currentImageIndex + 1}`}
        className="img"
      />
      <button onClick={goToNextSlide}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <div className="banner_fadebottom"></div>
    </div>
  );
}

export default ImageSlider;
