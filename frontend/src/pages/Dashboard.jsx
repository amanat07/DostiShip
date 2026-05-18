import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";

function Avatar({ name, pic, size = 40, fontSize = 15 }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, fontSize }}
    >
      {pic ? (
        <img
          src={pic}
          alt={name}
          onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
      ) : null}
      <span style={{ display: pic ? "none" : "flex" }}>{initial}</span>
    </div>
  );
}

function formatTime(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState({ msg: "", type: "" });
  const [activeComments, setActiveComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const showNotification = useCallback((msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification({ msg: "", type: "" }), 3000);
  }, []);

  // ── AUTH ──
  useEffect(() => {
    if (!token) { navigate("/login"); return; }

    fetch("/api/auth/profile", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else { localStorage.removeItem("token"); navigate("/login"); }
      })
      .catch(() => navigate("/login"));
  }, [token, navigate]);

  // ── LOAD POSTS ──
  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      showNotification("Failed to load posts", "error");
    }
  }, [showNotification]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  // ── CLOSE SIDEBAR / DROPDOWN ON OUTSIDE CLICK ──
  useEffect(() => {
    function handleClick(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── CREATE POST ──
  const handlePost = async () => {
    if (!caption && !image) {
      showNotification("Write something or select an image", "error");
      return;
    }
    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      });
      if (res.ok) {
        setCaption(""); setImage(null); setPreview(null);
        showNotification("Post uploaded!", "success");
        loadPosts();
      } else {
        const d = await res.json();
        showNotification(d.error || "Upload failed", "error");
      }
    } catch {
      showNotification("Server error", "error");
    }
  };

  // ── LIKE ──
  const likePost = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}/like`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === id
              ? { ...p, likes: data.liked
                  ? [...p.likes, user._id]
                  : p.likes.filter((l) => l !== user._id) }
              : p
          )
        );
      }
    } catch {
      showNotification("Could not like post", "error");
    }
  };

  // ── COMMENT ──
  const addComment = async (id) => {
    const text = commentInputs[id]?.trim();
    if (!text) return;
    try {
      const res = await fetch(`/api/posts/${id}/comment`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        setCommentInputs((prev) => ({ ...prev, [id]: "" }));
        loadPosts();
      }
    } catch {
      showNotification("Could not add comment", "error");
    }
  };

  // ── DELETE ──
  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
        showNotification("Post deleted", "success");
      }
    } catch {
      showNotification("Could not delete post", "error");
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div>
      {/* NOTIFICATION */}
      {notification.msg && (
        <div className={`${styles.notificationPopup} ${styles[notification.type]}`}>
          {notification.msg}
        </div>
      )}

      {/* HEADER */}
      <header className={styles.header}>
        <button className={styles.hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="fa-solid fa-bars" />
        </button>

        <Link to="/page" className={styles.logo}>
          Dosti<span>शिप</span>
        </Link>

        <div className={styles.headerSearch}>
          <i className="fa-solid fa-magnifying-glass" />
          <input type="text" placeholder="Search people, posts..." />
        </div>

        <div className={styles.headerIcons}>
          <div className={styles.profileDropdown} ref={dropdownRef}>
            <button
              className={styles.profileBtn}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Avatar name={user.name} pic={user.profilePic} size={36} fontSize={14} />
              <i className="fa-solid fa-chevron-down" style={{ fontSize: 10, color: "#777" }} />
            </button>

            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link to="/profile"><i className="fa-solid fa-user" /> My Profile</Link>
                <Link to="/interest"><i className="fa-solid fa-heart" /> My Interests</Link>
                <a href="/login" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket" /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* SIDEBAR */}
        <aside
          ref={sidebarRef}
          className={`${styles.sidebar} ${sidebarOpen ? styles.active : ""}`}
        >
          <div className={styles.sidebarUser}>
            <Avatar name={user.name} pic={user.profilePic} size={42} fontSize={16} />
            <div className={styles.sidebarUserInfo}>
              <div className={styles.sidebarUserName}>{user.name || "User"}</div>
              <div className={styles.sidebarUserEmail}>{user.email || ""}</div>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <p className={styles.sidebarTitle}>Menu</p>
            <ul className={styles.sidebarMenu}>
              <li><Link to="/page" className={styles.active}><i className="fa-solid fa-house" /> Home</Link></li>
              <li><Link to="/notification"><i className="fa-solid fa-bell" /> Notifications</Link></li>
              <li><Link to="/map"><i className="fa-solid fa-map-location-dot" /> Friends Map</Link></li>
              <li><Link to="/inbox"><i className="fa-solid fa-envelope" /> Inbox</Link></li>
              <li><Link to="/journal"><i className="fa-solid fa-book-open" /> Journal</Link></li>
              <li><Link to="/hangout"><i className="fa-solid fa-users" /> Hangout Rooms</Link></li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <p className={styles.sidebarTitle}>Account</p>
            <ul className={styles.sidebarMenu}>
              <li><Link to="/profile"><i className="fa-solid fa-user-circle" /> Profile</Link></li>
              <li><Link to="/interest"><i className="fa-solid fa-heart" /> Interests</Link></li>
              <li><a href="/login" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" /> Logout</a></li>
            </ul>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.contentArea}>
          {/* WELCOME */}
          <div className={styles.welcomeBanner}>
            <div>
              <h2>Welcome back, {(user.name || "User").split(" ")[0]}! 👋</h2>
              <p>See what's new with your friends on Dostiशिप</p>
            </div>
          </div>

          {/* POST CREATION */}
          <div className={styles.postCreation}>
            <div className={styles.postCreationTop}>
              <Avatar name={user.name} pic={user.profilePic} size={40} fontSize={15} />
              <textarea
                className={styles.postInput}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your mind?"
                rows={1}
              />
            </div>

            {preview && (
              <img src={preview} className={styles.postImagePreview} alt="Preview" />
            )}

            <div className={styles.postActions}>
              <div className={styles.postOptions}>
                <label className={styles.postOption}>
                  <i className="fa-solid fa-image" /> Photo
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const f = e.target.files[0];
                      if (f) { setImage(f); setPreview(URL.createObjectURL(f)); }
                    }}
                  />
                </label>
                <button className={styles.postOption}>
                  <i className="fa-solid fa-map-marker-alt" /> Check-in
                </button>
              </div>
              <button className={styles.postBtn} onClick={handlePost}>
                <i className="fa-solid fa-paper-plane" /> Post
              </button>
            </div>
          </div>

          {/* FEED GRID */}
          <div className={styles.feedGrid}>
            <div className={styles.activityFeed}>
              <div className={styles.feedHeader}>
                <span className={styles.feedTitle}>Recent Activity</span>
                <div className={styles.feedTabs}>
                  <button className={`${styles.feedTab} ${styles.active}`}>All</button>
                  <button className={styles.feedTab}>Friends</button>
                  <button className={styles.feedTab}>Groups</button>
                </div>
              </div>

              {posts.length === 0 ? (
                <p className={styles.emptyFeed}>No posts yet. Be the first to post!</p>
              ) : (
                posts.map((post) => {
                  const isLiked = post.likes.includes(user._id);
                  const isOwner = post.user?._id === user._id;
                  const commentsOpen = activeComments[post._id];

                  return (
                    <div key={post._id} className={styles.activityItem}>
                      <div className={styles.activityHeader}>
                        <Avatar name={post.user?.name} pic={post.user?.profilePic} size={44} fontSize={16} />
                        <div style={{ flex: 1 }}>
                          <div className={styles.activityUser}>{post.user?.name || "User"}</div>
                          <div className={styles.activityTime}>
                            <i className="fa-solid fa-clock" /> {formatTime(post.createdAt)}
                          </div>
                        </div>
                        {isOwner && (
                          <button className={styles.deleteBtn} onClick={() => deletePost(post._id)}>
                            <i className="fa-solid fa-trash" />
                          </button>
                        )}
                      </div>

                      {post.caption && <div className={styles.activityText}>{post.caption}</div>}

                      {post.image && (
                        <div className={styles.activityMedia}>
                          <img src={post.image} className={styles.mediaImg} alt="" />
                        </div>
                      )}

                      <div className={styles.activityActions}>
                        <button
                          className={`${styles.actionBtn} ${styles.likeBtn} ${isLiked ? styles.liked : ""}`}
                          onClick={() => likePost(post._id)}
                        >
                          <i className="fa-solid fa-heart" />
                          <span>{post.likes.length}</span>
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={() =>
                            setActiveComments((prev) => ({
                              ...prev,
                              [post._id]: !prev[post._id],
                            }))
                          }
                        >
                          <i className="fa-solid fa-comment" /> {post.comments.length}
                        </button>
                      </div>

                      {commentsOpen && (
                        <div className={styles.commentSection}>
                          <div className={styles.commentInputWrap}>
                            <input
                              className={styles.commentInput}
                              placeholder="Write a comment..."
                              value={commentInputs[post._id] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [post._id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") addComment(post._id);
                              }}
                            />
                            <button
                              className={styles.postBtn}
                              style={{ padding: "7px 14px", fontSize: 12 }}
                              onClick={() => addComment(post._id)}
                            >
                              Post
                            </button>
                          </div>

                          {post.comments.map((c, i) => (
                            <div key={i} className={styles.comment}>
                              <Avatar name={c.user?.name} size={30} fontSize={11} />
                              <div>
                                <div className={styles.commentUser}>{c.user?.name || "User"}</div>
                                <div className={styles.commentText}>{c.text}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className={styles.connectionsSidebar}>
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardTitle}>
                  People You May Know <a href="#">See All</a>
                </div>
                <div className={styles.connSearch}>
                  <i className="fa-solid fa-magnifying-glass" />
                  <input type="text" placeholder="Search people..." />
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardTitle}>Online Friends</div>
              </div>

              <div className={styles.sidebarCard} style={{ background: "linear-gradient(135deg, #f0eeff, #fff0f0)" }}>
                <div className={styles.sidebarCardTitle}>Quick Links</div>
                <ul className={styles.sidebarMenu}>
                  <li><Link to="/hangout"><i className="fa-solid fa-users" /> Hangout Rooms</Link></li>
                  <li><Link to="/journal"><i className="fa-solid fa-book-open" /> My Journal</Link></li>
                  <li><Link to="/interest"><i className="fa-solid fa-heart" /> My Interests</Link></li>
                  <li><Link to="/map"><i className="fa-solid fa-map-location-dot" /> Friends Map</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}