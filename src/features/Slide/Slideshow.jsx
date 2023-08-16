import PropTypes from 'prop-types';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

SlideshowItem.propTypes = {
  time: PropTypes.number,
  style: PropTypes.object,
  prevBtn: PropTypes.any,
  nextBtn: PropTypes.any,
  slash: PropTypes.any,
};
function SlideshowItem({ children, parentCallback }) {
  const section = useRef();
  const [active, setActive] = useState(0);
  const [maxLength, setMaxlength] = useState(0);
  const [sectionWidth, setSectionWidth] = useState(0);
  const timeoutRef = useRef(null);
  let distance = 0;
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  const getLeft = (section) => {
    const left = section.scrollLeft / section.clientWidth;
    return parseInt(left.toFixed());
  };
  const nextSlide = (section) => {
    if (section.scrollLeft >= maxLength * section.clientWidth - 100) {
      section.scrollBy({
        left: -section.clientWidth * maxLength,
        behavior: 'smooth',
      });
      distance = 0;
      setActive(0);
    } else {
      distance = 0;
      section.scrollBy({
        left: (distance += section.clientWidth),
        behavior: 'smooth',
      });
      const left = getLeft(section);
      setActive(left + 1);
    }
  };
  const prevSlide = (section) => {
    if (section.scrollLeft < 100) {
      distance = section.clientWidth * maxLength;
      section.scrollBy({
        left: distance,
        behavior: 'smooth',
      });
      setActive(maxLength);
    } else {
      distance = 0;
      section.scrollBy({
        left: (distance -= section.clientWidth),
        behavior: 'smooth',
      });
      const left = getLeft(section);
      setActive(left - 1);
    }
  };
  useEffect(() => {
    section.current.scrollLeft = 0;
    let startX, moveX;
    section.current.addEventListener(
      'touchstart',
      function (e) {
        startX = e.touches[0].clientX;
      },
      { passive: false }
    );
    section.current.addEventListener(
      'touchmove',
      function (e) {
        e.preventDefault();
        moveX = e.touches[0].clientX;
      },
      { passive: false }
    );
    section.current.addEventListener(
      'touchend',
      function (e) {
        if (startX + 80 < moveX) {
          prevSlide(section.current);
        }
        if (startX - 80 > moveX) {
          nextSlide(section.current);
        }
      },
      { passive: false }
    );
  }, [sectionWidth]);
  useEffect(() => {
    setSectionWidth(section.current.clientWidth);
    setMaxlength(section.current.children.length - 1);
  }, [sectionWidth]);
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide(section.current);
    }, 5000);
    parentCallback(active);
    return () => {
      resetTimeout();
    };
  }, [active, sectionWidth]);
  useEffect(() => {
    try {
      window.addEventListener('resize', () => {
        setActive(0);
        if (section && section.current && section.current.clientWidth) {
          setSectionWidth(section.current.clientWidth);
        }
      });
    } catch {}
  }, []);
  return (
    <div id="section__wrapper" className={`container  section__wrapper`}>
      <div className={`section__wrapper__btn`}>
        <button
          className={`section__btn  section__btn__prev `}
          onClick={() => prevSlide(section.current)}
        >
          <ArrowBackIosNewIcon />
        </button>
      </div>
      <div className={` section__wrapper__btn   section__wrapper__btn--right`}>
        <button
          className={`section__btn  section__btn__next`}
          onClick={() => nextSlide(section.current)}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
      <div ref={section} className={`section`}>
        {children}
      </div>
      <div className={`section__counter`}>
        <div
          className={`section__wrap__counter`}
          style={{ '--total': `'|${maxLength + 1}'` }}
        >
          <div
            className={`section__counter__teen `}
            style={{ '--teen': `-${Math.floor((1 + active) / 10)}00%` }}
          >
            <div>0</div> <div>1</div> <div>2</div> <div>3</div> <div>4</div> <div>5</div>
            <div>6</div> <div>7</div> <div>8</div> <div>9</div>
          </div>
          <div
            className={`section__counter__unit`}
            style={{ '--unit': `-${active + 1 > 9 ? (1 + active) % 10 : active + 1}00%` }}
          >
            <div>0</div> <div>1</div> <div>2</div> <div>3</div> <div>4</div> <div>5</div>
            <div>6</div> <div>7</div> <div>8</div> <div>9</div>
          </div>
          <div className={`section__counter__slide`}>{'|' + (maxLength + 1)}</div>
        </div>
      </div>
      <div className="section__wrapper__btn__scrolldown">
        <a href="#banner">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="56"
            width="56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m12 15.586-4.293-4.293-1.414 1.414L12 18.414l5.707-5.707-1.414-1.414z"></path>
            <path d="m17.707 7.707-1.414-1.414L12 10.586 7.707 6.293 6.293 7.707 12 13.414z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default memo(SlideshowItem);
