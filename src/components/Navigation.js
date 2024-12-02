import React, { useState } from 'react';
import Link from 'next/link';

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center px-6 py-4 font-medium text-black border-b-2 border-solid border-b-white">

        <div className="flex justify-between w-full lg:w-auto items-center">
          <div className="text-4xl font-semibold uppercase">Brand name</div>

          <div className="lg:hidden cursor-pointer" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>

        <div className="hiddenTailwind lg:flex flex-row gap-6 lg:gap-10 lg:items-center">
          <Link href="/" className="cursor-pointer py-2">Home</Link>
          <Link href="/#our" className="cursor-pointer py-2">About</Link>
          <Link href="/#gallery" className="cursor-pointer py-2">Gallery</Link>
          <Link href="/#service" className="cursor-pointer py-2">Service</Link>
          <Link href="/#product" className="cursor-pointer py-2">Product</Link>
          <Link href="/#follow" className="cursor-pointer py-2">Follow Us</Link>
        </div>

        <div className='flex gap-3'>
        <Link 
            href="/booking" 
            className="hiddenTailwind lg:flex cursor-pointer px-6 py-3 my-auto text-base font-bold uppercase rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:from-blue-600 hover:to-blue-800 transform transition duration-300 ease-in-out"
          >            <div>Book now</div>
          </Link>
          <Link
            href="/login"
            className="hiddenTailwind lg:flex cursor-pointer px-6 py-3 my-auto text-base font-bold uppercase rounded-xl bg-gradient-to-r from-pink-500 to-pink-700 text-white shadow-lg hover:from-pink-600 hover:to-pink-800 transform transition duration-300 ease-in-out"
          >            <div>Login</div>
          </Link>
        </div>
      </div>

      <div
        className={`${isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-10 pointer-events-none'
          } lg:hidden bg-white p-4 absolute top-16 left-0 right-0 shadow-lg z-50 transition-all duration-500 ease-in-out`}
      >
        <Link href="/" className="block py-2 text-lg text-center">Home</Link>
        <Link href="/#our" className="block py-2 text-lg text-center">About</Link>
        <Link href="/#gallery" className="block py-2 text-lg text-center">Gallery</Link>
        <Link href="/#service" className="block py-2 text-lg text-center">Service</Link>
        <Link href="/#product" className="block py-2 text-lg text-center">Product</Link>
        <Link href="/#follow" className="block py-2 text-lg text-center">Follow Us</Link>
        <Link href="/booking" className="block py-2 text-lg text-center text-black border-t mt-4 pt-2">Book Now</Link>
        <Link href="/login" className="block py-2 text-lg text-center">Login</Link>
      </div>
    </div>
  );
}

export default Navigation;
