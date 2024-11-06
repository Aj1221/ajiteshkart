import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo.png';
import avatarPlaceholder from '../../assets/avatar.png'; 
import 'react-toastify/dist/ReactToastify.css'; 

import './Navbar.css';

const Navbar = ({ setSelectedNav, selectedNav, setIsAuthenticated, userEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logout successful');
      
      
      setTimeout(() => {
        setIsAuthenticated(false);
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectNav = (select) => {
    setSelectedNav(select)
    setIsMenuOpen(!isMenuOpen);

  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
        <li
          className={`nav-item ${selectedNav === 'home' ? 'active' : ''}`}
          onClick={() => handleSelectNav('home')}
        >
          Home
        </li>
        <li
          className={`nav-item ${selectedNav === 'cart' ? 'active' : ''}`}
          onClick={() => handleSelectNav('cart')}
        >
          Cart
        </li>
      </ul>
      
      <div className="avatar-container" onClick={toggleDropdown}>
        <img src={avatarPlaceholder} alt="Avatar" className="avatar" />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <p className="dropdown-email">{userEmail}</p>
            <button className="dropdown-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
