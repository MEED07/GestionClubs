// src/pages/admin_club/EvenementsPage.js

import React, { useState } from 'react';
import { CreateEventFormPage, ListEventsPage } from './ListEvenement';

const EvenementsPage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Liste des événements</h1>
        <button onClick={toggleForm} style={{
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          {showForm ? 'Fermer le formulaire' : 'Ajouter un événement'}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '40px' }}>
          <CreateEventFormPage />
        </div>
      )}

      <ListEventsPage />
    </div>
  );
};

export default EvenementsPage;
