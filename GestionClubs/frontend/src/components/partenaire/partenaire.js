import React from "react";
import "./partenaire.css";

const Partenaire = () => {
  const services = [
    {
      icon: "https://res.cloudinary.com/dkueh21ti/image/upload/v1745417969/Fondation_Mohammed_V_For_Solidarity_logo.svg_dxweek.png", // À remplacer avec votre URL
      title: "Fondation Mohammed V pour la solidarité",
      description: "La Fondation Mohammed V pour la Solidarité est un partenaire clé de notre Club de Solidarité. Elle soutient nos actions sociales en faveur des populations vulnérables à travers son engagement humanitaire."
    },
    {
      icon: "https://res.cloudinary.com/dkueh21ti/image/upload/v1745419794/attachment_93510344_xgc2sd.png", // À remplacer avec votre URL
      title: "Kick Off",
      description: "Kick Off est une initiative sportive visant à aménager et rénover des terrains de football accessibles à tous. Elle encourage la jeunesse à pratiquer le sport dans un cadre sain et inclusif, tout en renforçant la cohésion sociale."
    },
    {
      icon: "https://res.cloudinary.com/dkueh21ti/image/upload/v1745420180/f93be5f5-607d-483d-b600-e06c1e513c97_rw_1200_l258si.jpg", // À remplacer avec votre URL
      title: "Aya Studio",
      description: "Aya Studio est un espace créatif qui soutient les talents émergents, notamment les étudiants de l’OFPPT, en leur offrant la possibilité d’enregistrer leur propre musique. Le studio met à disposition un encadrement professionnel et du matériel de qualité. Il favorise l’expression artistique et l’épanouissement musical des jeunes."
    }
  ];

  return (
    <div className="partenaire-container">
      <h2>Offering Latest Services</h2>
      <div className="cards-wrapper">
        {services.map((service, index) => (
          <div key={index} className="card">
            <img src={service.icon} alt={service.title} className="service-icon" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partenaire;