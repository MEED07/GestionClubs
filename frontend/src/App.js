import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth pages
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';

// Admin général
import AdminDashboard from './pages/admin_general/AdminDashboard.js';
import UserManagement from './pages/admin_general/UserManagement.js';
import AddClub from './pages/admin_general/AddClub.js';

// Admin club
import AdminClubDashboard from './pages/admin_club/ClubList.js';
import ClubDetails from './pages/admin_club/ClubDetails.js';
import ListeClubs from './pages/admin_club/ClubList.js';
import ListEvenement from './pages/admin_club/ListEvenement';
import AdminClubDemandes from './pages/admin_club/ListDemandes.js'; // chemin correct selon ta structure



// Composants
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Autres pages
import Home from './pages/home/Home.js';
import Unauthorized from './pages/errors/Unauthorized.js';

//page not found
import NotFound from './pages/errors/NotFound.js';



function App() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test')
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(error => console.error('Erreur API Laravel :', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes pour admin_general */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin_general']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute allowedRoles={['admin_general']}>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/clubs/add" element={
            <ProtectedRoute allowedRoles={['admin_general']}>
              <AddClub />
            </ProtectedRoute>
          } />

          {/* Routes pour admin_club */}
          <Route path="/admin-club/dashboard" element={
            <ProtectedRoute allowedRoles={['admin_club']}>
              <ListeClubs />
            </ProtectedRoute>
          } />

          <Route path="/admin-club/club/:id" element={
            <ProtectedRoute allowedRoles={['admin_club']}>
              <ClubDetails />
            </ProtectedRoute>
          } />

          <Route path="/admin/evenements" element={
            <ProtectedRoute allowedRoles={['admin_club']}>
              <ListEvenement  />
            </ProtectedRoute>
          } />

          <Route path="/admin/demandes" element={
            <ProtectedRoute allowedRoles={['admin_club']}>
              <AdminClubDemandes />
            </ProtectedRoute>
          } />


          {/* Nouvelle route pour accéder à la page ClubDetails */}
          <Route path="/admin_club/ClubDetails" element={
          <ProtectedRoute allowedRoles={['admin_club']}>
            <ClubDetails />
          </ProtectedRoute>
          } />


          
        <Route path="/unauthorized" element={<Unauthorized />} />
         {/* Route 404 - Doit être la dernière */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
