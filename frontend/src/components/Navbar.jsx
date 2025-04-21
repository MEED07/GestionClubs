import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const isAdminGeneral = user && user.role === 'admin_general';

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

  return (
    <nav>
      <ul>
        {user && (
          <li><strong>Bienvenue, {user.name}</strong></li>
        )}

        {isAdminGeneral && (
          <>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/users">Utilisateurs</Link></li>
            <li><Link to="/admin/clubs/add">Ajouter un Club</Link></li>
          </>
        )}

        {!token && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {token && (
          <li>
            <button onClick={handleLogout}>Déconnexion</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
