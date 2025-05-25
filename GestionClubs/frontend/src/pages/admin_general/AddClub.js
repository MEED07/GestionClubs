import React, { useEffect, useState } from 'react';
import './AddClub.css';

const AddClub = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [adminClubId, setAdminClubId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Récupérer les utilisateurs avec le rôle admin_club
    const fetchAdmins = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        const filtered = data.filter(user => user.role === 'admin_club');
        setAdmins(filtered);
      } catch (error) {
        console.error('Erreur lors du chargement des administrateurs :', error);
        setMessage('Erreur lors du chargement des administrateurs');
        setMessageType('error');
      }
    };

    fetchAdmins();
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setFileName(file.name);
    } else {
      setLogo(null);
      setFileName('');
    }
  };

  const resetForm = () => {
    setNom('');
    setDescription('');
    setLogo(null);
    setAdminClubId('');
    setFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!adminClubId) {
      setMessage('Veuillez sélectionner un admin club.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (!nom.trim()) {
      setMessage('Le nom du club est requis.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('nom', nom.trim());
    formData.append('description', description.trim());
    formData.append('admin_club_id', adminClubId);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const res = await fetch('http://127.0.0.1:8000/api/clubs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Club ajouté avec succès !');
        setMessageType('success');
        resetForm();
      } else {
        setMessage(data.message || "Erreur lors de l'ajout du club");
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Erreur : ' + error.message);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-club-container">
      <h2 className="add-club-title">Ajouter un Club</h2>
      <p className="add-club-description">
        Créez un nouveau club en remplissant les informations ci-dessous.
      </p>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form className="add-club-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label className="form-label" htmlFor="nom">
            Nom du Club *
          </label>
          <input
            id="nom"
            className={`form-input ${nom.trim() && 'valid'}`}
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Entrez le nom du club"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez le club, ses activités et ses objectifs..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="logo" >
            Logo du Club
          </label>
          <div className="file-input-container">
            <input
              id="logo"
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="logo"
              className={`file-input-label ${fileName && 'file-selected'}`}
            >
              {fileName ? (
                <>
                  <strong>Fichier sélectionné :</strong> {fileName}
                </>
              ) : (
                <>
                  📁 Cliquez pour sélectionner une image ou glissez-déposez
                </>
              )}
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="adminClubId">
            Admin du Club *
          </label>
          <select
            id="adminClubId"
            className={`form-select ${adminClubId && 'valid'}`}
            value={adminClubId}
            onChange={(e) => setAdminClubId(e.target.value)}
            required
          >
            <option value="">-- Sélectionner un administrateur --</option>
            {admins.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {admin.username ? `${admin.username} - ${admin.name}` : admin.name}
              </option>
            ))}
          </select>
          {admins.length === 0 && (
            <div className="validation-message error">
              Aucun administrateur de club disponible
            </div>
          )}
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={isLoading || !nom.trim() || !adminClubId}
        >
          {isLoading && <span className="loading"></span>}
          {isLoading ? 'Création en cours...' : 'Créer le Club'}
        </button>
      </form>
    </div>
  );
};

export default AddClub;