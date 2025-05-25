import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Form Section */}
        <div className="footer-section">
          <h3>Contactez-nous</h3>
          <form className="contact-form">
            <input type="email" placeholder="Votre email" required />
            <textarea placeholder="Votre message" required></textarea>
            <button type="submit" className="submit-btn">Envoyer</button>
          </form>
        </div>

        {/* Clubs Section */}
        <div className="footer-section">
          <h3>Clubs</h3>
          <ul>
            <li><Link to="/clubs/sport">Club Sportif</Link></li>
            <li><Link to="/clubs/environnement">Club Environnement</Link></li>
            <li><Link to="/clubs/musique">Club Musique</Link></li>
            <li><Link to="/clubs/solidarite">Club Solidarité</Link></li>
          </ul>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <ul>
            <li><Link to="/about">À Propos</Link></li>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-bar">
        <p>&copy; 2025 Gestion des Clubs. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;