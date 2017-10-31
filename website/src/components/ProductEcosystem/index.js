import React from 'react';
import s from './styles.css';

function ProductEcosystem(props) {
  return (
    <div className={s.module}>
      <div className={s.grid}>
        <div className={s.gridLeft}>
          <img src='/images/familyshot.png' className={s.image}/>
          <div className={s.gridText}>
            <div className={s.title}>
              At home, on the go & on your phone
            </div>
            <div className={s.subtitle}>
               Nether’s vision is to create devices that enable end-to-end privacy to its users.
               Nether hardware technology will allow you access to the LMNOP network and
               will provide higher level of privacy and security.
            </div>
          </div>
        </div>
        <div className={s.gridRight} />
      </div>
    </div>
  );
}

export default ProductEcosystem;
