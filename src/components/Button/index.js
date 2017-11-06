import React from 'react';

import s from './styles.css';

function Button(props) {
  return (
    <div
      className={s.button}
      onClick={props.onClick}
    >
      {props.text}
    </div>
  );
}

export default Button;
