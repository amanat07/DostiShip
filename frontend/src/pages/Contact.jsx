import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", subject: "", message: "",
  });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = formData;
    if (!firstName || !lastName || !email || !subject || !message) {
      alert("Please fill out all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setSuccess(true);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  }

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
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section className={styles.contactSection}>
        <h2>Let's Connect</h2>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have questions, feedback, or
          just want to say hello, our team is ready to assist you.
        </p>
      </section>

      {/* INFO BOXES */}
      <section className={styles.contactInfo}>
        <div className={styles.infoBox}>
          <i className="fas fa-map-marker-alt"></i>
          <strong>Our Location</strong>
          <p>Chitkara University<br />Rajpura, Punjab</p>
        </div>

        <div className={styles.infoBox}>
          <i className="fas fa-phone-alt"></i>
          <strong>Phone</strong>
          <p>+91 9466903617<br />+91 6230448346</p>
        </div>

        <div className={styles.infoBox}>
          <i className="fas fa-envelope"></i>
          <strong>Email</strong>
          <p>atharavtarika@dostiship.com</p>
        </div>

        <div className={styles.infoBox}>
          <i className="fas fa-share-alt"></i>
          <strong>Social Media</strong>
          <div className={styles.socialIcons}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </section>

      {/* FORM */}
      <div className={styles.contactFormContainer}>
        <div className={styles.contactForm}>
          {success && (
            <p className={styles.successMessage}>
              Message sent successfully! We'll get back to you soon.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text" name="firstName" placeholder="First Name"
                  value={formData.firstName} onChange={handleChange} required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text" name="lastName" placeholder="Last Name"
                  value={formData.lastName} onChange={handleChange} required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="email" name="email" placeholder="Email Address"
                  value={formData.email} onChange={handleChange} required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="tel" name="phone" placeholder="Phone Number"
                  value={formData.phone} onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="" disabled>Select Subject</option>
                <option>General Inquiry</option>
                <option>Support</option>
                <option>Feedback</option>
                <option>Partnership</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <textarea
                name="message" placeholder="Your Message"
                value={formData.message} onChange={handleChange} required
              />
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* MAP */}
      <div className={styles.mapContainer}>
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.041715058498!2d76.6558743151269!3d30.62829898167489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feb5d9e105c0f%3A0x7c5e9a9a5e8e5e9e!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            title="Chitkara University Map"
          />
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>&copy; 2023 Dostiशिप. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Contact;