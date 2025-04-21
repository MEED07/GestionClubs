import React, { useEffect, useState } from 'react';

const AddClub = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [adminClubId, setAdminClubId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Récupérer les utilisateurs avec le rôle admin_club
    const fetchAdmins = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        const filtered = data.filter(user => user.role === 'admin_club');
        setAdmins(filtered);
      } catch (error) {
        console.error('Erreur lors du chargement des administrateurs :', error);
      }
    };

    fetchAdmins();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminClubId) {
      setMessage('Veuillez sélectionner un admin club.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('admin_club_id', adminClubId);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/clubs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Club ajouté avec succès !');
        setNom('');
        setDescription('');
        setLogo(null);
        setAdminClubId('');
      } else {
        setMessage(data.message || 'Erreur lors de l’ajout du club');
      }
    } catch (error) {
      setMessage('Erreur : ' + error.message);
    }
  };

  return (
    <div>
      <h2>Ajouter un Club</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Nom :</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>

        <div>
          <label>Description :</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label>Logo :</label>
          <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
        </div>

        <div>
          <label>Admin du Club :</label>
          <select value={adminClubId} onChange={(e) => setAdminClubId(e.target.value)} required>
            <option value="">-- Sélectionner un admin_club --</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.username} --{admin.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Créer le Club</button>
      </form>
    </div>
  );
};

export default AddClub;
