import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ import

const ListeClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // ✅ hook

    useEffect(() => {
        axios.get('http://localhost:8000/api/admin/clubs', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res => {
            setClubs(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Erreur lors du chargement des clubs', err);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <div>
            <h2>Mes Clubs</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Logo</th>
                        <th>Actions</th> {/* ✅ nouvelle colonne */}
                    </tr>
                </thead>
                <tbody>
                {clubs.map(club => (
                    <tr key={club.id}>
                    <td>{club.nom}</td>
                    <td>{club.description}</td>
                    <td>
                        {club.logo && (
                        <img src={`http://localhost:8000/storage/${club.logo}`} alt="Logo" width="100" />
                        )}
                    </td>
                    <td>
                        <button onClick={() => window.location.href = `/admin-club/club/${club.id}`}>
                        Voir Détails
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListeClubs;
