import { Link } from "react-router-dom";
import { Star, MessageCircle, Shield, GraduationCap, Mail, Phone } from "lucide-react";
import styles from "../styles/AboutUs.module.css";

function AboutUs() {
  return (
    <>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>
          Dosti<span>शिप</span>
        </div>

        <nav>
          <ul className={styles.navList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/event">Events</Link></li>
          </ul>
        </nav>

        <input
          type="text"
          className={styles.search}
          placeholder="Search..."
        />
      </header>

      {/* ABOUT SECTION */}
      <section className={styles.about}>
        <div className={styles.aboutHeader}>
          <h1>About Us</h1>
          <p>
            At Dostiशिप, we believe that friendships are the foundation of happiness.
            In today's fast-paced digital world, making meaningful connections can be
            difficult—but we're here to change that!
          </p>
        </div>

        <div className={styles.aboutContent}>
          <div className={styles.aboutCard}>
            <h2>Who We Are</h2>
            <p>
              We are a passionate team dedicated to creating a safe, welcoming, and fun
              space where people can meet, connect, and build lasting friendships. Our
              mission is to bring individuals together, no matter where they are, and
              help them form genuine bonds.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <h2>What We Offer</h2>
            <ul className={styles.featureList}>
              <li>
                <Star size={16} className={styles.featureIcon} />
                <span>Find Like-Minded Friends – Connect with people who share your interests, values, and passions.</span>
              </li>
              <li>
                <MessageCircle size={16} className={styles.featureIcon} />
                <span>Engaging Conversations – Join discussions, participate in group chats, and make every interaction meaningful.</span>
              </li>
              <li>
                <Shield size={16} className={styles.featureIcon} />
                <span>Safe & Secure Community – Your privacy and security are our top priorities.</span>
              </li>
              <li>
                <GraduationCap size={16} className={styles.featureIcon} />
                <span>Senior Mentorship – Learn from seniors about career choices and real-world skills.</span>
              </li>
            </ul>
          </div>

          <div className={styles.aboutCard}>
            <h2>Our Vision</h2>
            <p>
              We envision a world where no one feels alone. Everyone deserves a friend
              they can trust, laugh with, and share life's journey. By fostering real
              connections, we aim to make the world a friendlier, more connected place.
            </p>
          </div>

          <div className={styles.aboutCard}>
            <h2>Join Us Today!</h2>
            <p>
              Be a part of our growing community and start building friendships that
              truly matter. Because every great friendship begins with a simple "hello"!
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className={styles.contact}>
        <div className={styles.contactContainer}>
          <h2>Get in Touch</h2>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail size={24} className={styles.contactIcon} />
              <span>dostiship@gmail.com</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={24} className={styles.contactIcon} />
              <span>123-456-7890</span>
            </div>
            <div className={styles.contactItem}>
              <Instagram size={24} className={styles.contactIcon} />
              <span>@dostiship</span>
            </div>
          </div>

          <div className={styles.socialLinks}>
  <a href="#" aria-label="Facebook">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="#" aria-label="Twitter">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="#" aria-label="Instagram">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="#" aria-label="LinkedIn">
    <i className="fab fa-linkedin-in"></i>
  </a>
</div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;