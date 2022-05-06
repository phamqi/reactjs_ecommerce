import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { DataSlides } from './dataSlides';
import './slide.scss';

Slide.propTypes = {};

function Slide(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const countSlide = DataSlides.length;
  const nextSlide = () => {
    setCurrentSlide(currentSlide === countSlide - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? countSlide - 1 : currentSlide - 1);
  };
  var startX, moveX;
  const handelMoveStart = (e) => {
    startX = e.touches[0].clientX;
  };
  const handelMove = (e) => {
    moveX = e.touches[0].clientX;
  };
  const handelMoveEnd = (e) => {
    if (startX + 30 < moveX) {
      prevSlide();
    }
    if (startX - 30 > moveX) {
      nextSlide();
    }
  };
  setTimeout(() => {
    nextSlide();
  }, 5000);

  // setInterval(nextSlide, 10000);

  return (
    <div>
      <Box className="root">
        <div
          onTouchStart={handelMoveStart}
          onTouchEnd={handelMoveEnd}
          onTouchMove={handelMove}
          className="carousel"
        >
          <p onClick={prevSlide} className="carousel-prev">
            <ArrowBackIosNewIcon />
          </p>
          <p onClick={nextSlide} className="carousel-next">
            <ArrowForwardIosIcon />
          </p>
          <div className="carousel-list">
            {DataSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={
                  index === currentSlide
                    ? 'carousel-item carousel-item-active'
                    : 'carousel-item'
                }
              >
                <picture className="carousel-image">
                  <source
                    media="(min-width: 960px)"
                    srcSet={slide.image}
                    alt={slide.title}
                  />
                  <source
                    media="(min-width: 650px)"
                    srcSet={slide.img_tb}
                    alt={slide.title}
                  />
                  <source srcSet={slide.img_mb} alt={slide.title} />
                  <img src={slide.image} alt={slide.title} />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default Slide;
