/* =========================
   Services.jsx (React)
   ========================= */
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/Services.module.css";
import { Link } from "react-router-dom";


const serviceDetails = {
  "In-App Journal": "The In-App Journal allows you to document your social experiences privately. Set goals, track progress, and reflect on your journey to build confidence.",
  "Icebreaker Challenges": "Our curated prompts help you start conversations naturally. From fun questions to shared interests, these challenges make connecting easy for introverts.",
  "Personality-Based Matching": "Take a quick quiz to find friends who share your passions and personality. Our algorithm ensures meaningful connections based on compatibility.",
  "Virtual Hangout Spaces": "Join virtual rooms tailored to your interests, like gaming or studying. Engage in low-pressure conversations and activities from the comfort of home.",
  "Interactive Map": "Explore a real-time map to find nearby students with similar interests. Plan meetups or study sessions effortlessly with location-based matching.",
  "Senior Mentorship": "Connect with senior students for guidance on academics, internships, and college life. Our skill-based matching ensures relevant mentorship.",
  "Community Meetups": "Participate in organized events, both virtual and in-person, to foster friendships. From hobby clubs to study groups, there’s something for everyone."
};

const initialCards = [
  { title: "In-App Journal", category: "social", icon: "fa-book" },
  { title: "Icebreaker Challenges", category: "social", icon: "fa-comment-dots" },
  { title: "Personality-Based Matching", category: "social", icon: "fa-users" },
  { title: "Virtual Hangout Spaces", category: "virtual", icon: "fa-laptop-house" },
  { title: "Interactive Map", category: "social", icon: "fa-map-marked-alt" },
  { title: "Senior Mentorship", category: "academic", icon: "fa-user-graduate" },
  { title: "Community Meetups", category: "social", icon: "fa-handshake" }
];

export default function Services() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks") || "[]");
  });
  const [notification, setNotification] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  const cardsRef = useRef([]);

  // Sticky header effect
  const headerRef = useRef(null);
  const backToTopRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (headerRef.current) {
        headerRef.current.classList.toggle(styles.scrolled, scrolled);
      }
      if (backToTopRef.current) {
        backToTopRef.current.classList.toggle(styles.visible, window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer (fade-in)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          setVisibleCards((prev) => [...new Set([...prev, idx])]);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredCards = useMemo(() => {
    return initialCards.filter((card) => {
      const matchFilter = filter === "all" || card.category === filter;
      const matchSearch =
        card.title.toLowerCase().includes(query.toLowerCase()) ||
        serviceDetails[card.title].toLowerCase().includes(query.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, query]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleBookmark = (title) => {
    let updated;
    if (bookmarks.includes(title)) {
      updated = bookmarks.filter((b) => b !== title);
      showNotification(`${title} removed from bookmarks`);
    } else {
      updated = [...bookmarks, title];
      showNotification(`${title} bookmarked!`);
    }
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const handleLearnMore = (title) => {
    showNotification(serviceDetails[title], 5000);
  };

  return (
    <>
      {/* Header */}
      <header ref={headerRef} className={styles.header}>
  <div className={styles.logo}>Dosti<span>शिप</span></div>
  <nav>
    <ul className={styles.navLinks}>
      <li><Link to="/Home">Home</Link></li>
      <li><Link to="/AboutUs">About</Link></li>
      <li><Link to="/Contact">Contact</Link></li>
      <li><Link to="/Login">Login</Link></li>
    </ul>
  </nav>
</header>


      {/* Services */}
      <section className={styles.servicesSection}>
        <h2>Our Services</h2>
        <p>Discover how Dostiship helps students connect and grow.</p>

        <div className={styles.filterBar}>
          {['all','social','academic','virtual'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? styles.active : ""}
            >
              {f}
            </button>
          ))}

          <input
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filteredCards.map((card, idx) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              data-index={idx}
              className={`${styles.card} ${visibleCards.includes(idx) ? styles.visible : ""}`}
            >
              <button onClick={() => toggleBookmark(card.title)}>
                ★
              </button>

              <i className={`fas ${card.icon}`}></i>
              <h3>{card.title}</h3>
              <p>{serviceDetails[card.title]}</p>

              <button onClick={() => handleLearnMore(card.title)}>
                Learn More
              </button>
            </div>
          ))}
        </div>

        <a className={styles.joinBtn} href="/Login">
          Join Now to Explore
        </a>
      </section>

      {/* Notification */}
      {notification && (
        <div className={styles.popup}>{notification}</div>
      )}

      {/* Back to top */}
      <button
        ref={backToTopRef}
        className={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </>
  );
}

