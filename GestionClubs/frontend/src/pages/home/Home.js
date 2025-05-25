import Navbar from "../../components/Navbar";
import Hero from "../../components/HeroSection/Hero";
import Statistiques from "../../components/Statiques/Statistiques";
import ClubsSection from "../../components/ClubsSection/ClubsSection";
import Parteunariat from "../../components/partenaire/partenaire";
import Footer from '../../components/Footer/Footer';
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <div className="nav-section">
                <Navbar />
            </div>

            <div className="hero-section full-width">
                <Hero />
            </div>

            <div className="content-wrapper">
                <div className="statistique-section">
                    <Statistiques />
                </div>

                <div className="clubs-section-wrapper">
                    <ClubsSection />
                </div>

                <div className="parteunariat-section-wrapper">
                    <Parteunariat />
                </div>
            </div>

            <div className="footer-section">
                <Footer />
            </div>
        </div>
    );
}
