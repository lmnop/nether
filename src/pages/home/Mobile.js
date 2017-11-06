import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import IconRowMobile from '../../components/IconRowMobile';
import PopupMobile from '../../components/PopupMobile';
import Button from '../../components/Button';

import content from './content';

import s from './mobile.css';

class Mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <div className={s.container}>
        <div className={s.moduleGrid}>
          <div className={s.gridGrid}>
            <div className={s.leftHeader}>
              <div className={s.logoHeader}>
                <img src="images/logo.png" className={s.imageHeader} />
              </div>
            </div>
            <div className={s.gridTextGrid}>
              <div className={s.titleGrid}>
                {content.grid.title}
              </div>
              <div className={s.subtitleGrid}>
                {content.grid.text}
              </div>
              <Button
                text="Order Alpha"
                onClick={this.toggleModal.bind(this)}
              />
            </div>
          </div>
        </div>
        <div className={s.modulePrivacy}>
          <div className={s.gridPrivacy}>
            <div className={s.titlePrivacy}>
              {content.privacy.title}
            </div>
            <IconRowMobile data={content.privacy.icons} />
            <div className={s.subtitlePrivacy}>
              {content.privacy.text}
            </div>
            <a target="_blank" href='https://lmnop.network' className={s.linkPrivacy}>
              Check out L|M|N|O|P
            </a>
          </div>
        </div>
        <div className={s.moduleDataPlan}>
          <div className={s.gridDataPlan}>
            <img src='/images/mdb.png' className={s.imageDataPlan} />
            <div className={s.gridTextDataPlan}>
              <div className={s.titleDataPlan}>
                {content.plan.title}
              </div>
              <div className={s.subtitleDataPlan}>
                 {content.plan.text}
              </div>
            </div>
          </div>
        </div>
        <div className={s.moduleProductEcosystem}>
          <div className={s.gridProductEcosystem}>
            <div className={s.gridTopProductEcosystem}>
              <img src="images/familyshotmobile.png" className={s.imageProductEcosystem} />
            </div>
            <div className={s.gridTextProductEcosystem}>
              <div className={s.titleProductEcosystem}>
                {content.products.title}
              </div>
              <div className={s.subtitleProductEcosystem}>
                 {content.products.text}
              </div>
            </div>
          </div>
        </div>
        <div className={s.moduleHotspot}>
          <div className={s.gridHotspot}>
            <div className={s.rowHotspot}>
              <div className={s.leftTitleHotspot} />
              <div className={s.rightTitleHotspot}>
                Nether Spot
              </div>
            </div>
            <img src="images/spot.png" className={s.imageHotspot} />
          </div>
          <div className={s.gridTextHotspot}>
            <div className={s.titleHotspot}>
              {content.spot.title}
            </div>
            <div className={s.subtitleHotspot}>
               {content.spot.text}
            </div>
          </div>
          <IconRowMobile data={content.spot.icons} />
        </div>
        <div className={s.moduleRouter}>
          <div className={s.gridRouter}>
            <div className={s.rowRouter}>
              <div className={s.leftTitleRouter}>
                Nether Node
              </div>
              <div className={s.rightTitleRouter} />
            </div>
            <img src="images/node.png" className={s.imageRouter} />
          </div>
          <div className={s.gridTextRouter}>
            <div className={s.titleRouter}>
              {content.router.title}
            </div>
            <div className={s.subtitleRouter}>
              {content.router.text}
            </div>
          </div>
          <IconRowMobile data={content.router.icons} />
        </div>
        <div className={s.modulePhone}>
          <div className={s.gridPhone}>
            <div className={s.rowPhone}>
              <div className={s.leftTitleHotspot} />
              <div className={s.rightTitleHotspot}>
                Nether Phone
              </div>
            </div>
            <img src="images/phones.png" className={s.imagePhone} />
          </div>
          <div className={s.gridTextPhone}>
            <div className={s.titlePhone}>
              {content.phone.title}
            </div>
            <div className={s.subtitlePhone}>
              {content.phone.text}
            </div>
          </div>
          <IconRowMobile data={content.phone.icons} />
        </div>
        <div className={s.moduleOutreach}>
          <div className={s.gridOutreach}>
            <div className={s.gridTopOutreach}>
              <div className={s.gridTextOutreach}>
                <div className={s.titleOutreach}>
                  Join Us
                </div>
                <div className={s.subtitleOutreach}>
                    We are looking for like minded individuals that share our vision.
                </div>
              </div>
            </div>
            <div className={s.gridBottomOutreach}>
              <div className={s.rowOutreach}>
                <div className={s.itemOutreach}>
                  <div className={s.headerOutreach}>
                    Network and Privacy Champions
                  </div>
                  <div className={s.textOutreach}>
                    We are hiring.
                  </div>
                  <a href='#' className={s.linkOutreach}>
                    Apply Now
                  </a>
                </div>
                <div className={s.itemOutreach}>
                  <div className={s.headerOutreach}>
                    Developers
                  </div>
                  <div className={s.textOutreach}>
                    Want to contribute?
                  </div>
                  <a href='#' className={s.linkOutreach}>
                    Get In Touch
                  </a>
                </div>
                <div className={s.itemOutreach}>
                  <div className={s.headerOutreach}>
                    Partners
                  </div>
                  <div className={s.textOutreach}>
                    Have an idea to help us grow?
                  </div>
                  <a href='#' className={s.linkOutreach}>
                    Reach Out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.moduleFooter}>
          <div className={s.gridFooter}>
            <img src='images/logotext.png' className={s.logoFooter} />
            <a href='#' className={s.linkFooter}>Investors</a>
            <a href='#' className={s.linkFooter}>Partners</a>
            <a href='#' className={s.linkFooter}>Developers</a>
          </div>
        </div>
        <PopupMobile
          isModalOpen={this.state.isModalOpen}
          onClick={this.toggleModal.bind(this)}
        />
      </div>
    );
  }
}

export default Mobile;
