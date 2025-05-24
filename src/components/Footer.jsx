import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content w-full z-10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
  {/* Logo and copyright */}
  <aside className="flex items-center gap-2 justify-center sm:justify-start text-sm">
    <span className="text-2xl">#</span>
    <p>© {new Date().getFullYear()} - All rights reserved</p>
  </aside>

  {/* Social icons */}
  <nav className="flex justify-center gap-4 text-xl">
    <a><i className="fab fa-twitter"></i></a>
    <a><i className="fab fa-youtube"></i></a>
    <a><i className="fab fa-facebook"></i></a>
  </nav>
</footer>

  );
};

export default Footer;
