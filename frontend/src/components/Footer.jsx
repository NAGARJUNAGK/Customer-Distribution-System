// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center fixed-bottom py-3 mt-5">
      <p className="mb-0">© {new Date().getFullYear()} — Developed by Nagarjuna GK</p>
    </footer>
  );
};

export default Footer;
