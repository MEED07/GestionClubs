import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation basique côté client
    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;

    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', form);
      console.log(response.data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/clubs');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError("Erreur : " + err.response.data.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Image de fond */}
      <div className="background-image-container">
        <img
          src="https://res.cloudinary.com/dkueh21ti/image/upload/v1748032027/image_fx_25_iqguqy.png"
          alt="Étudiante échecs"
          className="background-image"
        />
        <div className="background-overlay"></div>
      </div>

      {/* Formulaire d'inscription */}
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <h1 className="register-title">Inscription</h1>
          
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading-message">Chargement...</div>}

          <form onSubmit={handleRegister} className="register-form">
            <div className="form-row">
              <div className="form-group half-width">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group half-width">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirmer le mot de passe</label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Inscription...' : "S'INSCRIRE"}
            </button>

            <div className="form-links">
              <a href="/login" className="login-link">Vous avez déjà un compte ?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
