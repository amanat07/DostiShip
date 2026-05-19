import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";

const API = "http://localhost:5000";

// ─────────────────────────────────────────────
// Avatar component
// ─────────────────────────────────────────────
function Avatar({ name, pic, size = 40, fontSize = 15 }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      className={styles.avatar}
      style={{ width: size, height: size, fontSize }}
    >
      {pic && !imgFailed ? (
        <img
          src={pic}
          alt={name}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span>{initial}</span>
      )}
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

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [user, setUser]                   = useState(null);
  const [posts, setPosts]                 = useState([]);
  const [caption, setCaption]             = useState("");
  const [image, setImage]                 = useState(null);
  const [preview, setPreview]             = useState(null);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [notification, setNotification]   = useState({ msg: "", type: "" });
  const [activeComments, setActiveComments] = useState({});
  const [commentInputs, setCommentInputs]   = useState({});

  // ── SEARCH STATE ──
  const [headerQuery, setHeaderQuery]     = useState("");   // top search bar
  const [sidebarQuery, setSidebarQuery]   = useState("");   // right-column search
  const [allUsers, setAllUsers]           = useState([]);   // all registered users
  const [headerResults, setHeaderResults] = useState(null); // null = not searching
  const [sendingTo, setSendingTo]         = useState({});   // track "Add Friend" per user

  const sidebarRef  = useRef(null);
  const dropdownRef = useRef(null);

  const showNotification = useCallback((msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification({ msg: "", type: "" }), 3000);
  }, []);

  // ── AUTH ──
  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (!tok) { navigate("/login"); return; }
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [navigate]);

  // ── LOAD POSTS ──
  const loadPosts = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/posts`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      showNotification("Failed to load posts", "error");
    }
  }, [showNotification]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  // ── LOAD ALL USERS (for search + suggestions) ──
  const loadUsers = useCallback(async () => {
    try {
      const res  = await fetch(`${API}/api/friends/suggestions`, {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setAllUsers(Array.isArray(data) ? data : []);
    } catch {
      // silently ignore — suggestions not critical
    }
  }, [token]);

  useEffect(() => { if (token) loadUsers(); }, [loadUsers, token]);

  // ── CLOSE SIDEBAR / DROPDOWN ON OUTSIDE CLICK ──
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

  // ── REAL-TIME HEADER SEARCH ──
  // Searches both posts (by caption/username) and users (by username/name)
  useEffect(() => {
    const q = headerQuery.trim().toLowerCase();
    if (!q) { setHeaderResults(null); return; }

    const matchedPosts = posts.filter((p) => {
      const name = (
        p.user?.name ||
        p.user?.username ||
        p.user?.email?.split("@")[0] ||
        ""
      ).toLowerCase();
      const cap = (p.caption || "").toLowerCase();
      return cap.includes(q) || name.includes(q);
    });

    const matchedUsers = allUsers.filter((u) => {
      const uname = (u.username || "").toLowerCase();
      const uname2 = (u.name || "").toLowerCase();
      return uname.includes(q) || uname2.includes(q);
    });

    setHeaderResults({ posts: matchedPosts, users: matchedUsers });
  }, [headerQuery, posts, allUsers]);

  // ── REAL-TIME SIDEBAR PEOPLE SEARCH ──
  const filteredSidebarUsers = sidebarQuery.trim()
    ? allUsers.filter((u) => {
        const q = sidebarQuery.trim().toLowerCase();
        return (
          (u.username || "").toLowerCase().includes(q) ||
          (u.name || "").toLowerCase().includes(q)
        );
      })
    : allUsers;

  // ── SEND FRIEND REQUEST ──
  const sendRequest = async (id) => {
    setSendingTo((prev) => ({ ...prev, [id]: true }));
    try {
      await fetch(`${API}/api/friends/send/${id}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
      showNotification("Friend request sent!");
      setAllUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      showNotification("Could not send request", "error");
    } finally {
      setSendingTo((prev) => ({ ...prev, [id]: false }));
    }
  };

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
      const res = await fetch(`${API}/api/posts`, {
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
      const res  = await fetch(`${API}/api/posts/${id}/like`, {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === id
              ? {
                  ...p,
                  likes: data.liked
                    ? [...p.likes, user._id]
                    : p.likes.filter((l) => l !== user._id),
                }
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
      const res = await fetch(`${API}/api/posts/${id}/comment`, {
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

  // ── DELETE COMMENT ──
  const deleteComment = async (postId, commentId) => {
    try {
      await fetch(`${API}/api/posts/comment/${postId}/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      loadPosts();
    } catch (err) {
      console.error(err);
    }
  };

  // ── DELETE POST ──
  const deletePost = async (id) => {
    try {
      await fetch(`${API}/api/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // ── DISPLAY POSTS: either search results or full feed ──
  const displayedPosts = headerResults ? headerResults.posts : posts;

  const getPostUsername = (post) =>
  post.user?.name ||
  post.user?.username ||
  post.user?.email?.split("@")[0] ||
  "User";

  if (!user) return <div className={styles.loading}>Loading...</div>;

  return (
    <div>
      {/* FONT AWESOME */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      {/* NOTIFICATION POPUP */}
      {notification.msg && (
        <div className={`${styles.notificationPopup} ${styles[notification.type]}`}>
          {notification.msg}
        </div>
      )}

      {/* ── HEADER ── */}
      <header className={styles.header}>
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="fa-solid fa-bars" />
        </button>

        <Link to="/dashboard" className={styles.logo}>
          Dosti<span>शिप</span>
        </Link>

        {/* HEADER SEARCH — real-time */}
        <div className={styles.headerSearch} style={{ position: "relative" }}>
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Search people, posts..."
            value={headerQuery}
            onChange={(e) => setHeaderQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setHeaderQuery("")}
            autoComplete="off"
          />

          {/* SEARCH DROPDOWN */}
          {headerResults && (
            <div className={styles.searchDropdown}>
              {/* PEOPLE */}
              {headerResults.users.length > 0 && (
                <div className={styles.searchGroup}>
                  <div className={styles.searchGroupLabel}>People</div>
                  {headerResults.users.slice(0, 5).map((u) => (
                    <div key={u._id} className={styles.searchResultItem}>
                      <Avatar name={u.username || u.name} pic={u.profilePic} size={34} fontSize={13} />
                      <div className={styles.searchResultInfo}>
                        <div className={styles.searchResultName}>
                          {u.username || u.name}
                        </div>
                        {u.interests?.length > 0 && (
                          <div className={styles.searchResultSub}>
                            {u.interests.slice(0, 2).join(", ")}
                          </div>
                        )}
                      </div>
                      <button
                        className={styles.addFriendSmall}
                        onClick={() => sendRequest(u._id)}
                        disabled={sendingTo[u._id]}
                      >
                        {sendingTo[u._id] ? "..." : "Add"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* POSTS */}
              {headerResults.posts.length > 0 && (
                <div className={styles.searchGroup}>
                  <div className={styles.searchGroupLabel}>Posts</div>
                  {headerResults.posts.slice(0, 4).map((p) => (
                    <div key={p._id} className={styles.searchResultItem}>
                      <Avatar name={getPostUsername(p)} pic={p.user?.profilePic} size={34} fontSize={13} />
                      <div className={styles.searchResultInfo}>
                        <div className={styles.searchResultName}>
                          {getPostUsername(p)}
                        </div>
                        <div className={styles.searchResultSub}>
                          {(p.caption || "").slice(0, 60)}{p.caption?.length > 60 ? "…" : ""}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* EMPTY */}
              {headerResults.users.length === 0 && headerResults.posts.length === 0 && (
                <div className={styles.searchEmpty}>No results for "{headerQuery}"</div>
              )}

              <button
                className={styles.searchClear}
                onClick={() => setHeaderQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
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
                <Link to="/profile">
                  <i className="fa-solid fa-user" /> My Profile
                </Link>
                <a href="/" onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket" /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* ── LEFT SIDEBAR ── */}
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
              <li><Link to="/profile"><i className="fa-solid fa-user-circle" /> Profile</Link></li>
              <li><a href="/" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" /> Logout</a></li>
            </ul>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className={styles.contentArea}>
          {/* WELCOME BANNER */}
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

          {/* ── FEED ── */}
          <div className={styles.feedGrid}>
            <div className={styles.activityFeed}>
              <div className={styles.feedHeader}>
                <span className={styles.feedTitle}>
                  {headerResults
                    ? `Results for "${headerQuery}" (${displayedPosts.length})`
                    : "Recent Activity"}
                </span>
                {!headerResults && (
                  <div className={styles.feedTabs}>
                    <button className={`${styles.feedTab} ${styles.active}`}>All</button>
                    <button className={styles.feedTab}>Friends</button>
                    <button className={styles.feedTab}>Groups</button>
                  </div>
                )}
                {headerResults && (
                  <button
                    className={styles.feedTab}
                    onClick={() => setHeaderQuery("")}
                    style={{ color: "#4a3aff" }}
                  >
                    ✕ Clear
                  </button>
                )}
              </div>

              {displayedPosts.length === 0 ? (
                <p className={styles.emptyFeed}>
                  {headerResults ? "No posts match your search." : "No posts yet. Be the first to post!"}
                </p>
              ) : (
                displayedPosts.map((post) => {
                  const isLiked   = post.likes.includes(user._id || user.id);
                  const isOwner   = String(post.user?._id || post.user) === String(user._id || user.id);
                  const commentsOpen = activeComments[post._id];
                  const postName  = getPostUsername(post);

                  return (
                    <div key={post._id} className={styles.activityItem}>
                      <div className={styles.activityHeader}>
                        <Avatar
                          name={postName}
                          pic={post.user?.profilePic}
                          size={44}
                          fontSize={16}
                        />
                        <div style={{ flex: 1 }}>
                          <div className={styles.activityUser}>{postName}</div>
                          <div className={styles.activityTime}>
                            <i className="fa-solid fa-clock" /> {formatTime(post.createdAt)}
                          </div>
                        </div>
                        {isOwner && (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deletePost(post._id)}
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                        )}
                      </div>

                      {post.caption && (
                        <div className={styles.activityText}>{post.caption}</div>
                      )}

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

                          {post.comments.map((comment, i) => (
                            <div key={comment._id || i} className={styles.comment}>
                              <Avatar
                                name={comment.user?.name}
                                pic={comment.user?.profilePic}
                                size={30}
                                fontSize={11}
                              />
                              <div style={{ flex: 1 }}>
                                <div className={styles.commentUser}>
                                  {comment.user?.name || "User"}
                                </div>
                                <div className={styles.commentText}>{comment.text}</div>
                              </div>
                              {String(comment.user?._id || comment.user) ===
                                String(user._id || user.id) && (
                                <button
                                  className={styles.commentDeleteBtn}
                                  onClick={() => deleteComment(post._id, comment._id)}
                                >
                                  <i className="fa-solid fa-trash" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className={styles.connectionsSidebar}>
              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardTitle}>
                  People You May Know
                  <Link to="/notifications" style={{ fontSize: 12, color: "#4a3aff", textDecoration: "none" }}>
                    See All
                  </Link>
                </div>

                {/* REAL-TIME PEOPLE SEARCH */}
                <div className={styles.connSearch}>
                  <i className="fa-solid fa-magnifying-glass" />
                  <input
                    type="text"
                    placeholder="Search people..."
                    value={sidebarQuery}
                    onChange={(e) => setSidebarQuery(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* PEOPLE LIST */}
                <div className={styles.suggestionList}>
                  {filteredSidebarUsers.length === 0 ? (
                    <p className={styles.noResults}>
                      {sidebarQuery ? `No users matching "${sidebarQuery}"` : "No suggestions right now"}
                    </p>
                  ) : (
                    filteredSidebarUsers.slice(0, 6).map((u) => (
                      <div key={u._id} className={styles.suggestionItem}>
                        <Avatar
                          name={u.username || u.name}
                          pic={u.profilePic}
                          size={38}
                          fontSize={14}
                        />
                        <div className={styles.suggestionInfo}>
                          <div className={styles.suggestionName}>
                            {u.username || u.name}
                          </div>
                          {u.interests?.length > 0 && (
                            <div className={styles.suggestionSub}>
                              {u.interests.slice(0, 2).join(", ")}
                            </div>
                          )}
                        </div>
                        <button
                          className={styles.addFriendSmall}
                          onClick={() => sendRequest(u._id)}
                          disabled={sendingTo[u._id]}
                        >
                          {sendingTo[u._id] ? "…" : "+ Add"}
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <div className={styles.sidebarCardTitle}>Online Friends</div>
              </div>

              <div
                className={styles.sidebarCard}
                style={{ background: "linear-gradient(135deg, #f0eeff, #fff0f0)" }}
              >
                <div className={styles.sidebarCardTitle}>Quick Links</div>
                <ul className={styles.sidebarMenu}>
                  <li><Link to="/hangout"><i className="fa-solid fa-users" /> Hangout Rooms</Link></li>
                  <li><Link to="/journal"><i className="fa-solid fa-book-open" /> My Journal</Link></li>
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