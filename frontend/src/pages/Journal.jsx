import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Journal.module.css";
const API = "http://localhost:5000";

// ─── Constants ────────────────────────────────────────────────────────────────

const MOODS = ["happy", "sad", "anxious", "proud", "neutral"];

const MOOD_EMOJI = { happy: "😊", sad: "😔", anxious: "😰", proud: "🌟", neutral: "😐" };
const MOOD_COLOR = { happy: "#4CAF50", sad: "#2196F3", anxious: "#FF9800", proud: "#9C27B0", neutral: "#9E9E9E" };

const JOURNAL_PROMPTS = [
  { icon: "🤝", text: "Write about a social interaction today that made you feel good." },
  { icon: "😟", text: "What social situation makes you most anxious? Why?" },
  { icon: "🌱", text: "How have you grown socially in the past month?" },
  { icon: "🎯", text: "What is one social goal you want to achieve this week?" },
  { icon: "💙", text: "Describe a moment you felt truly understood by someone." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function moodEmoji(mood) { return MOOD_EMOJI[mood] || "😐"; }

function formatTime(iso) {
  const diff = Math.floor((new Date() - new Date(iso)) / 1000);
  if (diff < 60)    return "Just now";
  if (diff < 3600)  return Math.floor(diff / 60) + " mins ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function todayString() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

function Avatar({ name, pic, size = "header" }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  const cls = size === "sidebar" ? styles.sidebarAvatar : styles.profileAvatar;
  if (pic) {
    return (
      <div className={cls}>
        <img
          src={pic}
          alt={initial}
          style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          onError={(e) => { e.currentTarget.parentElement.textContent = initial; }}
        />
      </div>
    );
  }
  return <div className={cls}>{initial}</div>;
}

// ─── Mood Chart ───────────────────────────────────────────────────────────────

function MoodChart({ entries }) {
  if (!entries.length) {
    return <p className={styles.moodChartEmpty}>Save entries to see your mood breakdown.</p>;
  }
  const counts = { happy: 0, sad: 0, anxious: 0, proud: 0, neutral: 0 };
  entries.forEach((e) => { if (counts[e.mood] !== undefined) counts[e.mood]++; });
  const total = entries.length || 1;
  return (
    <div className={styles.moodChart}>
      {Object.entries(counts).map(([mood, count]) => {
        const pct = Math.round((count / total) * 100);
        return (
          <div key={mood} className={styles.moodBarRow}>
            <span className={styles.moodBarLabel}>{moodEmoji(mood)} {mood}</span>
            <div className={styles.moodBarTrack}>
              <div
                className={styles.moodBarFill}
                style={{ width: `${pct}%`, background: MOOD_COLOR[mood] }}
              />
            </div>
            <span className={styles.moodBarCount}>{count}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Journal() {
  const navigate = useNavigate();

  const [user,         setUser]         = useState(null);
  const [entries,      setEntries]      = useState([]);
  const [title,        setTitle]        = useState("");
  const [content,      setContent]      = useState("");
  const [selectedMood, setSelectedMood] = useState("neutral");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const sidebarRef  = useRef(null);
  const hamburgerRef = useRef(null);
  const dropdownRef  = useRef(null);
  const notifTimer   = useRef(null);

  // ── Auth ──
  useEffect(() => {
    const token       = localStorage.getItem("token");
    const sessionUser = localStorage.getItem("user");
    if (!token || !sessionUser) { navigate("/login"); return; }
    setUser(JSON.parse(sessionUser));
  }, [navigate]);

  // ── Load entries ──
  useEffect(() => { if (user) loadEntries(); }, [user]); // eslint-disable-line

  // ── Outside-click: sidebar + dropdown ──
  useEffect(() => {
    function handler(e) {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setSidebarOpen(false);
      }
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [sidebarOpen, dropdownOpen]);

  // ── API ──
  async function loadEntries() {
    const res  = await fetch(`${API}/api/journal/${user._id || user.id}`);
    const data = await res.json();
    setEntries(data.journals || []);
  }

  async function saveEntry() {
    if (!content.trim()) { showNotif("Please write something first!", "error"); return; }
    const res = await fetch(`${API}/api/journal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId:   user._id || user.id,
        username: user.username || user.name,
        title:    title || "Untitled Entry",
        content,
        mood:     selectedMood,
      }),
    });
    if (res.ok) {
      setTitle(""); setContent(""); setSelectedMood("neutral");
      showNotif("Entry saved! 📝", "success");
      loadEntries();
    } else {
      const data = await res.json();
      showNotif(data.error || "Something went wrong!", "error");
    }
  }

  async function deleteEntry(id) {
    if (!window.confirm("Delete this entry?")) return;
    const res = await fetch(`${API}/api/journal/${id}`, { method: "DELETE" });
    if (res.ok) { showNotif("Entry deleted.", "success"); loadEntries(); }
  }

  // ── Notification ──
  function showNotif(msg, type = "success") {
    clearTimeout(notifTimer.current);
    setNotification({ msg, type });
    notifTimer.current = setTimeout(() => setNotification(null), 3000);
  }

  function logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  // ── Stats ──
  const oneWeekAgo  = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weekCount   = entries.filter((e) => new Date(e.createdAt) > oneWeekAgo).length;

  if (!user) return null;

  return (
    <div className={styles.page}>

      {/* ── HEADER ── */}
      <header className={styles.header}>
        <button
          ref={hamburgerRef}
          className={styles.hamburger}
          onClick={(e) => { e.stopPropagation(); setSidebarOpen((o) => !o); }}
        >
          <i className="fas fa-bars" />
        </button>

        <Link to="/dashboard" className={styles.logo}>Dosti<span>शिप</span></Link>

        <div className={styles.headerIcons}>
          <div
            ref={dropdownRef}
            className={`${styles.profileDropdown} ${dropdownOpen ? styles.dropdownActive : ""}`}
            onClick={(e) => { e.stopPropagation(); setDropdownOpen((o) => !o); }}
          >
            <button className={styles.profileBtn}>
              <Avatar name={user.name} pic={user.profilePic} size="header" />
              <i className="fas fa-chevron-down" style={{ fontSize: 11, color: "var(--text-light)" }} />
            </button>
            <div className={styles.dropdownMenu}>
              <Link to="/profile"><i className="fas fa-user" /> My Profile</Link>
      
              <Link to="/" onClick={logout}><i className="fas fa-sign-out-alt" /> Logout</Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── LAYOUT ── */}
      <div className={styles.mainContent}>

        {/* ── SIDEBAR ── */}
        <aside
          ref={sidebarRef}
          className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarActive : ""}`}
        >
          <div className={styles.sidebarUser}>
            <Avatar name={user.name} pic={user.profilePic} size="sidebar" />
            <div className={styles.sidebarUserInfo}>
              <div className={styles.sidebarUserName}>{user.name || "—"}</div>
              <div className={styles.sidebarUserEmail}>{user.email || "—"}</div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <p className={styles.sidebarTitle}>Menu</p>
            <ul className={styles.sidebarMenu}>
              <li><Link to="/dashboard"><i className="fas fa-home" /> Home</Link></li>
              <li><Link to="/notifications"><i className="fas fa-bell" /> Notifications</Link></li>
              <li><Link to="/map"><i className="fa-solid fa-map-location-dot" /> Friends Map</Link></li>
              <li><Link to="/inbox"><i className="fas fa-envelope" /> Inbox</Link></li>
              <li><Link to="/journal" className={styles.activeLink}><i className="fas fa-book-open" /> Journal</Link></li>
              <li><Link to="/hangout"><i className="fas fa-users" /> Hangout Rooms</Link></li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <p className={styles.sidebarTitle}>Account</p>
            <ul className={styles.sidebarMenu}>
              <li><Link to="/profile"><i className="fas fa-user-circle" /> Profile</Link></li>
             
              <li><Link to="/" onClick={logout}><i className="fas fa-sign-out-alt" /> Logout</Link></li>
            </ul>
          </div>
        </aside>

        {/* ── CONTENT ── */}
        <main className={styles.contentArea}>

          {/* HERO */}
          <div className={styles.journalHero}>
            <div>
              <h1>My Social Growth Journal 📖</h1>
              <p>A private space to reflect on your social journey. Only you can see your entries.</p>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statBox}>
                <span className={styles.statNum}>{entries.length}</span>
                <span className={styles.statLabel}>Entries</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNum}>{weekCount}</span>
                <span className={styles.statLabel}>This Week</span>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className={styles.journalGrid}>

            {/* LEFT — write + entries */}
            <div>
              {/* WRITE CARD */}
              <div className={styles.writeCard}>
                <h3><i className="fas fa-feather-alt" /> Write a New Entry</h3>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Date</label>
                    <input
                      type="text"
                      value={todayString()}
                      readOnly
                      style={{ background: "#f8f9fa", color: "var(--text-light)" }}
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginBottom: 14 }}>
                  <label>How are you feeling?</label>
                  <div className={styles.moodSelector}>
                    {MOODS.map((m) => (
                      <button
                        key={m}
                        className={`${styles.moodOption} ${selectedMood === m ? styles.moodSelected : ""}`}
                        data-mood={m}
                        onClick={() => setSelectedMood(m)}
                      >
                        {moodEmoji(m)} {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Your Thoughts</label>
                  <textarea
                    placeholder="Write freely... this is your safe space. No one else can see this."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <button className={styles.submitBtn} onClick={saveEntry}>
                  <i className="fas fa-save" /> Save Entry
                </button>
              </div>

              {/* PAST ENTRIES */}
              <div className={styles.entriesSection}>
                <h3><i className="fas fa-book-open" /> My Past Entries</h3>
                {entries.length === 0 ? (
                  <div className={styles.emptyEntries}>
                    <i className="fas fa-feather-alt" />
                    <p>No entries yet. Write your first one! 📖</p>
                  </div>
                ) : (
                  entries.map((e) => (
                    <div
                      key={e._id || e.id}
                      className={`${styles.entryCard} ${styles["mood_" + e.mood]}`}
                    >
                      <div className={styles.entryHeader}>
                        <div className={styles.entryTitle}>{e.title || "Untitled Entry"}</div>
                        <span className={`${styles.entryMood} ${styles["moodBadge_" + e.mood]}`}>
                          {moodEmoji(e.mood)} {e.mood}
                        </span>
                      </div>
                      <p className={styles.entryPreview}>{e.content}</p>
                      <div className={styles.entryFooter}>
                        <span className={styles.entryTime}>
                          <i className="fas fa-clock" /> {formatTime(e.createdAt)}
                        </span>
                        <button className={styles.deleteBtn} onClick={() => deleteEntry(e._id || e.id)}>
                          <i className="fas fa-trash" /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* RIGHT — mood chart + prompts + privacy */}
            <div>
              <div className={styles.sidebarCard}>
                <h4><i className="fas fa-chart-bar" /> Mood Tracker</h4>
                <MoodChart entries={entries} />
              </div>

              <div className={styles.sidebarCard}>
                <h4><i className="fas fa-lightbulb" /> Journal Prompts</h4>
                {JOURNAL_PROMPTS.map((p, i) => (
                  <div key={i} className={styles.tipItem}>
                    <span className={styles.tipIcon}>{p.icon}</span>
                    {p.text}
                  </div>
                ))}
              </div>

              <div className={`${styles.sidebarCard} ${styles.privacyCard}`}>
                <h4><i className="fas fa-lock" /> Your Privacy</h4>
                <p className={styles.privacyText}>
                  Your journal entries are completely private. Stored with only your user ID — no names attached
                  publicly. This is your anonymous safe space. 💙
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ── NOTIFICATION ── */}
      {notification && (
        <div className={`${styles.notificationPopup} ${styles[notification.type]}`}>
          {notification.msg}
        </div>
      )}

    </div>
  );
}