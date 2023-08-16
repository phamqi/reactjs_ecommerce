import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

CreateNavigate.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
};

function CreateNavigate({ href, children, className, title }) {
  const navigate = useNavigate();
  const myNavigate = () => {
    let myHref = {
      pathname: href,
    };
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    navigate(myHref);
  };
  return (
    <div onClick={myNavigate} className={className} title={title}>
      {children}
    </div>
  );
}

export default CreateNavigate;
