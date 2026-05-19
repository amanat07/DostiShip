import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Hangout.css";

function Avatar({ name, pic, size = 36, fontSize = 14 }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="h-avatar" style={{ width: size, height: size, fontSize }}>
      {pic ? (
        <img src={pic} alt={name}
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
      ) : null}
      <span style={{ display: pic ? "none" : "flex" }}>{initial}</span>
    </div>
  );
}

const DEFAULT_ROOMS = [
  { name: "Study Buddy",  description: "Join fellow learners for focused study sessions.", zoomLink: "https://zoom.us/j/1234567890", avatar: "/static/study-notebooks.jpg" },
  { name: "Music Charms", description: "Share and enjoy music with friends.",               zoomLink: "https://zoom.us/j/0987654321", avatar: "/static/music.jpg" },
  { name: "Book Worms",   description: "Discuss your favorite books and authors.",          zoomLink: "https://zoom.us/j/5678901234", avatar: "/static/books.jpeg" },
  { name: "Game Night",   description: "Hang out for fun virtual games.",                   zoomLink: "https://zoom.us/j/4321098765", avatar: "/static/games.jpg" },
];

function Hangout() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(DEFAULT_ROOMS);
  const [roomName, setRoomName] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState({ msg: "", type: "" });

  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; }
    catch { return {}; }
  })();

  // ── AUTH ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // ── OUTSIDE CLICK ──
  useEffect(() => {
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setSidebarOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification({ msg: "", type: "" }), 3000);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!zoomLink.startsWith("https://zoom.us/")) {
      showNotification("Please provide a valid Zoom link.", "error");
      return;
    }
    setRooms([...rooms, {
      name: roomName,
      description: `Join the ${roomName} hangout!`,
      zoomLink,
      avatar: "",
    }]);
    setRoomName("");
    setZoomLink("");
    showNotification("Room created successfully!", "success");
  };

  return (
    <>
      {/* NOTIFICATION */}
      {notification.msg && (
        <div className={`h-notification ${notification.type}`}>
          {notification.msg}
        </div>
      )}

      {/* HEADER */}
      <header className="h-header">
        <button className="h-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="fa-solid fa-bars" />
        </button>

        <Link to="/dashboard" className="h-logo">Dosti<span>शिप</span></Link>

        <div className="h-search">
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Search people, posts..." />
        </div>

        <div className="h-header-icons">
          <div className="h-profile-dropdown" ref={dropdownRef}>
            <button className="h-profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Avatar name={user.name} pic={user.profilePic} size={36} fontSize={14} />
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, color: "#777" }} />
            </button>
            {dropdownOpen && (
              <div className="h-dropdown-menu">
                <Link to="/profile"><i className="fa-solid fa-user" /> My Profile</Link>

                <a href="/login" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket" /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="h-main-content">
        {/* SIDEBAR */}
        <aside ref={sidebarRef} className={`h-sidebar ${sidebarOpen ? "active" : ""}`}>
          <div className="h-sidebar-user">
            <Avatar name={user.name} pic={user.profilePic} size={42} fontSize={16} />
            <div className="h-sidebar-user-info">
              <div className="h-sidebar-user-name">{user.name || "User"}</div>
              <div className="h-sidebar-user-email">{user.email || "—"}</div>
            </div>
          </div>

          <div className="h-sidebar-section">
            <p className="h-sidebar-title">Menu</p>
            <ul className="h-sidebar-menu">
              <li><Link to="/dashboard"><i className="fa-solid fa-house" /> Home</Link></li>
              <li><Link to="/notifications"><i className="fa-solid fa-bell" /> Notifications</Link></li>
              <li><Link to="/map"><i className="fa-solid fa-map-location-dot" /> Friends Map</Link></li>
              <li><Link to="/inbox"><i className="fa-solid fa-envelope" /> Inbox</Link></li>
              <li><Link to="/journal"><i className="fa-solid fa-book-open" /> Journal</Link></li>
              <li><Link to="/hangout" className="active"><i className="fa-solid fa-users" /> Hangout Rooms</Link></li>
            </ul>
          </div>

          <div className="h-sidebar-section">
            <p className="h-sidebar-title">Account</p>
            <ul className="h-sidebar-menu">
              <li><Link to="/profile"><i className="fa-solid fa-user-circle" /> Profile</Link></li>
              <li><a href="/login" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" /> Logout</a></li>
            </ul>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="h-content-area">
          <div className="h-content-header">
            <h2>Virtual Hangout Rooms</h2>
            <p>Connect with friends in virtual spaces</p>
          </div>

          {/* CREATE ROOM */}
          <div className="h-create-room">
            <h3>Create a New Hangout Room</h3>
            <form onSubmit={handleCreateRoom}>
              <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="Zoom Link"
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
                required
              />
              <button type="submit">
                <i className="fa-solid fa-plus" /> Create Room
              </button>
            </form>
          </div>

          {/* ROOMS GRID */}
          <div className="h-rooms-grid">
            {rooms.map((room, index) => (
              <div key={index} className="h-room-card">
                <div className="h-room-header">
                  {room.avatar && (
                    <img
                      src={room.avatar}
                      alt={room.name}
                      className="h-room-avatar"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  )}
                  <span className="h-room-title">{room.name}</span>
                </div>
                <div className="h-room-description">{room.description}</div>
                <div className="h-room-actions">
                  <button
                    className="h-join-btn"
                    onClick={() => window.open(room.zoomLink, "_blank")}
                  >
                    <i className="fa-solid fa-video" /> Join Room
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="h-footer">
            <div className="h-footer-item">
              <p>Email</p>
              <p>atharavtarika@dostiship.com</p>
            </div>
            <div className="h-footer-item">
              <p>Call</p>
              <p>+91 9466903617</p>
            </div>
            <div className="h-footer-item">
              <p>Follow Us</p>
              <div className="h-social-icons">
                <a href="#"><i className="fab fa-facebook-f" /></a>
                <a href="#"><i className="fab fa-twitter" /></a>
                <a href="#"><i className="fab fa-instagram" /></a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Hangout;