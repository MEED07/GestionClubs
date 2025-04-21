import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
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
        <button type="submit">{editingUser ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Editer</button>
                <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
