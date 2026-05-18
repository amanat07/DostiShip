import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../styles/Map.module.css";

export default function Map() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  // ✅ FIX: Hamburger state added (was entirely missing)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── AUTH CHECK ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    // ✅ FIX: Use navigate() instead of window.location.href for React Router
    if (!token) {
      navigate("/login");
      return;
    }

    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/profile", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // ✅ FIX: Also clear "user" like HTML does
        navigate("/login");
      }
    };

    getUser();
  }, []);

  // ✅ FIX: Close dropdown on outside click (was missing — HTML had this)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileOpen && !e.target.closest(`.${styles.profile}`)) {
        setProfileOpen(false);
      }
      // Close sidebar on mobile when clicking outside
      if (
        sidebarOpen &&
        window.innerWidth <= 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.hamburger}`)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [profileOpen, sidebarOpen]);

  // ── LOGOUT ──
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ FIX: HTML clears both; JSX was only clearing "token"
    navigate("/");
  };

  // ── MAP INIT ──
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, { zoomControl: true }).setView(
      [30.516459, 76.65921],
      15
    );
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const friends = [
      {
        name: "Alex",
        image: "/static/profileimg.jpg",
        interests: "Hiking, Music",
        latitude: 30.517459,
        longitude: 76.66021,
      },
      {
        name: "Sam",
        image: "/static/profileimg.jpg",
        interests: "Reading, Gaming",
        latitude: 30.515459,
        longitude: 76.65821,
      },
      {
        name: "Priya",
        image: "/static/profileimg.jpg",
        interests: "Photography, Travel",
        latitude: 30.518459,
        longitude: 76.66121,
      },
    ];

    const addFriends = () => {
      friends.forEach((f) => {
        // ✅ FIX: Popup markup matches HTML original (class, alt, label structure)
        L.marker([f.latitude, f.longitude])
          .addTo(map)
          .bindPopup(`
            <div class="user-popup">
              <img src="${f.image}" alt="${f.name}'s image" width="50" height="50" style="border-radius:50%;margin-bottom:10px;" />
              <h3>${f.name}</h3>
              <p>Interests: ${f.interests}</p>
            </div>
          `);
      });
    };

    const setDefault = () => {
      map.setView([30.516459, 76.65921], 15);
      L.marker([30.516459, 76.65921])
        .addTo(map)
        .bindPopup("<b>Chitkara University</b>")
        .openPopup(); // ✅ FIX: .openPopup() was missing in JSX version
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.setView([latitude, longitude], 15);

          // ✅ FIX: User popup now matches HTML — full styled popup with image
          const userName = user?.name || "User";
          const userPic = user?.profilePic || "/static/profileimg.jpg";
          const userPopupContent = `
            <div class="user-popup">
              <img src="${userPic}" alt="Your image" width="50" height="50"
                style="border-radius:50%;margin-bottom:10px;"
                onerror="this.style.display='none'" />
              <h3>You (${userName})</h3>
              <p>Interests: Not specified</p>
            </div>`;

          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(userPopupContent)
            .openPopup();

          addFriends();
        },
        (error) => {
          console.error("Geolocation error:", error);
          setDefault();
          addFriends();
        }
      );
    } else {
      setDefault();
      addFriends();
    }
  }, [user]);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  // ✅ FIX: setAvatar helper — renders img if profilePic exists, else initial (matches HTML)
  const renderAvatar = (cls) => {
    const initial = getInitial(user?.name);
    if (user?.profilePic) {
      return (
        <div className={cls}>
          <img
            src={user.profilePic}
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.textContent = initial; }}
            alt="avatar"
          />
        </div>
      );
    }
    return <div className={cls}>{initial}</div>;
  };

  return (
    <div className={styles.mapContainer}>
      {/* ── HEADER ── */}
      <header className={styles.header}>
        {/* ✅ FIX: Hamburger button added (was entirely missing from JSX) */}
        <button
          className={styles.hamburger}
          onClick={(e) => { e.stopPropagation(); setSidebarOpen((o) => !o); }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* ✅ FIX: Use React Router Link instead of <a href> */}
        <Link to="/page" className={styles.logo}>
          Dosti<span>शिप</span>
        </Link>

        <div className={styles.search}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder="Search people, posts..." />
        </div>

        <div className={styles.headerIcons}>
          <div className={styles.profile}>
            <button
              className={styles.profileBtn}
              onClick={(e) => { e.stopPropagation(); setProfileOpen((o) => !o); }}
            >
              {renderAvatar(styles.avatar)}
              <i
                className="fa-solid fa-chevron-down"
                style={{ fontSize: "10px", color: "#777" }}
              ></i>
            </button>

            {/* ✅ FIX: Dropdown styled with icons to match HTML */}
            {profileOpen && (
              <div className={styles.dropdown}>
                <Link to="/profile">
                  <i className="fa-solid fa-user"></i> My Profile
                </Link>
                <Link to="/interest">
                  <i className="fa-solid fa-heart"></i> My Interests
                </Link>
                <a href="/" onClick={logout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── SIDEBAR ── */}
      {/* ✅ FIX: sidebarOpen class applied for mobile toggle */}
      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarActive : ""}`}
        ref={sidebarRef}
      >
        {/* ✅ FIX: User box with proper name/email display */}
        <div className={styles.userBox}>
          {renderAvatar(styles.sidebarAvatar)}
          <div className={styles.userInfo}>
            <div className={styles.sidebarName}>{user?.name || "Loading..."}</div>
            <div className={styles.sidebarEmail}>{user?.email || "—"}</div>
          </div>
        </div>

        {/* ✅ FIX: Section title "Menu" added */}
        <p className={styles.sidebarTitle}>Menu</p>
        <nav className={styles.sidebarMenu}>
          <Link to="/page">
            <i className="fa-solid fa-house"></i> Home
          </Link>
          <Link to="/notification">
            <i className="fa-solid fa-bell"></i> Notifications
          </Link>
          <Link to="/map" className={styles.active}>
            <i className="fa-solid fa-map-location-dot"></i> Friends Map
          </Link>
          <Link to="/inbox">
            <i className="fa-solid fa-envelope"></i> Inbox
          </Link>
          <Link to="/journal">
            <i className="fa-solid fa-book-open"></i> Journal
          </Link>
          <Link to="/hangout">
            <i className="fa-solid fa-users"></i> Hangout Rooms
          </Link>
        </nav>

        {/* ✅ FIX: Account section entirely missing from JSX — added back */}
        <p className={styles.sidebarTitle}>Account</p>
        <nav className={styles.sidebarMenu}>
          <Link to="/profile">
            <i className="fa-solid fa-user-circle"></i> Profile
          </Link>
          <Link to="/interest">
            <i className="fa-solid fa-heart"></i> Interests
          </Link>
          <a href="/" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </a>
        </nav>
      </aside>

      {/* ── MAP ── */}
      <div className={styles.content}>
        <div ref={mapRef} className={styles.map}></div>
      </div>
    </div>
  );
}