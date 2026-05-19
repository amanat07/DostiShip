import { useEffect, useState, useRef } from "react";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [journalCount, setJournalCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editConfirmPassword, setEditConfirmPassword] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const navRef = useRef(null);
  const hamburgerRef = useRef(null);

  // ── AUTH CHECK ──
  useEffect(() => {
    const sessionUser = localStorage.getItem("user");
    if (!token || !sessionUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(sessionUser);
    setUser(parsedUser);
  }, []);

  // ── LOAD DATA ──
  useEffect(() => {
    if (!user) return;
    loadInterests();
    setFriends([]);;
    loadJournal();
  }, [user]);

  // ── STICKY HEADER ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── CLOSE MENU ON OUTSIDE CLICK ──
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

  // ── NOTIFICATION ──
  const showNotification = (message, type = "info") => {
    const popup = document.getElementById("notificationPopup");
    if (!popup) return;
    popup.textContent = message;
    popup.className = `${styles.notificationPopup} ${styles[type] || ""}`;
    popup.style.display = "block";
    setTimeout(() => { popup.style.display = "none"; }, 3000);
  };

  // ── INTERESTS ──
  const loadInterests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/interests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) { setInterests([]); return; }
      setInterests(data.interests || []);
    } catch {
      setInterests([]);
    }
  };

  // ── FRIENDS ──
  const loadFriends = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/matches/${user.id}`);
      const data = await res.json();
      if (!res.ok) { setFriends([]); return; }
      setFriends(data.friends || []);
    } catch {
      setFriends([]);
    }
  };

  // ── JOURNAL ──
  const loadJournal = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/journal/${user.id}`);
      const data = await res.json();
      setJournalCount(data.count || 0);
    } catch {
      setJournalCount(0);
    }
  };

  // ── PROFILE IMAGE ──
  const getProfileImage = () => {
    if (!user?.profilePic) return "https://via.placeholder.com/80";
    if (user.profilePic.startsWith("http")) return user.profilePic;
    return `http://localhost:5000/${user.profilePic}`;
  };

  // ── EDIT FORM SUBMIT ──
const handleEditSubmit = async (e) => {
  e.preventDefault();

  if (editPassword && editPassword !== editConfirmPassword) {
    showNotification("Passwords do not match", "error");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:5000/api/auth/update-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: editUsername,
          password: editPassword,
          interests,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      showNotification(data.error || "Update failed", "error");
      return;
    }

    setUser(data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    showNotification(
      "Profile updated successfully",
      "success"
    );

    setShowEditForm(false);

  } catch (err) {
    showNotification(
      "Server error",
      "error"
    );
  }
};

  // ── LOGOUT ──
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  const joinedDays = user.joinedAt
    ? Math.floor((new Date() - new Date(user.joinedAt)) / (1000 * 60 * 60 * 24))
    : 0;

  const joinedAtFormatted = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <div>
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

        <div className={styles.logo} onClick={() => navigate("/dashboard")}>
          Dosti<span>शिप</span>
        </div>

        {/* <nav
          className={`${styles.navContainer} ${menuOpen ? styles.active : ""}`}
          ref={navRef}
        >
          <ul className={styles.navLinks}>
            <li>
              <a
                onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === "Enter") navigate("/dashboard"); }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => { setMenuOpen(false); navigate("/journal"); }}
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === "Enter") navigate("/journal"); }}
              >
                Journal
              </a>
            </li>
            <li>
              <a
                className={styles.activeLink}
                onClick={() => { setMenuOpen(false); navigate("/profile"); }}
                tabIndex={0}
              >
                Profile
              </a>
            </li>
          </ul> */}
        {/* </nav> */}
      </header>
<div className={styles.mainLayout}>
  {/* SIDEBAR */}
<aside
  className={`${styles.sidebar} ${
    menuOpen ? styles.sidebarActive : ""
  }`}
  ref={navRef}
>
  {/* USER */}
  <div className={styles.sidebarUser}>
    <img
      src={getProfileImage()}
      alt="Profile"
      className={styles.sidebarAvatar}
    />

    <div className={styles.sidebarUserInfo}>
      <div className={styles.sidebarUserName}>
        {user.name || "User"}
      </div>

      <div className={styles.sidebarUserEmail}>
        {user.email || "—"}
      </div>
    </div>
  </div>

  {/* MENU */}
  <div className={styles.sidebarSection}>
    <p className={styles.sidebarTitle}>Menu</p>

    <ul className={styles.sidebarMenu}>
      <li>
        <a onClick={() => navigate("/dashboard")}>
          <i className="fa-solid fa-house"></i>
          Home
        </a>
      </li>

      <li>
        <a onClick={() => navigate("/notifications")}>
          <i className="fa-solid fa-bell"></i>
          Notifications
        </a>
      </li>

      <li>
        <a onClick={() => navigate("/map")}>
          <i className="fa-solid fa-map-location-dot"></i>
          Friends Map
        </a>
      </li>

      <li>
        <a onClick={() => navigate("/inbox")}>
          <i className="fa-solid fa-envelope"></i>
          Inbox
        </a>
      </li>

      <li>
        <a onClick={() => navigate("/journal")}>
          <i className="fa-solid fa-book-open"></i>
          Journal
        </a>
      </li>

      <li>
        <a onClick={() => navigate("/hangout")}>
          <i className="fa-solid fa-users"></i>
          Hangout Rooms
        </a>
      </li>
    </ul>
  </div>

  {/* ACCOUNT */}
  <div className={styles.sidebarSection}>
    <p className={styles.sidebarTitle}>Account</p>

    <ul className={styles.sidebarMenu}>
      <li>
        <a
          className={styles.activeLink}
          onClick={() => navigate("/profile")}
        >
          <i className="fa-solid fa-user"></i>
          Profile
        </a>
      </li>

      

      <li>
        <a onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </a>
      </li>
    </ul>
  </div>
</aside>
      <div className={styles.pageWrapper}>

        {/* PROFILE HERO */}
        <div className={styles.profileHero}>
          <div className={styles.heroTop}>
            <img
              id="profileImage"
              src={getProfileImage()}
              className={styles.avatarRing}
              alt="Profile"
            />
            <div className={styles.heroInfo}>
              <h2>{user.name || "—"}</h2>
              <p>{user.email || "—"}</p>
              <span className={styles.usernameBadge}>
                @{user.username || "—"}
              </span>
            </div>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{friends.length}</span>
              <span className={styles.statLabel}>Friends</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{interests.length}</span>
              <span className={styles.statLabel}>Interests</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{journalCount}</span>
              <span className={styles.statLabel}>Journal Entries</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{joinedDays}</span>
              <span className={styles.statLabel}>Days on Dosti</span>
            </div>
          </div>
        </div>

        {/* PROFILE GRID */}
        <div className={styles.profileGrid}>

          {/* PERSONAL INFO */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <i className="fas fa-user"></i> Personal Information
            </div>

            <div id="infoDisplay">
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Full Name</span>
                <span className={styles.infoValue}>{user.name || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Username</span>
                <span className={styles.infoValue}>{user.username || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{user.email || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Gender</span>
                <span className={styles.infoValue}>{user.gender || "—"}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Member Since</span>
                <span className={styles.infoValue}>{joinedAtFormatted}</span>
              </div>
            </div>

            <div className={styles.actionBtns}>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={() => {
                  setEditUsername(user.username || "");
                  setEditPassword("");
                  setEditConfirmPassword("");
                  setShowEditForm(true);
                }}
              >
                <i className="fas fa-edit"></i> Edit Profile
              </button>
              <button
                className={`${styles.btn} ${styles.btnDanger}`}
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>

            {/* EDIT FORM */}
            {showEditForm && (
              <form
                className={styles.editForm}
                onSubmit={handleEditSubmit}
              >
                <div className={styles.formGroup}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>New Password (optional)</label>
                  <input
                    type="password"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={editConfirmPassword}
                    onChange={(e) => setEditConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={styles.actionBtns}>
                  <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnOutline}`}
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* MY INTERESTS */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <i className="fas fa-heart"></i> My Interests
            </div>
            <div className={styles.interestsGrid}>
              {interests.length === 0 ? (
                <p className={styles.noInterests}>No interests selected yet.</p>
              ) : (
                interests.map((interest, idx) => (
                  <div key={idx} className={styles.interestTag}>
                    <i className="fa-solid fa-star"></i> {interest}
                  </div>
                ))
              )}
            </div>
            <button
              className={styles.editInterestsBtn}
              onClick={() => navigate("/discover-interests")}
            >
              <i className="fas fa-plus"></i> Edit Interests
            </button>
          </div>

          {/* MY FRIENDS */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <i className="fas fa-user-friends"></i> My Friends
            </div>
            {friends.length === 0 ? (
              <div className={styles.noFriends}>
                <i className="fas fa-user-friends"></i>
                <p>No friends yet.</p>
              </div>
            ) : (
              <div className={styles.friendsList}>
                {friends.slice(0, 5).map((f, idx) => (
                  <div key={idx} className={styles.friendItem}>
                    <div className={styles.friendAvatar}>
                      {f.name?.charAt(0) || "?"}
                    </div>
                    <div className={styles.friendInfo}>
                      <div className={styles.friendName}>{f.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENT JOURNAL */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <i className="fas fa-book-open"></i> Recent Journal Entries
            </div>
            <div id="journalPreview">
              {journalCount === 0 ? (
                <p className={styles.noJournal}>No journal entries yet.</p>
              ) : (
                <p className={styles.noJournal}>Total Entries: {journalCount}</p>
              )}
            </div>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              style={{ marginTop: "15px", fontSize: "12px" }}
              onClick={() => navigate("/journal")}
            >
              <i className="fas fa-feather-alt"></i> Open Journal
            </button>
          </div>

        </div>
      </div>

      {/* NOTIFICATION */}
      <div id="notificationPopup" className={styles.notificationPopup}></div>
    </div>
</div>
  );
}