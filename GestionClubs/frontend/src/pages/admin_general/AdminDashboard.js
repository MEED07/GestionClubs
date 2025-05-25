import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './AdminDashboard.css';

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClubs: 0,
    totalEvents: 0,
    usersByRole: [],
    clubsByCategory: [],
    eventsByClub: [],
    recentActivities: []
  });

  // Couleurs pour les graphiques
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  useEffect(() => {
    // Simuler le chargement des données depuis l'API
    // Dans un environnement réel, vous devriez remplacer ceci par de vraies requêtes API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulation des données - à remplacer par des appels API réels
        // Exemple: const response = await axios.get('/api/dashboard/stats');
        
        // Données simulées
        const mockData = {
          totalUsers: 120,
          totalClubs: 15,
          totalEvents: 42,
          usersByRole: [
            { name: 'Administrateurs', value: 5 },
            { name: 'Présidents de club', value: 15 },
            { name: 'Membres', value: 100 }
          ],
          clubsByCategory: [
            { name: 'Sport', value: 6 },
            { name: 'Culture', value: 4 },
            { name: 'Science', value: 3 },
            { name: 'Social', value: 2 }
          ],
          eventsByClub: [
            { name: 'Club Informatique', events: 8 },
            { name: 'Club Sport', events: 12 },
            { name: 'Club Théâtre', events: 5 },
            { name: 'Club Musique', events: 7 },
            { name: 'Club Échecs', events: 3 },
            { name: 'Club Débat', events: 7 }
          ],
          recentActivities: [
            { id: 1, type: 'Événement', name: 'Tournoi d\'échecs', date: '2023-06-15' },
            { id: 2, type: 'Nouveau club', name: 'Club de Photographie', date: '2023-06-10' },
            { id: 3, type: 'Événement', name: 'Conférence IA', date: '2023-06-05' },
            { id: 4, type: 'Nouveau membre', name: 'Ahmed Benali', date: '2023-06-01' }
          ]
        };

        setStats(mockData);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="dashboard-loading">Chargement des données...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Tableau de Bord Administrateur</h1>
      
      {/* Cartes de statistiques */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon user-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Utilisateurs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon club-icon">
            <i className="fas fa-building"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalClubs}</h3>
            <p>Clubs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon event-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalEvents}</h3>
            <p>Événements</p>
          </div>
        </div>
      </div>
      
      {/* Graphiques */}
      <div className="charts-container">
        {/* Graphique des utilisateurs par rôle */}
        <div className="chart-card">
          <h2 className="chart-title">Utilisateurs par Rôle</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.usersByRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.usersByRole.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} utilisateurs`, 'Nombre']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Graphique des clubs par catégorie */}
        <div className="chart-card">
          <h2 className="chart-title">Clubs par Catégorie</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.clubsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.clubsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} clubs`, 'Nombre']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Graphique des événements par club */}
        <div className="chart-card full-width">
          <h2 className="chart-title">Événements par Club</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stats.eventsByClub}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} événements`, 'Nombre']} />
                <Legend />
                <Bar dataKey="events" fill="#8884d8" name="Nombre d'événements">
                  {stats.eventsByClub.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Activités récentes */}
      <div className="recent-activities-card">
        <h2 className="chart-title">Activités Récentes</h2>
        <div className="activities-list">
          {stats.recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-type">{activity.type}</div>
              <div className="activity-details">
                <h4>{activity.name}</h4>
                <p>{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
