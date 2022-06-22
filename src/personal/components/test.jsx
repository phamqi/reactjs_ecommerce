import { WindowTwoTone } from '@mui/icons-material';
import { current } from '@reduxjs/toolkit';
import React, { memo, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Test(props) {
  const [counter, setCounter] = useState(0);
  var i;
  const [data, setData] = useState('');
  const [timer, setTimer] = useState(100);
  const prevData =
    '<per>' +
    '/// Hi wave &#9996;' +
    '<br>' +
    '<per>' +
    'const ' +
    '<per>' +
    ' person  ' +
    '<per>' +
    ' = ' +
    '{' +
    '<br>' +
    '<per>' +
    'name: ' +
    '<per>' +
    '"Pham"' +
    '<per>' +
    ',' +
    '<br>' +
    '<per>' +
    'birthDay: ' +
    '<per>' +
    '24/5/1998' +
    '<per>' +
    ',' +
    '<br>' +
    '<per>' +
    'gender: ' +
    '<per>' +
    '"Male"' +
    '<per>' +
    ',' +
    '<br>' +
    '<per>' +
    'github: ' +
    '<a href="https://www.google.com">' +
    'alo' +
    '</a>' +
    'skr';
  //   const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;
  const person = {
    name: 'Pham',
    birthDay: 24 / 5 / 1998,
    gender: 'male',
    github: 'link',
  };
  const timeoutRef = useRef(null);
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      if (counter < prevData.length) {
        setData(data + prevData.charAt(counter));
        setCounter(counter + 1);
        if (counter > 169 && counter < 202) {
          setTimer(1);
        }
      }
      console.log('string', data);
      console.log(counter);
    }, timer);
    return () => {
      resetTimeout();
    };
  });
  return (
    <>
      <div
        id="div_content"
        className="vscode_content_code_body_my_profile"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <span></span>
    </>
  );
}

export default memo(Test);
