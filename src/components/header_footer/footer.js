import React from 'react';

import { CityLogo } from '../ui/icons';

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo="/" width="70px" height="70px" />
      </div>

      <div className="footer_descl">Manchester city 2019.All reserved</div>
    </footer>
  );
};

export default Footer;
