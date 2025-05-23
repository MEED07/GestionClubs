import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClubDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editMode, setEditMode] = useState(false); // 👈 Contrôle le mode édition

    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/club/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            setClub(response.data);
            setNom(response.data.nom);
            setDescription(response.data.description);
            setLoading(false);
        })
        .catch(() => {
            setError("Club non trouvé");
            setLoading(false);
        });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        if (logo) {
            formData.append('logo', logo);
        }

        axios.post(`http://localhost:8000/api/admin/club/${id}?_method=PUT`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert("Club mis à jour avec succès !");
            setEditMode(false);
            window.location.reload();
        })
        .catch(() => {
            alert("Erreur lors de la mise à jour.");
        });
    };

    const handleDelete = () => {
        if (window.confirm("Voulez-vous vraiment supprimer ce club ?")) {
            axios.delete(`http://localhost:8000/api/admin/club/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(() => {
                alert("Club supprimé avec succès !");
                navigate('/admin/clubs');
            }).catch(() => {
                alert("Erreur lors de la suppression.");
            });
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Détails du Club</h2>

            {editMode ? (
                // 🔧 Formulaire de modification
                <form onSubmit={handleUpdate}>
                    <input value={nom} onChange={e => setNom(e.target.value)} required />
                    <br />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />
                    <br />
                    <input type="file" onChange={e => setLogo(e.target.files[0])} />
                    <br />
                    {club.logo && <img src={`http://localhost:8000/storage/${club.logo}`} alt="Logo" width="100" />}
                    <br />
                    <button type="submit">Enregistrer</button>
                    <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: "10px" }}>Annuler</button>
                </form>
            ) : (
                // 👁️ Affichage des détails
                <>
                    <p><strong>Nom :</strong> {club.nom}</p>
                    <p><strong>Description :</strong> {club.description}</p>
                    {club.logo && <img src={`http://localhost:8000/storage/${club.logo}`} alt="Logo" width="100" />}
                    <br />
                    <button onClick={() => setEditMode(true)}>Modifier</button>
                </>
            )}

            {/* Ce bouton est visible dans tous les cas */}
            <button onClick={handleDelete} type="button" style={{ marginTop: "10px", color: "red" }}>Supprimer</button>
        </div>
    );
};

export default ClubDetail;
