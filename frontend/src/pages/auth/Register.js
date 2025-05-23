import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook de navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');  // Réinitialiser les erreurs à chaque tentative d'inscription

    try {
      const response = await axios.post('http://localhost:8000/api/register', form);

      const { token, user } = response.data;

      // Sauvegarde du token et de l'utilisateur dans le stockage local
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Naviguer vers la page des clubs après inscription
      navigate('/clubs');
    } catch (err) {
      // Gestion des erreurs d'inscription
      setError('Erreur lors de l\'inscription : ' + err.response.data.message);
      console.log(err.response.data);
    }
  };

  return (
    <div className="register-form">
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Nom :</label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Email :</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Mot de passe :</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Confirmer le mot de passe :</label>
          <input 
            type="password" 
            name="password_confirmation" 
            value={form.password_confirmation} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>

      <p>Déjà un compte ? <a href="/login">Se connecter</a></p>
    </div>
  );
}

export default Register;
