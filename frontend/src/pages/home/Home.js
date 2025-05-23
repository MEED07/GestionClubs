import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clubs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setClubs(data);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des clubs', error);
      });
  }, []);

  // Voici ta fonction à mettre ici, dans le même composant
  function demanderAdhesion(clubId) {

      const token = localStorage.getItem('token');

    if (!token) {
      // Pas connecté : redirection vers login
      navigate('/login');
      return;
    }

    fetch(`http://127.0.0.1:8000/api/clubs/${clubId}/demander-adhesion`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Liste des clubs</h1>
      {clubs.length > 0 ? (
        <ul className="club-list">
          {clubs.map(club => (
            <li key={club.id} className="club-item">
              <h3 className="club-name">{club.nom}</h3>
              <p className="club-description">{club.description}</p>
              {club.logo && (
                <img
                  src={`http://127.0.0.1:8000/storage/${club.logo}`}
                  alt={club.nom}
                />
              )}
              <p className="club-admin">
            <strong>Admin :</strong> {club.admin?.name ?? 'N/A'}
          </p>

                    <button onClick={() => demanderAdhesion(club.id)}>
                  Demander à rejoindre
                </button>
            </li>
            
          ))}
          
        </ul>
      ) : (
        <p>Aucun club trouvé.</p>
      )}
      
    </div>
  );
};

export default Home;
