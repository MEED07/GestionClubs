import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statutFilter, setStatutFilter] = useState('en_attente');

  useEffect(() => {
    fetchDemandes();
  }, [statutFilter]);

  const fetchDemandes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/admin/demandes?statut=${statutFilter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      });
      setDemandes(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des demandes :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    const url = `http://127.0.0.1:8000/api/admin/demandes/${id}/${action}`;
    try {
      await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
          },
        }
      );
      // Recharge les demandes
      fetchDemandes();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(`Impossible de ${action} cette demande : ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Es-tu sûr de vouloir supprimer cette demande ?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/demandes/${id}/supprimer`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json',
        },
      });
      // Recharge les demandes
      fetchDemandes();
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(`Erreur lors de la suppression : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h2>Demandes d'adhésion reçues</h2>

      <div>
        <label>Filtrer par statut : </label>
        <select value={statutFilter} onChange={(e) => setStatutFilter(e.target.value)}>
          <option value="en_attente">En attente</option>
          <option value="accepte">Accepté</option>
          <option value="refuse">Refusé</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement en cours...</p>
      ) : demandes.length === 0 ? (
        <p>Aucune demande pour ce statut.</p>
      ) : (
        <ul>
          {demandes.map((demande) => (
            <li key={demande.id}>
            <strong>{demande.user.name}</strong> a demandé à rejoindre <em>{demande.club.nom}</em>
            <br />
            Statut : <strong>{demande.statut}</strong>
            <div style={{ marginTop: '5px' }}>
              {demande.statut === 'en_attente' && (
                <>
                  <button onClick={() => handleAction(demande.id, 'accepter')}>Accepter</button>
                  <button onClick={() => handleAction(demande.id, 'refuser')} style={{ marginLeft: '10px' }}>
                    Refuser
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(demande.id)}
                style={{
                  marginLeft: demande.statut === 'en_attente' ? '10px' : '0',
                  color: 'red',
                }}
              >
                Supprimer
              </button>
            </div>
          </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default ListDemandes;
  