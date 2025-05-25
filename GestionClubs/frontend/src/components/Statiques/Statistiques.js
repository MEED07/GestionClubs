import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Statistiques.css";

export default function Statistiques() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="stats-container">
      <div className="stat-item" data-aos="fade-right">
        <i className="fas fa-users"></i>
        <div className="stat-number">+ 350</div>
        <div className="stat-label">Membres inscrits</div>
      </div>
      <div className="stat-item" data-aos="fade-right">
        <i className="fas fa-calendar-check"></i>
        <div className="stat-number">+ 80</div>
        <div className="stat-label">Événements organisés</div>
      </div>
      <div className="stat-item" data-aos="fade-up">
        <i className="fas fa-chart-line"></i>
        <div className="stat-number">+ 92%</div>
        <div className="stat-label">Taux de participation</div>
      </div>
      <div className="stat-item" data-aos="fade-left">
        <i className="fas fa-handshake"></i>
        <div className="stat-number">+ 25</div>
        <div className="stat-label">Partenaires</div>
      </div>
      <div className="stat-item" data-aos="fade-left">
        <i className="fas fa-piggy-bank"></i>
        <div className="stat-number">+ 120K MAD</div>
        <div className="stat-label">Fonds collectés</div>
      </div>
    </div>
  );
}
