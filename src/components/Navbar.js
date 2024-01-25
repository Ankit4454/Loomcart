import React, { useState } from 'react';
import { PiCaretDownThin } from "react-icons/pi";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks";

function Navbar() {
  const auth = useAuth();
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);

  const handleBurgerClick = () => {
    const menu = document.querySelectorAll('.navbar-menu');
    for (let j = 0; j < menu.length; j++) {
      menu[j].classList.toggle('hidden');
    }
  }

  return (<>
    <nav className="relative px-10 py-4 flex justify-between items-center bg-lime-50">
      <Link className="text-3xl font-bold text-teal-800 mr-4 leading-none" to="/">
        loomcart
      </Link>
      <ul
        className="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-2">
        <ul className="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-2">
          <li
            className="relative group cursor-pointer"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <span className="flex items-center text-sm text-teal-800 font-bold navbar-link group-hover:text-teal-700">
              Category<PiCaretDownThin className="text-gray-500 ml-2" />
            </span>
            {isCategoryOpen && (
              <div className="absolute z-10 bg-white py-2 shadow-md w-full rounded-xl">
                <Link
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                  to="/category/kids"
                >
                  Kids
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                  to="/category/man"
                >
                  Man
                </Link>
                <Link
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                  to="/category/women"
                >
                  Women
                </Link>
              </div>
            )}
          </li>
        </ul>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link className="text-sm text-gray-400 hover:text-gray-500 navbar-link" to="/aboutus">Deals</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link className="text-sm text-gray-400 hover:text-gray-500 navbar-link" to="/services">What's New</Link></li>
        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>
        <li><Link className="text-sm text-gray-400 hover:text-gray-500 navbar-link" to="/contact">Delivery</Link></li>
      </ul>
      <div className="rounded-3xl bg-gray-200 overflow-hidden mx-4 flex lg:w-1/4 md:w-1/3">
        <input type="text" className="px-4 py-2 bg-gray-200 w-full outline-none" placeholder="Search Product" />
        <button className="flex items-center justify-center px-4">
          <svg className="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" /></svg>
        </button>
      </div>
      <div className="lg:hidden">
        <button className="navbar-burger flex items-center text-teal-800 p-3" onClick={handleBurgerClick}>
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:items-center lg:ml-auto lg:mr-3 lg:relative lg:group py-2 px-6 bg-gray-100 hover:bg-gray-200 text-sm text-gray-900 font-bold rounded-3xl transition duration-200"
        onMouseEnter={() => setAccountOpen(true)}
        onMouseLeave={() => setAccountOpen(false)}>
        <IoPersonOutline className="mr-2" size={20} /> Account
        {isAccountOpen && (
          <div className="absolute top-9 left-0 z-10 bg-white py-2 shadow-md w-full rounded-xl">
            {!auth.user && <Link
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
              to="/users/signin"
            >
              Login
            </Link>}
            {!auth.user && <Link
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
              to="/users/signup"
            >
              Sign Up
            </Link>}
            {auth.user && <Link
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
              to="/users"
            >
              {auth.user.name}
            </Link>}
            {auth.user && <div
              className="block px-4 cursor-pointer py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
              onClick={auth.logout}
            >
              Logout
            </div>}
          </div>
        )}
      </div>
      <Link className="hidden relative lg:flex lg:items-center py-2 px-6 bg-teal-700 hover:bg-teal-800 text-sm text-white font-bold rounded-3xl transition duration-200"
        to="/users/signup"><MdOutlineAddShoppingCart className="mr-2" size={20} />
        <span className="absolute bg-gray-900 text-gray-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-2">2</span>
        Cart
      </Link>
    </nav>
    <div className="navbar-menu relative z-50 hidden">
      <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={handleBurgerClick}></div>
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-lime-50 border-r overflow-y-auto">
        <div className="flex items-center mb-8">
          <Link className="mr-auto text-3xl text-teal-800 font-bold leading-none" to="/">
            loomcart
          </Link>
          <button className="navbar-close" onClick={handleBurgerClick}>
            <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
              </path>
            </svg>
          </button>
        </div>
        <div>
          <ul>
            <li
              className="relative group cursor-pointer mb-1"
              onClick={() => isCategoryOpen ? setCategoryOpen(false) : setCategoryOpen(true)}
            >
              <Link className="flex items-center p-4 text-sm font-semibold text-gray-400 hover:bg-teal-50 hover:text-teal-800 rounded">
                Category<PiCaretDownThin className="text-gray-500 ml-2" />
              </Link>
              {isCategoryOpen && (
                <div className="absolute z-10 bg-white py-2 shadow-md w-full rounded-xl">
                  <Link
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    to="/category/kids"
                  >
                    Kids
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    to="/category/man"
                  >
                    Man
                  </Link>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    to="/category/women"
                  >
                    Women
                  </Link>
                </div>
              )}
            </li>
            <li className="mb-1">
              <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-teal-50 hover:text-teal-800 rounded"
                to="/aboutus">Deals</Link>
            </li>
            <li className="mb-1">
              <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-teal-50 hover:text-teal-800 rounded"
                to="/services">What's New</Link>
            </li>
            <li className="mb-1">
              <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-teal-50 hover:text-teal-800 rounded"
                to="/contact">Delivery</Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <div className="pt-6">
            <div className="flex items-center relative group cursor-pointer justify-center px-4 py-3 mb-3 leading-loose text-xs font-semibold leading-none bg-gray-100 hover:bg-gray-200 rounded-3xl"
              to="/users/signin"
              onClick={() => isAccountOpen ? setAccountOpen(false) : setAccountOpen(true)}>
              <IoPersonOutline className="mr-2" size={20} /> Account
              {isAccountOpen && (
                <div className="absolute top-10 z-10 bg-white py-2 shadow-md w-full rounded-xl">
                  {!auth.user && <Link
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    to="/users/signin"
                  >
                    Login
                  </Link>}
                  {!auth.user && <Link
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    to="/users/signup"
                  >
                    Sign Up
                  </Link>}
                  {auth.user && <Link
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    to="/users"
                  >
                    {auth.user.name}
                  </Link>}
                  {auth.user && <div
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-teal-50 hover:text-teal-800"
                    onClick={auth.logout}
                  >
                    Logout
                  </div>}
                </div>
              )}
            </div>
            <Link className="flex items-center justify-center px-4 py-3 mb-2 leading-loose text-xs text-white font-semibold bg-teal-700 hover:bg-teal-800 rounded-3xl"
              to="/users/signup"><MdOutlineAddShoppingCart className="mr-2" size={20} /> Cart</Link>
          </div>
          <p className="my-4 text-xs text-center text-gray-400">
            <span>Copyright © 2024</span>
          </p>
        </div>
      </nav>
    </div>
  </>)
}

export default Navbar;