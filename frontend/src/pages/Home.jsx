
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css"; 
// IMPORT ASSETS
import videoBg from "../assets/video1.mp4";
import chatImg from "../assets/chat.jpeg";
import mentorshipImg from "../assets/mentorship.jpeg";
import friendsImg from "../assets/friends.png";
import meetupsImg from "../assets/meetups.jpeg";
import promotionImg from "../assets/promotion.jpeg";
import studyBuddyImg from "../assets/study_buddy.jpeg";
import introvertImg from "../assets/introverts.jpeg";
import facebookImg from "../assets/facebook.jpeg";
import twitterImg from "../assets/twitter.jpg";
import instagramImg from "../assets/instagram.jpeg";

// ─── Data ────────────────────────────────────────────────────────────────────

const serviceDetails = {
  chat: {
    title: "Chat & Messaging",
    desc: "Our secure chat platform allows you to connect with friends through private messages or group chats, all protected with end-to-end encryption for your privacy.",
    img: chatImg,
  },
  mentorship: {
    title: "Senior Mentorship",
    desc: "Receive tailored advice and academic support from experienced seniors who can guide you through your studies and career goals.",
    img: mentorshipImg,
  },
  friends: {
    title: "Find Like-Minded Friends",
    desc: "Discover and connect with individuals who share your passions, from hobbies to academic interests, fostering meaningful friendships.",
    img: friendsImg,
  },
  meetups: {
    title: "Meetups",
    desc: "Join virtual or in-person meetups to network, build stronger connections, and participate in fun community activities.",
    img: meetupsImg,
  },
};

const reviews = [
  {
    text: "Never expected to find such great friends online! Now we chat daily. Highly recommend!",
    name: "Ishita Sharma",
  },
  {
    text: "This site is a blessing! Seniors guided me with tips and mentorship, helping me excel in exams!",
    name: "Rajat Verma",
  },
  {
    text: "This site changed my life. I used to feel lonely, but now I have a solid group of friends who make every day special.",
    name: "Harshdeep Singh",
  },
  {
    text: "Never thought a friendship site could aid academics! Supportive seniors make it an amazing experience!",
    name: "Anjali Mishra",
  },
];

const events = [
  {
    id: 1,
    title: "Dostiशिप Promotion",
    date: "2025-04-13",
    label: "Sun, 13 Apr 2025 | Main Auditorium",
    img: promotionImg,
  },
  {
    id: 2,
    title: "Study Buddies Social Mixer",
    date: "2025-05-11",
    label: "Sun, 11 May 2025 | Chitkara Woods",
    img: studyBuddyImg,
  },
  {
    id: 3,
    title: "Introverts' Communication",
    date: "2025-07-06",
    label: "Sun, 6 Jul 2025 | Beta Zone",
    img: introvertImg,
  },
];

// Filter reference date matching the HTML
const REFERENCE_DATE = new Date("2025-04-29");

// ─── Component ───────────────────────────────────────────────────────────────

const Home = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState({ show: false, title: "", desc: "" });
  const [notification, setNotification] = useState({ show: false, msg: "" });

  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const eventsRef = useRef(null);
  const reviewsRef = useRef(null);

  // ── Notification helper
  const showNotification = (msg) => {
    setNotification({ show: true, msg });
    setTimeout(() => setNotification({ show: false, msg: "" }), 3000);
  };

  // ── Scroll reveal
  useEffect(() => {
    const sections = [
      servicesRef.current,
      aboutRef.current,
      eventsRef.current,
      reviewsRef.current,
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => sections.forEach((el) => el && observer.unobserve(el));
  }, []);

  // ── Auto-cycle reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ── Filtered events
  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    return new Date(e.date) > REFERENCE_DATE;
  });

  // ── Review navigation
  const prevReview = () =>
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  const nextReview = () =>
    setActiveReview((prev) => (prev + 1) % reviews.length);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── HEADER ── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          Dosti<span>शिप</span>
        </div>
        <nav className={styles.navContainer}>
          <ul className={styles.navLinks}>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* ── HERO ── */}
<section className={styles.mainSection} id="home">
  <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
    <source src={videoBg} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className={styles.mainContent}>
          <h1>Join Dostiशिप Today!</h1>
          <p>
            Connect with like-minded people, share your experiences, and grow
            together in a supportive community.
          </p>
          <Link to="/register">
            <button className={styles.btn}>Get Started</button>
          </Link>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className={styles.services} id="services" ref={servicesRef}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <p className={styles.sectionSubtitle}>
          Explore our services designed to help you connect, chat, and build
          lasting friendships in a safe and fun environment
        </p>
        <div className={styles.serviceContainer}>
          {Object.entries(serviceDetails).map(([key, svc]) => (
            <div
              key={key}
              className={styles.service}
              data-service={key}
              onClick={() =>
                setModal({ show: true, title: svc.title, desc: svc.desc })
              }
            >
              <img src={svc.img} alt={svc.title} />
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className={styles.aboutSection} id="about" ref={aboutRef}>
        <div className={styles.aboutContainer}>
          <h2>About Dostiशिप</h2>
          <p>
            We believe that friendship is the foundation of happiness and
            success. Whether you're looking for a study partner, a mentor, or
            just someone to share your thoughts with, we make it easy to meet
            people who truly understand you. Our platform is designed to foster
            meaningful connections in a safe, inclusive environment.
          </p>
          <Link to="/aboutus" className={styles.btn}>
            Learn More
          </Link>
        </div>
      </section>

      {/* ── FIXED SOCIAL SIDEBAR ── */}
      <div className={styles.socialIcons}>
        <a href="#" aria-label="Facebook">
          <img src={facebookImg} alt="Facebook" />
          <span className={styles.tooltip}>Facebook</span>
        </a>
        <a href="#" aria-label="Twitter">
          <img src={twitterImg} alt="Twitter" />
          <span className={styles.tooltip}>Twitter</span>
        </a>
        <a
          href="https://www.instagram.com/dostiship/?hl=en"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <img src={instagramImg} alt="Instagram" />
          <span className={styles.tooltip}>Instagram</span>
        </a>
      </div>

      {/* ── EVENTS ── */}
      <section className={styles.eventsSection} id="events" ref={eventsRef}>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <p className={styles.sectionSubtitle}>
          Join our community events to meet new friends and expand your network
        </p>
        <div className={styles.eventsFilter}>
          <button
            className={`${styles.filterBtn} ${
              filter === "all" ? styles.active : ""
            }`}
            onClick={() => {
              setFilter("all");
              showNotification("Showing all events");
            }}
          >
            All Events
          </button>
          <button
            className={`${styles.filterBtn} ${
              filter === "upcoming" ? styles.active : ""
            }`}
            onClick={() => {
              setFilter("upcoming");
              showNotification("Showing upcoming events");
            }}
          >
            Upcoming Events
          </button>
        </div>
        <div className={styles.eventsContainer}>
          {filteredEvents.map((evt) => (
            <div className={styles.eventCard} key={evt.id}>
              <div className={styles.eventImage}>
                <img src={evt.img} alt={evt.title} />
              </div>
              <div className={styles.eventContent}>
                <h3>{evt.title}</h3>
                <p>{evt.label}</p>
                <Link to="/event">Register Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section
        className={styles.reviewsSection}
        id="reviews"
        ref={reviewsRef}
      >
        <h2 className={styles.sectionTitle}>What People Say</h2>
        <p className={styles.sectionSubtitle}>
          Hear from our community members about their experiences
        </p>
        <div className={styles.reviewsContainer}>
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`${styles.reviewCard} ${
                i === activeReview ? styles.activeCard : ""
              }`}
            >
              <p>"{r.text}"</p>
              <h3>{r.name}</h3>
            </div>
          ))}
        </div>
        <div className={styles.carouselControls}>
          <button className={styles.carouselBtn} onClick={prevReview}>
            &#8249;
          </button>
          <button className={styles.carouselBtn} onClick={nextReview}>
            &#8250;
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          {/* Column 1 – Brand */}
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              Dosti<span>शिप</span>
            </div>
            <p>
              Building meaningful connections that last a lifetime. Join our
              community today!
            </p>
            <div className={styles.footerSocial}>
  <a href="#" aria-label="Facebook">
    <i className="fab fa-facebook-f"></i>
  </a>
  <a href="#" aria-label="Twitter">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="https://www.instagram.com/dostiship/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram">
    <i className="fab fa-instagram"></i>
  </a>
  <a href="#" aria-label="LinkedIn">
    <i className="fab fa-linkedin-in"></i>
  </a>
</div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link to="/login">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/event">Events</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 – Services */}
          <div className={styles.footerColumn}>
            <h3>Services</h3>
            <ul className={styles.footerLinks}>
              <li>Chat &amp; Messaging</li>
              <li>Senior Mentorship</li>
              <li>Find Friends</li>
              <li>Study Groups</li>
            </ul>
          </div>

          {/* Column 4 – Contact */}
          <div className={styles.footerColumn}>
            <h3>Contact Us</h3>
            <div className={styles.footerContact}>
              <p>
                <i className="fas fa-map-marker-alt"></i> Chitkara University,
                Punjab, India
              </p>
              <p>
                <i className="fas fa-envelope"></i>{" "}
                atharavtarika@dostiship.com
              </p>
              <p>
                <i className="fas fa-phone"></i> +91 9466903617
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            © 2023 Dostiशिप. All Rights Reserved. | Designed with ❤ by
            Dostiशिप Team
          </p>
        </div>
      </footer>

      {/* ── SERVICE MODAL ── */}
      {modal.show && (
        <div
          className={styles.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget)
              setModal({ ...modal, show: false });
          }}
        >
          <div className={styles.modalContent}>
            <h2>{modal.title}</h2>
            <p>{modal.desc}</p>
            <button
              className={styles.btn}
              onClick={() => setModal({ ...modal, show: false })}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── NOTIFICATION ── */}
      {notification.show && (
        <div className={styles.notification}>{notification.msg}</div>
      )}
    </>
  );
};

export default Home;