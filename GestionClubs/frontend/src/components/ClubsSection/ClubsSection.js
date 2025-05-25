import React from "react";
import "./ClubsSection.css";
import { Link } from "react-router-dom";

const clubs = [
  {
    name: "Club Sportif",
    description: "Un espace dédié aux passionnés de sport, où vous pouvez pratiquer, organiser et participer à divers événements sportifs.",
    bannerImage: "https://res.cloudinary.com/dkueh21ti/image/upload/v1748040733/20250523_2349_Match_de_Football_Marocain_simple_compose_01jvznavyje0fryye2mb0s3twn_aeyglw.png",
  },
  {
    name: "Club de Musique",
    description: "Explorez votre passion musicale à travers des ateliers, concerts et sessions de jam entre membres.",
    bannerImage: "https://res.cloudinary.com/dkueh21ti/image/upload/v1745322201/ChatGPT_Image_22_avr._2025_12_41_58_qcby6d.png",
  },
  {
    name: "Club de Solidarité",
    description: "Un club pour aider les autres, organiser des dons, et contribuer à des actions sociales et caritatives.",
    bannerImage: "https://res.cloudinary.com/dkueh21ti/image/upload/v1748040802/20250523_2352_Solidarit%C3%A9_des_Stagiaires_Marocains_simple_compose_01jvzng16rft395108y7w721j7_iixgsg.png",
  },
];

export default function ClubShowcase() {
  return (
    <div className="club-showcase">
      <h2 className="section-title">Nos Clubs</h2>
      {clubs.map((club, index) => (
        <div
          key={index}
          className={`club-block ${index % 2 === 1 ? "reverse" : ""}`}
        >
          <div className="club-content">
            <div className="club-text">
              <h2>{club.name}</h2>
              <p>{club.description}</p>
              <Link to="/clubs" className="see-more-button">
                Voir plus
              </Link>
            </div>
            <div className="club-image">
              <img src={club.bannerImage} alt={club.name} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
