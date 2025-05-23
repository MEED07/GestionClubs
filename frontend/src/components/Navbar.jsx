import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Pour détecter la page actuelle
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const isAdminGeneral = user && user.role === 'admin_general';
  const isAdminClub = user && user.role === 'admin_club';

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

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav>
      <ul>
        {user && (
          <li><strong>Bienvenue, {user.name}</strong></li>
        )}

        {isAdminGeneral && (
          <>
            <li className={isActive('/admin')}><Link to="/admin">Dashboard</Link></li>
            <li className={isActive('/admin/users')}><Link to="/admin/users">Utilisateurs</Link></li>
            <li className={isActive('/admin/clubs/add')}><Link to="/admin/clubs/add">Ajouter un Club</Link></li>
          </>
        )}

        {isAdminClub && (
          <>
          <li className={isActive('/admin-club/dashboard')}>
          <Link to="/admin-club/dashboard">List Clubs</Link>
        </li>

        <li className={isActive('/admin/evenements')}>
        <Link to="/admin/evenements">List Evenements</Link>
        </li>

        <li className={isActive('/admin/demandes')}>
        <Link to="/admin/demandes">List demandes</Link>
        </li>
        </>
        )}


        {!token && (
          <>
            <li className={isActive('/login')}><Link to="/login">Login</Link></li>
            <li className={isActive('/register')}><Link to="/register">Register</Link></li>
          </>
        )}

        {token && (
          <li>
            <button onClick={handleLogout}>Déconnexion</button>
          </li>
        )}
      </ul>

      <style jsx>{`
        nav ul {
          list-style: none;
          padding: 0;
        }

        nav li {
          margin: 10px;
        }

        .active {
          font-weight: bold;
          color: #007bff;
        }

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: red;
        }

        /* Ajouter un peu de responsive */
        @media (max-width: 768px) {
          nav ul {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          nav li {
            margin: 5px 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
