import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Non connecté ou utilisateur mal défini
  if (!token || !user || !user.role) {
    return <Navigate to="/login" replace />;
  }

  // Pas le bon rôle
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;  // Redirection vers une page d'accès non autorisé
  }

  return children;
};

export default ProtectedRoute;
