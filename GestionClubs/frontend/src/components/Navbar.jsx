import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const isAdminGeneral = user && user.role === 'admin_general';

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Clubs", href: "/clubs" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <img src={assets.logo} alt="Logo" />
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Admin Links */}
            {isAdminGeneral && (
              <>
                <Link to="/admin" className="nav-link">Dashboard</Link>
                <Link to="/admin/users" className="nav-link">Utilisateurs</Link>
                <Link to="/admin/clubs/add" className="nav-link">Ajouter un Club</Link>
              </>
            )}
          </div>

          {/* Auth Links */}
          <div className="user-profile">
            {user ? (
              <>
                <span className="user-name">Bienvenue, {user.name}</span>
                <button onClick={handleLogout} className="auth-button">Déconnexion</button>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link">Connexion</Link>
                <Link to="/register" className="auth-link">Inscription</Link>
              </div>
            )}
          </div>

          {/* Hamburger Button - Mobile only */}
          <button onClick={toggleMenu} className="mobile-menu-button">
            <img src={assets.menu_icon} alt="Menu" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {isAdminGeneral && (
                <>
                  <Link to="/admin" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <Link to="/admin/users" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Utilisateurs</Link>
                  <Link to="/admin/clubs/add" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Ajouter un Club</Link>
                </>
              )}
              
              {/* Mobile Auth Links */}
              <div className="mobile-profile">
                {user ? (
                  <>
                    <div className="mobile-profile-text">Bienvenue, {user.name}</div>
                    <button onClick={handleLogout} className="mobile-nav-link">Déconnexion</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Connexion</Link>
                    <Link to="/register" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Inscription</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}