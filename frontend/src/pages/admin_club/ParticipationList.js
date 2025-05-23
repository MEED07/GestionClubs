import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParticipationList = ({ evenementId }) => {
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    // Appel API pour récupérer les demandes de participation
    axios.get(`http://localhost:8000/api/admin_clubs/evenements/${evenementId}/demandes`)
      .then(response => {
        setParticipations(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des participations:", error);
      });
  }, [evenementId]);

  const handleStatut = (id, action) => {
    // Appel API pour accepter ou refuser la participation
    axios.post(`http://localhost:8000/api/admin_clubs/participations/${id}/${action}`)
      .then(() => {
        setParticipations(prev => prev.filter(p => p.id !== id)); // Met à jour la liste
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du statut:", error);
      });
  };

  return (
    <div>
      <h3>Demandes de participation</h3>
      <ul>
        {participations.map(p => (
          <li key={p.id}>
            {p.user.name} - {p.statut}
            <button onClick={() => handleStatut(p.id, 'accepter')}>Accepter</button>
            <button onClick={() => handleStatut(p.id, 'refuser')}>Refuser</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipationList;
