import React from 'react';
import Header from '../components/header_footer/header';

const Layout = props => {
  return (
    <div>
      <Header />
      {props.children}
      footer
    </div>
  );
};

export default Layout;
