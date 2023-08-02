import PropTypes from 'prop-types';
import { memo, useState } from 'react';

import SlideshowItem from './Slideshow';
import { BTN_SLIDESHOW_TEXT } from '../../constants';
import './slide.scss';

Slide.propTypes = {
  dataSlides: PropTypes.array,
};

function Slide({ dataSlides }) {
  const [active, setActive] = useState(0);
  const array = [
    'ani-rotate',
    'ani-translateX',
    'ani-translateY',
    'ani-opacity',
    'ani-rotate2',
    'ani-translateX2',
    'ani-translateY2',
    'ani-rotate3',
  ];
  const aniName = array[Math.floor(Math.random() * array.length)];
  const aniInfo = array[Math.floor(Math.random() * array.length)];
  const aniLink = array[Math.floor(Math.random() * array.length)];
  const callbackFunction = (childData) => {
    setActive(childData);
  };
  return (
    <SlideshowItem parentCallback={callbackFunction}>
      {dataSlides.map((item, index) => (
        <div
          key={index}
          className={
            index === active ? 'section__item section__item--active' : 'section__item'
          }
        >
          <picture>
            <source media="(max-width:465px)" srcSet={item.img_mb} />
            <img src={item.img} alt="img" className="section__item__img" />
          </picture>
          <div
            className={
              index === active ? 'active section__item__txt' : 'section__item__txt'
            }
          >
            <div
              className="section__item__txt__name"
              style={{ '--ani-name': `${aniName}` }}
            >
              <span>{item.name}</span>
            </div>
            <div
              className="section__item__txt__info"
              style={{ '--ani-info': `${aniInfo}` }}
            >
              <h2 className="section__item__txt__info--h2">{item.info}</h2>
            </div>
            <div
              className="section__item__txt__link"
              style={{ '--ani-link': `${aniLink}` }}
            >
              <a className="section__item__txt__link--a" href={item.link}>
                {BTN_SLIDESHOW_TEXT}
              </a>
            </div>
          </div>
        </div>
      ))}
    </SlideshowItem>
  );
}

export default memo(Slide);
