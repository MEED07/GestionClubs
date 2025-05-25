import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      switch (user.role) {
        case 'visiteur':
          navigate('/');
          break;
        case 'participant':
          navigate('/activites');
          break;
        case 'admin_club':
          navigate('/admin-club/dashboard');
          break;
        case 'admin_general':
          navigate('/admin-general/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="login-container">
      {/* Image de fond */}
      <div className="background-image-container">
        <img
          src="https://res.cloudinary.com/dkueh21ti/image/upload/v1748032027/q9kyl8mpeqjvycohvfmx.png"
          alt="Étudiant guitare"
          className="background-image"
        />
        <div className="background-overlay"></div>
      </div>

      {/* Formulaire de connexion */}
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <h1 className="login-title">Connexion</h1>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Connexion
            </button>
            <div className="form-links">
              <a href="/register" className="register-link" >S'inscrire?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;