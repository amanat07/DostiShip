import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Notification.module.css";

const INITIAL_ITEMS = [
  {
    id: 1, type: "follow",
    user: "Priya Sharma", text: "sent you a follow request",
    time: "10 minutes ago", date: "2025-04-29T10:00:00",
    unread: true, hasActions: true, status: null,
  },
  {
    id: 2, type: "follow",
    user: "Amit Singh", text: "sent you a follow request",
    time: "5 hours ago", date: "2025-04-29T05:00:00",
    unread: true, hasActions: true, status: null,
  },
  {
    id: 3, type: "follow",
    user: "Sanya Malhotra", text: "sent you a follow request",
    time: "2 days ago", date: "2025-04-27T10:00:00",
    unread: false, hasActions: true, status: null,
  },
  {
    id: 4, type: "mentions",
    user: "Rahul Patel",
    text: 'mentioned you in a post: "Check out this amazing place!"',
    time: "1 hour ago", date: "2025-04-29T09:00:00",
    unread: true, hasActions: false, status: null,
  },
  {
    id: 5, type: "mentions",
    user: "Vikram Joshi", text: 'commented on your photo: "Great picture!"',
    time: "Yesterday", date: "2025-04-28T10:00:00",
    unread: false, hasActions: false, status: null,
  },
  {
    id: 6, type: "groups",
    user: "Travel Enthusiasts", text: "invited you to join their group",
    time: "3 hours ago", date: "2025-04-29T07:00:00",
    unread: false, hasActions: true, status: null,
    isGroup: true,
  },
  {
    id: 7, type: "others",
    user: "Neha Gupta", text: "liked your post",
    time: "Yesterday", date: "2025-04-28T10:00:00",
    unread: false, hasActions: false, status: null,
  },
  {
    id: 8, type: "others",
    user: "Music Festival", text: "starts tomorrow. Don't forget!",
    time: "3 days ago", date: "2025-04-26T10:00:00",
    unread: false, hasActions: false, status: null,
    isEvent: true,
  },
];

// Icon + colour per type — matches HTML
function NotifIcon({ item }) {
  if (item.type === "follow") {
    return (
      <div className={`${styles.notifIcon} ${styles.iconFollow}`}>
        <i className="fa-solid fa-user-plus" />
      </div>
    );
  }
  if (item.type === "mentions" && item.user === "Vikram Joshi") {
    return (
      <div className={`${styles.notifIcon} ${styles.iconComment}`}>
        <i className="fa-solid fa-comment" />
      </div>
    );
  }
  if (item.type === "mentions") {
    return (
      <div className={`${styles.notifIcon} ${styles.iconMention}`}>
        <i className="fa-solid fa-at" />
      </div>
    );
  }
  if (item.type === "groups") {
    return (
      <div className={`${styles.notifIcon} ${styles.iconGroup}`}>
        <i className="fa-solid fa-users" />
      </div>
    );
  }
  if (item.isEvent) {
    return (
      <div className={`${styles.notifIcon} ${styles.iconEvent}`}>
        <i className="fa-solid fa-calendar-alt" />
      </div>
    );
  }
  return (
    <div className={`${styles.notifIcon} ${styles.iconLike}`}>
      <i className="fa-solid fa-heart" />
    </div>
  );
}

// Section headers in correct order
const SECTIONS = [
  { key: "follow",   label: "Follow Requests" },
  { key: "mentions", label: "Mentions" },
  { key: "groups",   label: "Groups" },
  { key: "others",   label: "Others" },
];

export default function Notifications() {
  const sidebarRef       = useRef(null);
  const profileRef       = useRef(null);

  const [user,           setUser]           = useState(null);
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);
  const [tab,            setTab]            = useState("all");
  const [filter,         setFilter]         = useState("all");
  const [popup,          setPopup]          = useState(null);
  const [items,          setItems]          = useState(INITIAL_ITEMS);

  // Confirmation modal state
  const [modal,          setModal]          = useState(false);
  const [pendingDecline, setPendingDecline] = useState(null);

  // ── AUTH + FETCH USER ──
 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "http://localhost:3000/login";
    return;
  }

  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);

  // ── CLICK OUTSIDE ──
  useEffect(() => {
    function handler(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
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

  // ── KEYBOARD ESC ──
  useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") {
        setModal(false);
        setSidebarOpen(false);
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ── HELPERS ──
  const logout = useCallback((e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000/login";
  }, []);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

  function showPopup(msg, type = "success") {
    setPopup({ msg, type });
    setTimeout(() => setPopup(null), 3000);
  }

  // ── AVATAR ──
  function Avatar({ cls, name, pic, size }) {
    const initial = getInitial(name);
    return (
      <div className={cls} style={size ? { width: size, height: size } : {}}>
        {pic
          ? <img src={pic} alt={name}
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.textContent = initial; }}
            />
          : initial
        }
      </div>
    );
  }

  // ── FILTER ──
  function applyFilters(list) {
    const now = new Date();
    return list.filter((item) => {
      const tabMatch  = tab === "all" || item.type === tab;
      const itemDate  = new Date(item.date);
      let   timeMatch = true;
      if (filter === "today") {
        timeMatch = itemDate.toDateString() === now.toDateString();
      } else if (filter === "week") {
        timeMatch = (now - itemDate) / (1000 * 60 * 60 * 24) <= 7;
      }
      return tabMatch && timeMatch;
    });
  }

  const filtered = applyFilters(items);

  // ── ACTIONS ──
  const markRead = (id) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, unread: false } : i));
    showPopup("Marked as read");
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })));
    showPopup("All notifications marked as read ✅");
  };

  const accept = (id) => {
    setItems((prev) =>
      prev.map((i) => i.id === id ? { ...i, hasActions: false, status: "accepted" } : i)
    );
    showPopup("Request accepted!");
  };

  const openDeclineModal = (id) => {
    setPendingDecline(id);
    setModal(true);
  };

  const confirmDecline = () => {
    if (pendingDecline !== null) {
      setItems((prev) =>
        prev.map((i) => i.id === pendingDecline ? { ...i, hasActions: false, status: "declined" } : i)
      );
      showPopup("Request declined");
    }
    setModal(false);
    setPendingDecline(null);
  };

  const cancelDecline = () => {
    setModal(false);
    setPendingDecline(null);
  };

  // unread count for follow tab badge
  const unreadFollowCount = items.filter((i) => i.type === "follow" && i.unread).length;

  // Build section-grouped list for "all" tab
  function renderList() {
    if (filtered.length === 0) {
      return (
        <div className={styles.emptyState}>
          <i className="fa-regular fa-bell-slash" />
          <h3>No Notifications</h3>
          <p>Check back later or explore <a href="./page.html">Dostiशिप</a> to connect!</p>
        </div>
      );
    }

    if (tab !== "all") {
      return filtered.map((n) => <NotifItem key={n.id} n={n} />);
    }

    // For "all" tab, render section headers
    return SECTIONS.map(({ key, label }) => {
      const group = filtered.filter((i) => i.type === key);
      if (group.length === 0) return null;
      return (
        <div key={key}>
          <div className={styles.sectionLabel}>{label}</div>
          {group.map((n) => <NotifItem key={n.id} n={n} />)}
        </div>
      );
    });
  }

  function NotifItem({ n }) {
    const avatarSrc =
      n.isGroup ? "./static/travel.jpeg"
      : n.isEvent ? "./static/music.avif"
      : "./static/profileimg.jpg";

    return (
      <div className={`${styles.notifItem} ${n.unread ? styles.unread : ""}`}>
        <NotifIcon item={n} />

        <img
          src={avatarSrc}
          alt={n.user}
          className={styles.notifAvatar}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />

        <div className={styles.notifContent}>
          <div>
            <span className={styles.notifUser}>{n.user} </span>
            <span className={styles.notifText}>
              {n.status === "accepted"
                ? <span className={styles.acceptedText}>✅ Accepted</span>
                : n.status === "declined"
                ? <span className={styles.declinedText}>Declined</span>
                : n.text
              }
            </span>
          </div>
          <div className={styles.notifTime}>{n.time}</div>

          {n.hasActions && !n.status && (
            <div className={styles.notifActions}>
              <button className={`${styles.actionBtn} ${styles.acceptBtn}`} onClick={() => accept(n.id)}>
                {n.isGroup ? "Join" : "Accept"}
              </button>
              <button className={`${styles.actionBtn} ${styles.declineBtn}`} onClick={() => openDeclineModal(n.id)}>
                {n.isGroup ? "Ignore" : "Decline"}
              </button>
            </div>
          )}
        </div>

        {n.unread && (
          <button className={styles.markRead} onClick={() => markRead(n.id)}>
            Mark as read
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <div className={styles.pageWrapper}>

        {/* ── HEADER ── */}
        <header className={styles.header}>
          <button
            className={styles.hamburger}
            onClick={(e) => { e.stopPropagation(); setSidebarOpen((o) => !o); }}
          >
            <i className="fa-solid fa-bars" />
          </button>

          <a href="./page.html" className={styles.logo}>
            Dosti<span>शिप</span>
          </a>

          <div className={styles.headerSearch}>
            <i className="fa-solid fa-magnifying-glass" />
            <input type="text" placeholder="Search people, posts…" />
          </div>

          <div className={styles.headerIcons}>
            <div className={styles.profileDropdown} ref={profileRef}>
              <button
                className={styles.profileBtn}
                onClick={(e) => { e.stopPropagation(); setProfileOpen((o) => !o); }}
              >
                <Avatar
                  cls={styles.profileAvatar}
                  name={user?.name}
                  pic={user?.profilePic}
                />
                <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, color: "#777" }} />
              </button>

              {profileOpen && (
                <div className={styles.dropdownMenu}>
                  <a href="./profilepage"><i className="fa-solid fa-user" /> My Profile</a>
                  <a href="/discover-interests"><i className="fa-solid fa-heart" /> My Interests</a>
                  <a href="/home" onClick={logout}><i className="fa-solid fa-right-from-bracket" /> Logout</a>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className={styles.mainContent}>

          {/* ── SIDEBAR ── */}
          <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarActive : ""}`} ref={sidebarRef}>
            <div className={styles.sidebarUser}>
              <Avatar cls={styles.sidebarAvatar} name={user?.name} pic={user?.profilePic} />
              <div className={styles.sidebarUserInfo}>
                <div className={styles.sidebarUserName}>{user?.name || "Loading…"}</div>
                <div className={styles.sidebarUserEmail}>{user?.email || "—"}</div>
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <p className={styles.sidebarTitle}>Menu</p>
              <ul className={styles.sidebarMenu}>
                <li><Link to="/dashboard" className={styles.active}><i className="fa-solid fa-house" /> Home</Link></li>
              <li><Link to="/notifications"><i className="fa-solid fa-bell" /> Notifications</Link></li>
              <li><Link to="/map"><i className="fa-solid fa-map-location-dot" /> Friends Map</Link></li>
              <li><Link to="/inbox"><i className="fa-solid fa-envelope" /> Inbox</Link></li>
              <li><Link to="/journal"><i className="fa-solid fa-book-open" /> Journal</Link></li>
              <li><Link to="/hangout"><i className="fa-solid fa-users" /> Hangout Rooms</Link></li>
              </ul>
            </div>

            <div className={styles.sidebarSection}>
              <p className={styles.sidebarTitle}>Account</p>
              <ul className={styles.sidebarMenu}>
                <li><a href="./profile.html"><i className="fa-solid fa-user-circle" /> Profile</a></li>
                
                <li><a href="./main.html" onClick={logout}><i className="fa-solid fa-right-from-bracket" /> Logout</a></li>
              </ul>
            </div>
          </aside>

          {/* ── CONTENT ── */}
          <main className={styles.contentArea}>

            <div className={styles.contentHeader}>
              <h2 className={styles.contentTitle}>Notifications</h2>
              <div className={styles.notifActions}>
                <select
                  className={styles.notifBtn}
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                </select>
                <button className={styles.notifBtn} onClick={markAllRead}>
                  Mark all as read
                </button>
                <button className={styles.notifBtn} onClick={() => window.history.back()}>
                  <i className="fa-solid fa-arrow-left" /> Back
                </button>
              </div>
            </div>

            <div className={styles.notificationsContainer}>
              <div className={styles.notificationsHeader}>
                <h3 className={styles.notificationsTitle}>Recent Activity</h3>
              </div>

              {/* TABS */}
              <div className={styles.notificationsTabs}>
                {[
                  { key: "all",      label: "All" },
                  { key: "follow",   label: "Follow Requests", badge: unreadFollowCount },
                  { key: "mentions", label: "Mentions" },
                  { key: "groups",   label: "Groups" },
                ].map(({ key, label, badge }) => (
                  <button
                    key={key}
                    className={`${styles.tabBtn} ${tab === key ? styles.tabActive : ""}`}
                    onClick={() => setTab(key)}
                  >
                    {label}
                    {badge > 0 && <span className={styles.badge}>{badge}</span>}
                  </button>
                ))}
              </div>

              <div className={styles.notificationsList}>
                {renderList()}
              </div>

              <button
                className={styles.loadMore}
                onClick={() => {
                  setTimeout(() => showPopup("No more notifications", "error"), 1000);
                }}
              >
                Load More
              </button>
            </div>

          </main>
        </div>
      </div>

      {/* ── CONFIRMATION MODAL ── */}
      {modal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Action</h3>
            <p>Are you sure you want to decline this request?</p>
            <div className={styles.modalActions}>
              <button className={`${styles.actionBtn} ${styles.acceptBtn}`} onClick={confirmDecline}>
                Yes, Decline
              </button>
              <button className={`${styles.actionBtn} ${styles.declineBtn}`} onClick={cancelDecline}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── POPUP ── */}
      {popup && (
        <div className={`${styles.notifPopup} ${popup.type === "error" ? styles.popupError : styles.popupSuccess}`}>
          {popup.msg}
        </div>
      )}
    </>
  );
}