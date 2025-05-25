import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const AdminClubDashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalEvents: 0,
    pendingRequests: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les clubs gérés par l'admin
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Récupérer les clubs
        const clubsResponse = await axios.get('http://localhost:8000/api/admin/clubs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setClubs(clubsResponse.data);
        
        // Simuler des statistiques (à remplacer par de vraies API)
        setStats({
          totalMembers: clubsResponse.data.length * 15, // Simulation
          totalEvents: clubsResponse.data.length * 3, // Simulation
          pendingRequests: Math.floor(Math.random() * 10) // Simulation
        });
        
        // Simuler des activités récentes (à remplacer par de vraies API)
        const mockActivities = [
          { type: 'Membre', title: 'Nouveau membre', description: 'Ahmed a rejoint le club de Robotique', time: '2 heures' },
          { type: 'Événement', title: 'Événement créé', description: 'Atelier de programmation ajouté', time: '1 jour' },
          { type: 'Demande', title: 'Nouvelle demande', description: 'Demande d\'adhésion en attente', time: '3 heures' },
          { type: 'Membre', title: 'Membre retiré', description: 'Sara a quitté le club de Photographie', time: '5 heures' },
        ];
        
        setActivities(mockActivities);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="dashboard-loading">Chargement du tableau de bord...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="admin-club-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Tableau de Bord Admin Club</h1>
        <p className="dashboard-subtitle">Gérez vos clubs, événements et membres depuis cette interface centralisée.</p>
      </div>
      
      {/* Cartes statistiques */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon members-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalMembers}</h3>
            <p>Membres</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon events-icon">🎉</div>
          <div className="stat-info">
            <h3>{stats.totalEvents}</h3>
            <p>Événements</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon requests-icon">📩</div>
          <div className="stat-info">
            <h3>{stats.pendingRequests}</h3>
            <p>Demandes en attente</p>
          </div>
        </div>
      </div>
      
      {/* Tableau des clubs */}
      <div className="clubs-table-container">
        <h2>Mes Clubs</h2>
        <table className="clubs-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td>
                  {club.logo ? (
                    <img 
                      src={`http://localhost:8000/storage/${club.logo}`} 
                      alt={`Logo ${club.nom}`}
                      className="club-logo"
                    />
                  ) : (
                    <div className="logo-placeholder">Logo non disponible</div>
                  )}
                </td>
                <td>{club.nom}</td>
                <td>{club.description ? club.description.substring(0, 100) + '...' : 'Aucune description'}</td>
                <td>
                  <Link to={`/admin-club/club/${club.id}`}>
                    <button className="action-button view-button">Voir détails</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {clubs.length === 0 && (
          <div className="no-clubs">Vous ne gérez aucun club pour le moment.</div>
        )}
      </div>
      
      {/* Activités récentes */}
      <div className="recent-activities">
        <h2 className="activities-title">Activités Récentes</h2>
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-type">{activity.type}</div>
              <div className="activity-details">
                <h4>{activity.title}</h4>
                <p>{activity.description} • il y a {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminClubDashboard;