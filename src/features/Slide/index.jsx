import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import './slide.scss';
import { keyframes } from '@emotion/react';
import { BANNER_HEIGHT } from '../../constants';

Slide.propTypes = {
  dataSlides: PropTypes.array,
};

function Slide({ dataSlides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const countSlide = dataSlides.length;
  const [fromX, SetFromX] = useState('70%');
  const nextSlide = () => {
    SetFromX('70%');
    setCurrentSlide(currentSlide === countSlide - 1 ? 0 : currentSlide + 1);
  };
  setTimeout(() => {
    nextSlide();
    SetFromX('70%');
  }, 5000);
  const prevSlide = () => {
    SetFromX('-70%');
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
  const handleActiveSlide = (index) => {
    setCurrentSlide(index);
  };
  return (
    <div
      onTouchStart={handelMoveStart}
      onTouchEnd={handelMoveEnd}
      onTouchMove={handelMove}
      className="carousel"
    >
      <ul className="carousel-slick-dots">
        {dataSlides.map((slide, index) => (
          <li
            key={slide.id}
            className={
              index === currentSlide
                ? 'carousel-slick-dot carousel-slick-dot__active'
                : 'carousel-slick-dot'
            }
            onClick={() => handleActiveSlide(index)}
          ></li>
        ))}
      </ul>
      <button
        onClick={prevSlide}
        className="carousel-button carousel-button__prev onhover"
      >
        <ArrowBackIosNewIcon />
      </button>
      <button
        onClick={nextSlide}
        className="carousel-button carousel-button__next onhover"
      >
        <ArrowForwardIosIcon />
      </button>
      <div
        style={{ width: '100%', height: '' + `${BANNER_HEIGHT}` + 'px' }}
        className="carousel-list"
      >
        {dataSlides.map((slide, index) => (
          <div
            style={{ '--from': `${fromX}` }}
            key={slide.id}
            className={
              index === currentSlide
                ? 'carousel-item carousel-item__active'
                : 'carousel-item'
            }
          >
            <picture>
              <source media="(min-width: 960px)" srcSet={slide.image} alt={slide.title} />
              <source
                media="(min-width: 650px)"
                srcSet={slide.img_tb}
                alt={slide.title}
              />
              <source srcSet={slide.img_mb} alt={slide.title} />
              <img className="carousel-image" src={slide.image} alt={slide.title} />
            </picture>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Slide);
