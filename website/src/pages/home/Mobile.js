import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';

import Header from '../../components/Header';
import IconRowMobile from '../../components/IconRowMobile';
import PopupMobile from '../../components/PopupMobile';

import s from './mobile.css';

const iconRowPrivacy = [
  { src: 'images/identity.png', text: 'Anonymous Identity'},
  { src: 'images/security.png', text: 'Security Encryption'},
  { src: 'images/access.png', text: 'Global Access'},
  { src: 'images/mobility.png', text: 'Mobility Enabled'},
];

const iconRowHotspot = [
  { src: 'images/wifi.png', text: '4G / LTE WI-FI'},
  { src: 'images/connect.png', text: 'Connect up to 5 devices'},
  { src: 'images/water.png', text: 'Water Resistant'},
  { src: 'images/dapp.png', text: 'Integrated Dapp'},
];

const iconRowRouter = [
  { src: 'images/wifi.png', text: '4G / LTE WI-FI'},
  { src: 'images/connect.png', text: 'Connect up to 20 devices'},
  { src: 'images/battery.png', text: 'Battery Reserve'},
  { src: 'images/vpn.png', text: 'Built-In VPN'},
];

const iconRowPhone = [
  { src: 'images/wifi.png', text: '4G / LTE WI-FI'},
  { src: 'images/nether.png', text: 'Nether OS'},
  { src: 'images/vpn.png', text: 'Built-In VPN'},
  { src: 'images/dapp.png', text: 'Integrated Dapp'},
];



class Mobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: true,
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
                Get off the grid
              </div>
              <div className={s.subtitleGrid}>
                The future of blockchain is almost here. Order Alpha to get started.
              </div>
            </div>
            <div className={s.linksGrid}>
              <a href="#" className={s.simpleLinkGrid}>My Manager</a>
              <div
                className={s.borderLinkGrid}
                onClick={this.toggleModal.bind(this)}
              >
                Order Alpha
              </div>
            </div>
          </div>
        </div>
        <div className={s.modulePrivacy}>
          <div className={s.gridPrivacy}>
            <div className={s.titlePrivacy}>
              The right to privacy exists for all people
            </div>
            <IconRowMobile data={iconRowPrivacy} />
            <div className={s.subtitlePrivacy}>
              LMNOP is a next generation mobile data network on the blockchain.
              It is built to give consumers control over their devices, the
              agreements they enter into, and the network itself.
            </div>
            <a href='#' className={s.linkPrivacy}>
              Check out LMNOP
            </a>
          </div>
        </div>
        <div className={s.moduleDataPlan}>
          <div className={s.gridDataPlan}>
            <img src='/images/mdb.png' className={s.imageDataPlan} />
            <div className={s.gridTextDataPlan}>
              <div className={s.titleDataPlan}>
                A universal data plan
              </div>
              <div className={s.subtitleDataPlan}>
                 The first hardware powered by the Mobile Data Byte Token.
                 MDB Token will be a universal token for mobile data
                 enabling anyone to access the LMNOP Network.
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
                At home, on the go & on your phone
              </div>
              <div className={s.subtitleProductEcosystem}>
                 Nether’s vision is to create devices that enable end-to-end privacy to its users.
                 Nether hardware technology will allow you access to the LMNOP network and
                 will provide higher level of privacy and security.
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
              Portable Privacy
            </div>
            <div className={s.subtitleHotspot}>
               Nether Designed Mobile Hotspot built for getting you off the grid even when you’re on it.
            </div>
          </div>
          <IconRowMobile data={iconRowHotspot} />
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
              Privacy in your Home, Office & Enterprise
            </div>
            <div className={s.subtitleRouter}>
              Nether Designed Stationary Hotspot built for privacy for all
              your devices at home and/or office. Connect Up to 20 devices.
            </div>
          </div>
          <IconRowMobile data={iconRowRouter} />
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
              Your phone, your life
            </div>
            <div className={s.subtitlePhone}>
              Nether designed phone decentralizes not just your data but your life.
            </div>
          </div>
          <IconRowMobile data={iconRowPhone} />
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
