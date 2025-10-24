import {React, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PropTypes from 'prop-types';

/* Image Carousel for projects */
function AutoCarousel({ images, resetTrigger }) {
  const [index, setIndex] = useState(0);

  // Reset to first image when card closes
  useEffect(() => {
    setIndex(0);
  }, [resetTrigger]);

  // Show another image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <div className="relative w-full h-80 overflow-hidden rounded-t-xl bg-white/50">
      
      {/* the entering element will wait until the exiting child has animated out, before it animates in. */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Carousel Image ${index + 1}`}
          className="absolute inset-0 w-full h-full object-contain object-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
      </AnimatePresence>
      
      {/*  transparent black gradient over images*/}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    
    </div>
  );
}

AutoCarousel.propTypes = {
  images: PropTypes.any.isRequired,
  resetTrigger: PropTypes.bool.isRequired,


}

export default AutoCarousel;