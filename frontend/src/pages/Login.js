import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      // Sauvegarder le token et les infos utilisateur
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Rediriger selon le rôle
      switch (user.role) {
        case 'visiteur':
          navigate('/clubs');
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
    <div className="login-form">
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mot de passe :</label  >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
