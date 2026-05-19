import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

import { Link } from "react-router-dom";

import styles from "../styles/Notification.module.css";

export default function Notifications() {
  const sidebarRef = useRef(null);
  const profileRef = useRef(null);

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // ── AUTH ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "http://localhost:3000/login";
      return;
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ── LOAD DATA ──
  useEffect(() => {
    loadRequests();
    loadSuggestions();
  }, []);

  const loadRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/friends/requests",
        { headers: { Authorization: "Bearer " + token } }
      );
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSuggestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:5000/api/friends/suggestions",
        { headers: { Authorization: "Bearer " + token } }
      );
      const data = await res.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const sendRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/friends/send/${id}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
      setSuggestions((prev) => prev.filter((u) => u._id !== id));
      showPopup("Friend request sent");
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/friends/accept/${id}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });
      setRequests((prev) => prev.filter((r) => r._id !== id));
      showPopup("Friend request accepted");
    } catch (err) {
      console.error(err);
    }
  };

  const declineRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/friends/decline/${id}`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });
      setRequests((prev) => prev.filter((r) => r._id !== id));
      showPopup("Request declined");
    } catch (err) {
      console.error(err);
    }
  };

  // ── CLICK OUTSIDE ──
  useEffect(() => {
    function handler(e) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
      if (
        window.innerWidth <= 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.hamburger}`)
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // ── LOGOUT ──
  const logout = useCallback((e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000/login";
  }, []);

  // ── HELPERS ──
  const getInitial = (name) =>
    name ? name.charAt(0).toUpperCase() : "?";

  function showPopup(msg, type = "success") {
    setPopup({ msg, type });
    setTimeout(() => setPopup(null), 3000);
  }

  // ── AVATAR ──
  // Renders a circular div that shows either the profile pic
  // or the user's initial letter — never a broken image.
  function Avatar({ cls, name, pic }) {
    const initial = getInitial(name);
    const [imgFailed, setImgFailed] = useState(false);

    return (
      <div className={cls}>
        {pic && !imgFailed ? (
          <img
            src={pic}
            alt={name}
            onError={() => setImgFailed(true)}
          />
        ) : (
          initial
        )}
      </div>
    );
  }

  // ── RENDER LIST ──
  // Single source of truth — no duplicate "Friend Requests" heading
  function renderList() {
    return (
      <div className={styles.requestsSection}>

        {/* ── FRIEND REQUESTS ── */}
        <h3 className={styles.sectionTitle}>
          Friend Requests
          {requests.length > 0 && (
            <span style={{
              marginLeft: 10,
              background: "#ff6b6b",
              color: "white",
              borderRadius: 10,
              padding: "1px 8px",
              fontSize: 12,
              fontWeight: 600,
              verticalAlign: "middle",
            }}>
              {requests.length}
            </span>
          )}
        </h3>

        {requests.length === 0 ? (
          <p className={styles.emptyText}>No pending friend requests</p>
        ) : (
          requests.map((r) => (
            <div key={r._id} className={styles.requestCard}>
              <Avatar
                cls={styles.notifAvatar}
                name={r.from?.username}
                pic={r.from?.profilePic}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={styles.notifUser}>
                  {r.from?.username}
                </div>
                <div className={styles.notifText}>
                  {r.from?.interests?.join(", ") || "No interests listed"}
                </div>
              </div>
              <div className={styles.notifActions}>
                <button
                  className={styles.acceptBtn}
                  onClick={() => acceptRequest(r._id)}
                >
                  Accept
                </button>
                <button
                  className={styles.declineBtn}
                  onClick={() => declineRequest(r._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        )}

        <hr className={styles.sectionDivider} />

        {/* ── SUGGESTED FRIENDS ── */}
        <h3 className={styles.sectionTitle} style={{ marginTop: 20 }}>
          People You May Know
        </h3>

        {suggestions.length === 0 ? (
          <p className={styles.emptyText}>No suggestions right now</p>
        ) : (
          suggestions.map((u) => (
            <div key={u._id} className={styles.requestCard}>
              <Avatar
                cls={styles.notifAvatar}
                name={u.username}
                pic={u.profilePic}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={styles.notifUser}>{u.username}</div>
                <div className={styles.notifText}>
                  {u.interests?.join(", ") || "No interests listed"}
                </div>
              </div>
              <button
                className={styles.acceptBtn}
                onClick={() => sendRequest(u._id)}
              >
                Add Friend
              </button>
            </div>
          ))
        )}

      </div>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div className={styles.pageWrapper}>

        {/* ── HEADER ── */}
        <header className={styles.header}>
          <button
            className={styles.hamburger}
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen((o) => !o);
            }}
          >
            <i className="fa-solid fa-bars" />
          </button>

          <Link to="/dashboard" className={styles.logo}>
            Dosti<span>शिप</span>
          </Link>

          <div className={styles.headerSearch}>
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Search people..." />
          </div>

          <div className={styles.headerIcons}>
            <div className={styles.profileDropdown} ref={profileRef}>
              <button
                className={styles.profileBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen((o) => !o);
                }}
              >
                <Avatar
                  cls={styles.profileAvatar}
                  name={user?.name}
                  pic={user?.profilePic}
                />
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ fontSize: 10, color: "#777" }}
                />
              </button>

              {profileOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/profile">
                    <i className="fa-solid fa-user" />
                    My Profile
                  </Link>
                  <a href="/home" onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className={styles.mainContent}>

          {/* ── SIDEBAR ── */}
          <aside
            className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarActive : ""}`}
            ref={sidebarRef}
          >
            <div className={styles.sidebarUser}>
              <Avatar
                cls={styles.sidebarAvatar}
                name={user?.name}
                pic={user?.profilePic}
              />
              <div className={styles.sidebarUserInfo}>
                <div className={styles.sidebarUserName}>
                  {user?.name || "Loading..."}
                </div>
                <div className={styles.sidebarUserEmail}>
                  {user?.email || "—"}
                </div>
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <p className={styles.sidebarTitle}>Menu</p>
              <ul className={styles.sidebarMenu}>
                <li>
                  <Link to="/dashboard">
                    <i className="fa-solid fa-house" /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className={styles.active}>
                    <i className="fa-solid fa-bell" /> Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/map">
                    <i className="fa-solid fa-map-location-dot" /> Friends Map
                  </Link>
                </li>
                <li>
                  <Link to="/inbox">
                    <i className="fa-solid fa-envelope" /> Inbox
                  </Link>
                </li>
                <li>
                  <Link to="/journal">
                    <i className="fa-solid fa-book-open" /> Journal
                  </Link>
                </li>
                <li>
                  <Link to="/hangout">
                    <i className="fa-solid fa-users" /> Hangout Rooms
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main className={styles.contentArea}>
            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Notifications</h2>
              <button
                className={styles.notifBtn}
                onClick={() => window.history.back()}
              >
                <i className="fa-solid fa-arrow-left" /> Back
              </button>
            </div>

            <div className={styles.notificationsContainer}>
              <div className={styles.notificationsHeader}>
                <h3 className={styles.notificationsTitle}>
                  Friend Requests &amp; Suggestions
                </h3>
              </div>

              {/* renderList() handles both sections — no wrapper duplication */}
              {renderList()}
            </div>
          </main>

        </div>
      </div>

      {/* ── POPUP ── */}
      {popup && (
        <div
          className={`${styles.notifPopup} ${
            popup.type === "error" ? styles.popupError : styles.popupSuccess
          }`}
        >
          {popup.msg}
        </div>
      )}
    </>
  );
}