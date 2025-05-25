import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Charger les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError('Erreur lors du chargement des utilisateurs');
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  // Ajouter un nouvel utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/api/users',
        { email, role, password: 'password123' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers([...users, response.data]);
      setEmail('');
      setRole('');
    } catch (error) {
      setError('Erreur lors de l\'ajout de l\'utilisateur');
      console.error(error);
    }
  };

  // Mettre à jour un utilisateur
  const handleEditUser = (user) => {
    setEmail(user.email);
    setRole(user.role);
    setEditingUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${editingUser.id}`,
        { email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? response.data : user
      );
      setUsers(updatedUsers);
      setEmail('');
      setRole('');
      setEditingUser(null);
    } catch (error) {
      setError('Erreur lors de la mise à jour de l\'utilisateur');
      console.error(error);
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      setError('Erreur lors de la suppression de l\'utilisateur');
      console.error(error);
    }
  };

  // Fonction pour obtenir la classe CSS du rôle
  const getRoleClass = (role) => {
    switch (role) {
      case 'admin_general':
        return 'role-badge role-admin-general';
      case 'admin_club':
        return 'role-badge role-admin-club';
      case 'participant':
        return 'role-badge role-participant';
      case 'visiteur':
        return 'role-badge role-visiteur';
      default:
        return 'role-badge';
    }
  };

  return (
    <div className="user-management-container">
      <h2 className="user-management-title">Gestion des utilisateurs</h2>
      <p className="user-management-description">
        Gérez les utilisateurs de votre plateforme en ajoutant, modifiant ou supprimant des comptes.
      </p>

      {error && <div className="error-message">{error}</div>}

      <form className="user-form" onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <div className="form-group">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Sélectionner le rôle</option>
            <option value="admin_general">Admin Général</option>
            <option value="admin_club">Admin Club</option>
            <option value="participant">Participant</option>
            <option value="visiteur">Visiteur</option>
          </select>
          <button className="form-button" type="submit">
            {editingUser ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td className="no-users" colSpan="5">Aucun utilisateur trouvé</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={getRoleClass(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEditUser(user)}>
                        Éditer
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;