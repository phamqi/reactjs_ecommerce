import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

MyLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
};

function MyLink({ href, children, className, title }) {
  const navigate = useNavigate();
  const myNavigate = () => {
    let myHref = {
      pathname: href,
    };
    navigate(myHref);
  };
  return (
    <a onClick={myNavigate} className={className} title={title}>
      {children}
    </a>
  );
}

export default MyLink;
