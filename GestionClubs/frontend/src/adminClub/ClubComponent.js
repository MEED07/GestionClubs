import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClubPage.css';

const ClubComponent = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer tous les clubs depuis l'API
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/clubs');
        setClubs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des clubs:', err);
        setError('Impossible de charger les clubs. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) return <div className="loading">Chargement des clubs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="clubs-container">
      <h2 className="clubs-title">Découvrez nos clubs</h2>
      <p className="clubs-description">Explorez les différents clubs disponibles et rejoignez celui qui vous passionne.</p>
      
      <div className="clubs-grid">
        {clubs.map((club) => (
          <div key={club.id} className="club-card">
            <div className="club-image">
              {club.logo ? (
                <img 
                  src={`http://localhost:8000/storage/${club.logo}`} 
                  alt={`Logo ${club.nom}`} 
                />
              ) : (
                <div className="placeholder-image">Logo non disponible</div>
              )}
            </div>
            <div className="club-info">
              <h3 className="club-name">{club.nom}</h3>
              <p className="club-description">{club.description}</p>
              <button className="join-button">Rejoindre ce club</button>
            </div>
          </div>
        ))}
      </div>

      {clubs.length === 0 && !loading && !error && (
        <div className="no-clubs">Aucun club n'est disponible pour le moment.</div>
      )}
    </div>
  );
};

export default ClubComponent;