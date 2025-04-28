import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
