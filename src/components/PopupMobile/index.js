import React from 'react';
import ReactModal from 'react-modal';
import s from './styles.css';

const style = {
  overlay : {
    zIndex: 10000,
  },
};


function Popup(props) {
  return (
    <ReactModal
      isOpen={props.isModalOpen}
      style={style}
    >
      <div className={s.container}>
        <div className={s.top}>
          <div className={s.header}>
            <div className={s.title}>
              Alpha
            </div>
            <div className={s.subtitle}>
              0.3 Ether
            </div>
          </div>
          <div className={s.close} onClick={props.onClick}>
            <img src="images/close.png" className={s.closeButton} />
          </div>
        </div>
        <div className={s.bottom}>
          <form className={s.form}>
            <a href="#" className={s.link}>
              Comming Soon!
            </a>
            <textarea type="text" className={s.input} placeholder="Account Phrase" />
            <input type="Password" className={s.input} placeholder="Account Password" />
            <input type="text" className={s.input} placeholder="Pick-Up Country" />
            <input type="text" className={s.input} placeholder="Pick-Up Postal Code" />
            <div className={s.blurb}>
              We are working to deliver all devices without knowing too much about you. We call this anonymous delivery.
            </div>

            <div className={s.addition}>
              <div className={s.line}>
                <div className={s.lineTitle}>
                  Device
                </div>
                <div className={s.lineAmount}>
                  0.3000
                </div>
              </div>
              <div className={s.line}>
                <div className={s.lineTitle}>
                  Estimated Gas
                </div>
                <div className={s.lineAmount}>
                  0.0015
                </div>
              </div>
              <div className={s.lineBreak} />
              <div className={s.lineBig}>
                <div className={s.lineTitle}>
                  Total Ether
                </div>
                <div className={s.lineAmount}>
                  0.3015
                </div>
              </div>
            </div>
            <input type="submit" value="Purchase Device" className={s.formButton} />
          </form>
          <div className={s.techSpecs}>
            <div className={s.block}>
              <div className={s.blockTitle}>
                Tech Specs
              </div>
              <div className={s.blockStat}>
                4G LTE
              </div>
              <div className={s.blockStat}>
                256+ Country Data Roaming
              </div>
            </div>
            <div className={s.block}>
              <div className={s.blockTitle}>
                Bonus Reward
              </div>
              <div className={s.blockStat}>
                Data usage during the Alpha will be used to proportionally give out MNO token rewards. 
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default Popup;
