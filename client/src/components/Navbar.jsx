import React, { useState, useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

const NavBarItem = ({ title, classprops, isAnimating }) => (
  <li className={`mx-4 cursor-pointer transition-all duration-300 hover:text-blue-400 ${classprops} ${isAnimating ? 'menu-item animate-in' : ''}`}>
    {title}
  </li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleMenuToggle = () => {
    if (toggleMenu) {
      // Closing menu
      setIsClosing(true);
      setTimeout(() => {
        setToggleMenu(false);
        setIsClosing(false);
        setIsAnimating(false);
      }, 300); // Match animation duration
    } else {
      // Opening menu
      setToggleMenu(true);
      setIsAnimating(true);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleMenu && !event.target.closest('.mobile-menu-container')) {
        handleMenuToggle();
      }
    };

    if (toggleMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [toggleMenu]);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 relative">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      
      {/* Desktop Menu */}
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="flex relative mobile-menu-container">
        <div 
          className="text-white md:hidden cursor-pointer mobile-menu-button"
          onClick={handleMenuToggle}
        >
          {!toggleMenu ? (
            <HiMenuAlt4 
              fontSize={28} 
              className={`transition-all duration-300 ${isAnimating ? 'animate-rotate-in' : ''}`}
            />
          ) : (
            <AiOutlineClose 
              fontSize={28} 
              className={`transition-all duration-300 ${isClosing ? 'animate-rotate-out' : 'animate-rotate-in'}`}
            />
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {toggleMenu && (
          <>
            {/* Backdrop */}
            <div 
              className={`fixed inset-0 z-40 mobile-menu-backdrop ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
              onClick={handleMenuToggle}
            />
            
            {/* Menu Panel */}
            <ul
              className={`z-50 fixed top-0 right-0 p-6 w-[85vw] max-w-sm h-screen shadow-2xl md:hidden list-none
                flex flex-col justify-start items-start rounded-l-2xl mobile-menu-glassmorphism text-white
                ${isClosing ? 'animate-slide-out' : 'animate-slide-in'}`}
            >
              {/* Close Button */}
              <li className="text-2xl w-full mb-6 flex justify-end">
                <AiOutlineClose 
                  onClick={handleMenuToggle}
                  className="cursor-pointer hover:text-red-400 transition-colors duration-200 hover:scale-110"
                />
              </li>
              
              {/* Menu Items */}
              {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                <NavBarItem 
                  key={item + index} 
                  title={item} 
                  classprops="my-3 text-lg font-medium hover:text-blue-400 transition-all duration-300 hover:translate-x-2" 
                  isAnimating={isAnimating}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;