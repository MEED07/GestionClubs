import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AddClub from './pages/AddClub';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Communication Laravel & React</h1>
          <p>Message : {msg}</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
