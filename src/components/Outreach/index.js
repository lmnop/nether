import React from 'react';
import s from './styles.css';

const data = [
  { header: 'NETWORK AND PRIVACY CHAMPIONS', text: 'We are hiring.', link: 'mailto:connect@lmnop.co', linkText: 'Apply Now' },
  { header: 'DEVELOPERS', text: 'Want to contribute?', link: 'https://github.com/lmnop', linkText: 'Checkout our code' },
  { header: 'PARTNERS', text: 'Have an idea to help us grow?', link: 'mailto:connect@lmnop.co', linkText: 'Reach Out' },
]

const renderRow = () => {
  const items = data.map((item, key) => {
    return (
      <div
        key={key}
        className={s.item}
      >
        <div className={s.header}>
          {item.header}
        </div>
        <div className={s.text}>
          {item.text}
        </div>
        <a href={item.link} className={s.link}>
          {item.linkText}
        </a>
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

function Outreach(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridTop}>
          <div className={s.gridText}>
            <div className={s.title}>
              Join Us
            </div>
            <div className={s.subtitle}>
              We are looking for like minded individuals that share our vision.
            </div>
          </div>
        </div>
        <div className={s.gridBottom}>
          {renderRow()}
        </div>
      </div>
    </div>
  );
}

export default Outreach;
