import React from 'react';
import PropTypes from 'prop-types';
import { BANNER_HEIGHT } from '../../constants';
BannerRight.propTypes = {
  dataBanner: PropTypes.string,
};

function BannerRight({ dataBanner }) {
  return (
    <div>
      <div
        style={{
          width: '100%',
          height: `${BANNER_HEIGHT}px`,
          backgroundImage: `url('${dataBanner}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    </div>
  );
}

export default BannerRight;
