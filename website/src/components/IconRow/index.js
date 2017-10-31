import React from 'react';
import s from './styles.css';

function IconRow(props) {
  const items = props.data.map((item, key) => {
    return (
      <div
        key={key}
        className={s.item}
      >
        <img src={item.src} className={s.itemImage} />
        <span className={s.itemTitle}>
          {item.text}
        </span>
      </div>
    );
  });

  return (
    <div className={s.row}>
      <div className={s.container}>
        {items}
      </div>
    </div>
  );
}

export default IconRow;
