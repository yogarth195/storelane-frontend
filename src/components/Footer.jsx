import React from "react";
import {useLocation } from 'react-router-dom'
export const Footer = ({isSidebarVisible}) => {
  const location = useLocation();


  if(location.pathname.startsWith('/seller')) {
    return null;
  }
  return (
    <footer className={`bg-black text-white py-12 sticky`}>
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Section 1 */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Address</h3>
          <ul>
            <li><a href="#" className="hover:text-gray-400">Khasra No.18 Ground Floor Shop No. 3</a></li>
            <li><a href="#" className="hover:text-gray-400">New Delhi, India</a></li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Email Inquiry: </h3>
          <ul>
            <li><a href="mailto:yogarthkankheria@gmail.com" className="hover:text-gray-400">storelaneofficial@gmail.com</a></li>
            <li><a href="#" className="hover:text-gray-400">yogarthkankherya@gmail.com</a></li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <ul>
            <li><a href="tel:8076456925" className="hover:text-gray-400">+91-9278518500</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright section */}
      <div className="text-center mt-6 text-sm text-gray-400">
        <p>© 2025 storelane. All rights reserved.</p>
      </div>
    </footer>
  );
};


