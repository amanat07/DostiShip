import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/PrivacyPolicy.module.css";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "", visible: false });
  const navigate = useNavigate();
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navRef.current && !navRef.current.contains(e.target) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      `.${styles.content} h3, .${styles.content} p, .${styles.content} ul`
    );
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      revealElements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 100) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    };
    // Set initial state
    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // run once on mount
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  const showNotification = (message, type = "success", duration = 3000) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => setNotification((n) => ({ ...n, visible: false })), duration);
  };

  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleCopy = (type) => {
    const map = {
      email: "atharavtarika@dostiship.com",
      phone: "+91 9466903617",
      address: "Chitkara University, Punjab, India",
    };
    navigator.clipboard.writeText(map[type]).then(() => {
      showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} copied to clipboard!`);
    }).catch(() => {
      showNotification("Failed to copy", "error");
    });
  };

  const handleSocialClick = (e, url) => {
    e.preventDefault();
    showNotification("Opening social media link...", "success", 1000);
    setTimeout(() => window.open(url, "_blank"), 1000);
  };

  return (
    <>
      {/* NOTIFICATION POPUP */}
      <div
        className={`${styles.notificationPopup} ${notification.type === "error" ? styles.error : ""}`}
        style={{ display: notification.visible ? "block" : "none" }}
      >
        {notification.message}
      </div>

      {/* HEADER */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <button
          className={styles.hamburger}
          ref={hamburgerRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === "Enter" || e.key === " ") setMenuOpen((p) => !p); }}
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className={styles.logo} onClick={() => handleNav("/main")}>
          Dosti<span>शिप</span>
        </div>

        <nav
          className={`${styles.navContainer} ${menuOpen ? styles.active : ""}`}
          ref={navRef}
        >
          <ul className={styles.navLinks}>
            {[
              { label: "Home", path: "/main" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
              { label: "Register", path: "/register" },
              { label: "Terms of Use", path: "/terms" },
            ].map(({ label, path }) => (
              <li key={path}>
                <a
                  onClick={() => handleNav(path)}
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === "Enter" || e.key === " ") handleNav(path); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* PRIVACY SECTION */}
      <section className={styles.privacySection}>
        <div className={styles.container}>
          <h2 className={styles.title}>Privacy Policy</h2>
          <p className={styles.subtitle}>
            At Dostiशिप, we value your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>

          <div className={styles.content}>
            <h3>1. Introduction</h3>
            <p>
              Dostiशिप is a platform dedicated to fostering meaningful friendships among college students.
              This Privacy Policy outlines our practices regarding the collection, use, and sharing of your
              personal information when you use our website, mobile applications, or services (collectively,
              the "Platform"). By using the Platform, you consent to the practices described in this policy.
            </p>

            <h3>2. Information We Collect</h3>
            <p>We collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information</strong>: When you register or interact with the Platform, we may collect your name, email address, username, gender, phone number, and other details you provide.</li>
              <li><strong>Content You Share</strong>: Information you post, such as journal entries, messages, event postings, or profile details.</li>
              <li><strong>Usage Data</strong>: Information about how you use the Platform, including pages visited, features used, and time spent on the Platform.</li>
              <li><strong>Device Information</strong>: Details about your device, such as IP address, browser type, operating system, and device identifiers.</li>
              <li><strong>Cookies and Tracking</strong>: We use cookies and similar technologies to enhance your experience and analyze usage (see Section 7).</li>
            </ul>

            <h3>3. How We Use Your Information</h3>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and improve the Platform's features, such as connecting you with friends and organizing events.</li>
              <li>Personalize your experience, such as recommending connections or content.</li>
              <li>Communicate with you, including sending updates, notifications, and support responses.</li>
              <li>Analyze usage to enhance performance and develop new features.</li>
              <li>Ensure the safety and security of the Platform, including detecting and preventing fraud or abuse.</li>
            </ul>

            <h3>4. Data Sharing</h3>
            <p>We may share your information in the following cases:</p>
            <ul>
              <li><strong>With Your Consent</strong>: When you explicitly agree to share your information, such as making your profile visible to other users.</li>
              <li><strong>Service Providers</strong>: With trusted third-party providers who assist us in operating the Platform (e.g., hosting, analytics), under strict confidentiality agreements.</li>
              <li><strong>Legal Requirements</strong>: When required by law, such as to comply with a court order or protect our rights and safety.</li>
              <li><strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h3>5. Data Security</h3>
            <p>
              We implement reasonable technical and organizational measures to protect your information from
              unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot
              guarantee absolute security.
            </p>

            <h3>6. User Rights</h3>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access</strong>: Request a copy of the information we hold about you.</li>
              <li><strong>Correction</strong>: Update or correct inaccurate information.</li>
              <li><strong>Deletion</strong>: Request deletion of your account and associated data, subject to legal obligations.</li>
              <li><strong>Opt-Out</strong>: Opt out of non-essential communications, such as promotional emails.</li>
            </ul>
            <p>To exercise these rights, contact us at the details provided in Section 11.</p>

            <h3>7. Cookies and Tracking</h3>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences and login status.</li>
              <li>Analyze Platform usage and performance.</li>
              <li>Deliver personalized content and advertisements.</li>
            </ul>
            <p>
              You can manage cookie preferences through your browser settings, but disabling cookies may
              affect Platform functionality.
            </p>

            <h3>8. Third-Party Links</h3>
            <p>
              The Platform may contain links to third-party websites or services. We are not responsible for
              the privacy practices of these third parties. We encourage you to review their privacy policies.
            </p>

            <h3>9. Children's Privacy</h3>
            <p>
              The Platform is not intended for users under 17 years old. We do not knowingly collect personal
              information from children. If we learn that a child under 17 has provided information, we will
              delete it promptly.
            </p>

            <h3>10. Changes to the Policy</h3>
            <p>
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. We
              will notify you of significant changes via email or through the Platform. Your continued use of
              the Platform after such changes constitutes acceptance of the updated policy.
            </p>

            <h3>11. Contact Information</h3>
            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
            <p>Email: <a href="mailto:atharavtarika@dostiship.com">atharavtarika@dostiship.com</a></p>
            <p>Phone: +91 9466903617</p>
            <p>Address: Chitkara University, Rajpura, Punjab, India</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          {/* Column 1 */}
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>Dosti<span>शिप</span></div>
            <p>Building meaningful connections that last a lifetime. Join our community today!</p>
            <div className={styles.footerSocial}>
              {[
                { icon: "fab fa-facebook-f", url: "#", label: "Facebook" },
                { icon: "fab fa-twitter", url: "#", label: "Twitter" },
                { icon: "fab fa-instagram", url: "https://www.instagram.com/dostiship/?hl=en", label: "Instagram" },
                { icon: "fab fa-linkedin-in", url: "#", label: "LinkedIn" },
              ].map(({ icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onClick={(e) => handleSocialClick(e, url)}
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === "Enter" || e.key === " ") handleSocialClick(e, url); }}
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              {[
                { label: "Home", path: "/main" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Terms of Use", path: "/terms" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <a
                    onClick={() => handleNav(path)}
                    tabIndex={0}
                    onKeyPress={(e) => { if (e.key === "Enter" || e.key === " ") handleNav(path); }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className={styles.footerColumn}>
            <h3>Contact Us</h3>
            <div className={styles.footerContact}>
              <p onClick={() => handleCopy("address")}>
                <i className="fas fa-map-marker-alt"></i> Chitkara University, Punjab, India
              </p>
              <p onClick={() => handleCopy("email")}>
                <i className="fas fa-envelope"></i> atharavtarika@dostiship.com
              </p>
              <p onClick={() => handleCopy("phone")}>
                <i className="fas fa-phone"></i> +91 9466903617
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2025 Dostiशिप. All Rights Reserved. | Designed with ❤ by Dostiशिप Team</p>
        </div>
      </footer>
    </>
  );
}