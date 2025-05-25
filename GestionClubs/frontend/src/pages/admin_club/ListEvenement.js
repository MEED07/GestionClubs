import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListEvenement = () => {
  const [evenements, setEvenements] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null); // <-- Manquait

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    date_debut: '',
    date_fin: '',
    lieu: '',
    club_id: '',
  });

  const fetchEvenements = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin_club/evenements', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvenements(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors du chargement des événements');
    }
  };

  const fetchClubs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/clubs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setClubs(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors du chargement des clubs');
    }
  };

  useEffect(() => {
    fetchEvenements();
    fetchClubs();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (evt) => {
    setFormData({
      nom: evt.nom,
      description: evt.description,
      date_debut: evt.date_debut,
      date_fin: evt.date_fin,
      lieu: evt.lieu,
      club_id: evt.club_id,
    });
    setEditingId(evt.id);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const payload = {
      nom: formData.nom,
      description: formData.description,
      date_debut: formData.date_debut,
      date_fin: formData.date_fin,
      lieu: formData.lieu,
      club_id: formData.club_id,
    };

    try {
      if (editingId) {
        // Modification
        await axios.put(
          `http://localhost:8000/api/admin/evenements/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setMessage('Événement mis à jour avec succès !');
      } else {
        // Création
        await axios.post(
          `http://localhost:8000/api/admin/club/${formData.club_id}/evenements`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setMessage("Événement créé avec succès !");
      }

      setFormData({
        nom: '',
        description: '',
        date_debut: '',
        date_fin: '',
        lieu: '',
        club_id: '',
      });
      setEditingId(null);
      fetchEvenements();
    } catch (err) {
      console.error(err.response || err);
      const msg = err.response?.data?.message || "Erreur lors de l'opération";
      setMessage(`Erreur : ${msg}`);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet événement ?")) return;
  
    try {
      await axios.delete(`http://localhost:8000/api/admin/evenements/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessage("Événement supprimé avec succès !");
      fetchEvenements();
    } catch (err) {
      console.error(err.response || err);
      const msg = err.response?.data?.message || "Erreur lors de la suppression";
      setMessage(`Erreur : ${msg}`);
    }
  };
  

  return (
    <div>
      <h1>Mes événements</h1>
      {message && <p style={{ color: message.startsWith('Erreur') ? 'red' : 'green' }}>{message}</p>}

      {evenements.length === 0 ? (
        <p>Aucun événement trouvé.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Lieu</th>
              <th>Dates</th>
              <th>Club</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {evenements.map((evt) => (
              <tr key={evt.id}>
                <td>{evt.nom}</td>
                <td>{evt.description}</td>
                <td>{evt.lieu}</td>
                <td>{evt.date_debut} → {evt.date_fin}</td>
                <td>{clubs.find(c => c.id === evt.club_id)?.nom || '—'}</td>
                <td>
                  <button onClick={() => handleEdit(evt)}>Modifier</button>
                  <button onClick={() => handleDelete(evt.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />
      <h2>{editingId ? "Modifier un événement" : "Créer un événement"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>

        <div>
          <label>Description :</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>

        <div>
          <label>Date de début :</label>
          <input type="date" name="date_debut" value={formData.date_debut} onChange={handleChange} required />
        </div>

        <div>
          <label>Date de fin :</label>
          <input type="date" name="date_fin" value={formData.date_fin} onChange={handleChange} required />
        </div>

        <div>
          <label>Lieu :</label>
          <input type="text" name="lieu" value={formData.lieu} onChange={handleChange} required />
        </div>

        <div>
          <label>Club :</label>
          <select name="club_id" value={formData.club_id} onChange={handleChange} required>
            <option value="">-- Sélectionner un club --</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.nom}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{editingId ? "Mettre à jour" : "Créer"}</button>
      </form>
    </div>
  );
};

export default ListEvenement;
