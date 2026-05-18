import { Link } from "react-router-dom";
import "../styles/About.css";
import men from "../assets/men.png";
import women from "../assets/women.png";

const About = () => {
  return (
    <>
      {/* BACK BUTTON */}
      <Link to="/" className="about-back-button">
        ← Back
      </Link>

      {/* TEAM SECTION */}
      <section className="about-team-section">
        <h2>Meet Our Team</h2>
        <p>
          The passionate individuals behind Dostiशिप who work tirelessly to
          create meaningful connections
        </p>
      </section>

      {/* TEAM MEMBERS */}
      <div className="about-team-container">
        <div className="about-team-member">
          <div className="about-member-image">
            <img src={men} alt="Atharav Tarika" />
          </div>
          <h4>Atharav Tarika</h4>
          <p>Founder & CEO</p>
        </div>

        <div className="about-team-member">
          <div className="about-member-image">
            <img src={women} alt="Amanatpreet Kaur" />
          </div>
          <h4>Amanatpreet Kaur</h4>
          <p>Tech Lead</p>
        </div>

        <div className="about-team-member">
          <div className="about-member-image">
            <img src={men} alt="Akhil Azad" />
          </div>
          <h4>Akhil Azad</h4>
          <p>IT Support Specialist</p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="about-footer">
        <div className="about-footer-item">
          <p>Email</p>
          <p>atharavtarika@dostiship.com</p>
        </div>

        <div className="about-footer-item">
          <p>Call</p>
          <p>+91 9466903617</p>
        </div>

        <div className="about-footer-item">
          <p>Follow Us</p>
          <div className="about-social-icons">
            <span>FB</span>
            <span>TW</span>
            <span>IG</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;