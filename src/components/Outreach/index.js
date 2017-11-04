import React from 'react';
import s from './styles.css';

const data = [
  { header: 'Network and Privacy Champions', text: 'We are hiring.', link: '#', linkText: 'Apply Now' },
  { header: 'Developers', text: 'Want to contribute?', link: '#', linkText: 'Get In Touch' },
  { header: 'Partners', text: 'Have an idea to help us grow?', link: '#', linkText: 'Reach Out' },
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
