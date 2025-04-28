import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>StayEase | All Rights Reserved &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
