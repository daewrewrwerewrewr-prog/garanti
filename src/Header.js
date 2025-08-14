import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/giris');
  };

  return (
    <header id="header" className="transform-header">
      <div className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <a
              className="navbar-brand"
              href="#0"
              onClick={handleLogoClick}
            >
              <img
                className="only-mobile-2x-logo"
                alt="Garanti BBVA"
              />
            </a>
          </div>
          <div className="navbar-collapse text-right">
            <ul className="nav navbar-nav pull-right">
              <li className={`dropdown ${isOpen ? 'active open' : 'active'}`}>
                <a
                  href="#0"
                  className="dropdown-toggle btn mobile-hover"
                  role="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls="header-dropdown-menu"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown();
                  }}
                >
                  Bireysel <i className="icons icons-arrow-down"></i>
                </a>
                {isOpen && (
                  <ul
                    id="header-dropdown-menu"
                    className="dropdown-menu"
                    role="menu"
                  >
                    <li role="presentation">
                      <a
                        role="menuitem"
                        tabIndex="-1"
                        href="#0"
                        onClick={(e) => e.preventDefault()}
                      >
                        Bireysel
                      </a>
                    </li>
                    <li role="presentation">
                      <a
                        role="menuitem"
                        tabIndex="-1"
                        href="#0"
                        onClick={(e) => e.preventDefault()}
                      >
                        Kurumsal
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
