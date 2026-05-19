import io from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Inbox.module.css";

// ─── Static Data (mirrors HTML exactly) ──────────────────────────────────────


const INITIAL_HISTORY = {};

const socket = io("http://localhost:5000");

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const ini = (name) => (name || "?").charAt(0).toUpperCase();

export function lastOf(history, id) {
  const ms = history[id];
  if (!ms?.length) return { prev: "Say hi! 👋", ts: "" };
  const m = ms[ms.length - 1];
  const prev =
    m.t === "text"   ? (m.d === "sent" ? "You: " : "") + m.txt
    : m.t === "voice"  ? "🎤 Voice message"
    : m.t === "photos" ? "📷 Shared photos"
    : m.txt || "";
  return { prev, ts: m.ts || "" };
}

export function randomBars() {
  return Array.from({ length: 22 }, () => Math.floor(Math.random() * 18) + 4);
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function Inbox() {
  const navigate = useNavigate();

  // auth
  const [me, setMe] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const raw   = localStorage.getItem("user");
    if (!token || !raw) { navigate("/login"); return; }
    setMe(JSON.parse(raw));
  }, [navigate]);
  useEffect(() => {

  if (me?._id || me?.id) {

    socket.emit(
      "add-user",
      me._id || me.id
    );

  }

}, [me]);

  // shared state
  const [contacts, setContacts] = useState([]);
  useEffect(() => {

  async function loadUsers() {

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/users"
      );

      const data = await res.json();

      const filtered = data
        .filter(
          (u) =>
            u._id !==
            (me?._id || me?.id)
        )
        .map((u, i) => ({
          id: u._id,
          name:
            u.name ||
            u.username,
          color: [
            "#4a3aff",
            "#e0405a",
            "#16a34a",
            "#d97706",
            "#7c3aed",
          ][i % 5],
          status: "online",
          seen: "Online now",
          unread: 0,
        }));

      setContacts(filtered);

      if (filtered.length > 0) {
        setActiveId(filtered[0].id);
      }

    } catch (err) {

      console.error(err);

    }
  }

  if (me) {
    loadUsers();
  }

}, [me]);
  const [history,   setHistory]   = useState(INITIAL_HISTORY);
  const [activeId, setActiveId] =
  useState("");
  const [filter,    setFilter]    = useState("all");
  const [query,     setQuery]     = useState("");
  const [toast,     setToast]     = useState({ msg: "", type: "", show: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toastTimer = useRef(null);


  function showToast(msg, type = "") {
    clearTimeout(toastTimer.current);
    setToast({ msg, type, show: true });
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  }
  useEffect(() => {

  socket.on(
    "msg-receive",
    (data) => {

      setHistory((prev) => ({
        ...prev,

        [data.from]: [
          ...(prev[data.from] || []),
          

          {
            t: "text",
            d: "recv",
            txt: data.message,
            ts: new Date().toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
          },
        ],
      }));

    }
  );

  return () => {
    socket.off("msg-receive");
  };

}, []);


useEffect(() => {

  async function loadMessages() {

    if (!activeId || !me)
      return;

    try {

      const res = await fetch(
        `http://localhost:5000/api/messages/${
          me._id || me.id
        }/${activeId}`
      );

      const data =
        await res.json();

      const formatted =
        data.map((m) => ({
          t: "text",

          d:
            String(m.from) ===
            String(me._id || me.id)
              ? "sent"
              : "recv",

          txt: m.message,

          ts:
            new Date(
              m.createdAt
            ).toLocaleTimeString(
              [],
              {
                hour:
                  "2-digit",

                minute:
                  "2-digit",
              }
            ),
        }));

      setHistory((prev) => ({
        ...prev,
        [activeId]:
          formatted,
      }));

    } catch (err) {

      console.error(err);

    }
  }

  loadMessages();

}, [activeId, me]);
  function openChat(id) {
    setActiveId(id);
    setContacts(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  }

  function sendMessage(text) {

  if (!text.trim() || !activeId)
    return;

  const ts =
    new Date().toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  const msg = {
    t: "text",
    d: "sent",
    txt: text.trim(),
    ts,
    r: false,
  };

  setHistory((prev) => ({
    ...prev,
    [activeId]: [
      ...(prev[activeId] || []),
      msg,
    ],
  }));
fetch(
  "http://localhost:5000/api/messages",
  {
    method: "POST",

    headers: {
      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      from:
        me._id || me.id,

      to: activeId,

      message:
        text.trim(),
    }),
  }
);
  // SEND REALTIME MESSAGE
  socket.emit("send-msg", {
    to: activeId,
    from: me._id || me.id,
    message: text.trim(),
  });
}

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (!me) return null;

  return (
    <div className={styles.page}>

      {/* ── HEADER ── */}
      <InboxHeader
        me={me}
        onLogout={logout}
        onHamburger={() => setSidebarOpen(o => !o)}
      />

      <div className={styles.layout}>

        {/* ── SIDEBAR ── */}
        <InboxSidebar
          me={me}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={logout}
        />

        {/* ── CHAT AREA ── */}
        <div className={styles.chatWrap}>
          <div className={styles.chatPanel}>

            <ConversationList
              contacts={contacts}
              history={history}
              activeId={activeId}
              filter={filter}
              query={query}
              onSelectContact={openChat}
              onFilterChange={setFilter}
              onQueryChange={setQuery}
            />

            <ChatWindow
              contacts={contacts}
              history={history}
              activeId={activeId}
              onSend={sendMessage}
              onToast={showToast}
            />

          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      {toast.show && (
        <div className={`${styles.toast} ${toast.type === "err" ? styles.toastErr : ""}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function InboxHeader({ me, onLogout, onHamburger }) {
  const [dropOpen, setDropOpen] = useState(false);

  function setAvatarContent() {
    if (me.profilePic) return <img src={me.profilePic} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />;
    return ini(me.name);
  }

  return (
    <header className={styles.header}>
      <button className={styles.hamburger} onClick={onHamburger}>
        <i className="fa-solid fa-bars" />
      </button>

      <Link to="/dashboard" className={styles.logo}>Dosti<span>शिप</span></Link>

      <div className={styles.headerSearch}>
        <i className="fa-solid fa-magnifying-glass" />
        <input type="text" placeholder="Search people, posts..." />
      </div>

      <div className={styles.headerIcons}>
        <div
          className={`${styles.profileDropdown} ${dropOpen ? styles.pdActive : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.profileBtn} onClick={() => setDropOpen(o => !o)}>
            <div className={styles.profileAvatar}>{setAvatarContent()}</div>
            <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px", color: "#bbb" }} />
          </button>
          <div className={styles.dropdownMenu}>
            <Link to="/profile"><i className="fa-solid fa-user" /> My Profile</Link>
  
            <Link to="/" onClick={(e) => { e.preventDefault(); onLogout(); }}>
              <i className="fa-solid fa-right-from-bracket" /> Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function InboxSidebar({ me, open, onClose, onLogout }) {
  // close when clicking outside on mobile
  useEffect(() => {
    function handler(e) {
      if (open && !e.target.closest(`.${styles.navSidebar}`) && !e.target.closest(`.${styles.hamburger}`)) {
        onClose();
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open, onClose]);

  return (
    <aside className={`${styles.navSidebar} ${open ? styles.navSidebarOpen : ""}`}>
      <div className={styles.navUser}>
        <div className={styles.navAvatar}>
          {me.profilePic
            ? <img src={me.profilePic} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
            : ini(me.name)}
        </div>
        <div className={styles.navUserInfo}>
          <div className={styles.navUserName}>{me.name || "—"}</div>
          <div className={styles.navUserEmail}>{me.email || "—"}</div>
        </div>
      </div>

      <div className={styles.navSection}>
        <p className={styles.navLabel}>Menu</p>
        <ul className={styles.navMenu}>
          <li><a href="/dashboard"><i className="fa-solid fa-house" /> Home</a></li>
          <li><a href="/notifications"><i className="fa-solid fa-bell" /> Notifications</a></li>
          <li><a href="/map"><i className="fa-solid fa-map-location-dot" /> Friends Map</a></li>
          <li><a href="/inbox" className={styles.active}><i className="fa-solid fa-envelope" /> Inbox</a></li>
          <li><a href="/journal"><i className="fa-solid fa-book-open" /> Journal</a></li>
          <li><a href="/hangout"><i className="fa-solid fa-users" /> Hangout Rooms</a></li>
        </ul>
      </div>

      <div className={styles.navSection}>
        <p className={styles.navLabel}>Account</p>
        <ul className={styles.navMenu}>
          <li><a href="/profile"><i className="fa-solid fa-user-circle" /> Profile</a></li>
          <li>
            <a href="/" onClick={(e) => { e.preventDefault(); onLogout(); }}>
              <i className="fa-solid fa-right-from-bracket" /> Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

// ─── Conversation List ────────────────────────────────────────────────────────

function ConversationList({ contacts, history, activeId, filter, query, onSelectContact, onFilterChange, onQueryChange }) {
  const filtered = contacts.filter(c => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter === "online" && c.status !== "online") return false;
    if (filter === "unread" && !c.unread) return false;
    return true;
  });

  return (
    <div className={styles.convList}>
      <div className={styles.convHead}>
        <h3>Messages</h3>
        <div className={styles.searchWrap}>
          <i className="fa-solid fa-magnifying-glass" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={query}
            onChange={e => onQueryChange(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.filterRow}>
        {["all", "online", "unread"].map(f => (
          <span
            key={f}
            className={`${styles.fchip} ${filter === f ? styles.fchipOn : ""}`}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </span>
        ))}
      </div>

      <div className={styles.convItems}>
        {filtered.map(c => {
          const lm = lastOf(history, c.id);
          return (
            <div
              key={c.id}
              className={`${styles.convItem} ${activeId === c.id ? styles.convItemActive : ""}`}
              onClick={() => onSelectContact(c.id)}
            >
              <div className={styles.caWrap}>
                <div className={styles.avc} style={{ background: c.color, width: 44, height: 44, fontSize: 17 }}>
                  {ini(c.name)}
                </div>
                <div className={`${styles.sdot} ${styles[c.status]}`} />
              </div>
              <div className={styles.convMeta}>
                <div className={styles.convTop}>
                  <span className={styles.convName}>{c.name}</span>
                  <span className={styles.convTime}>{lm.ts}</span>
                </div>
                <div className={`${styles.convPrev} ${c.unread ? styles.convPrevBold : ""}`}>
                  {lm.prev}
                </div>
              </div>
              {c.unread ? <div className={styles.ubadge}>{c.unread}</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Chat Window ──────────────────────────────────────────────────────────────

function ChatWindow({ contacts, history, activeId, onSend, onToast }) {
  const contact    = contacts.find(c => c.id === activeId);
  const msgs       = history[activeId] || [];
  const [inputVal, setInputVal]     = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const msgsRef    = useRef(null);
  const taRef      = useRef(null);

  // scroll to bottom whenever messages change
  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [msgs, showTyping]);

  // typing indicator when opening a chat with an online user
  useEffect(() => {
    if (!contact || contact.status !== "online") return;
    if (Math.random() > 0.45) {
      const t = setTimeout(() => {
        setShowTyping(true);
        setTimeout(() => setShowTyping(false), 3000);
      }, 900);
      return () => clearTimeout(t);
    }
  }, [activeId]); // eslint-disable-line

  function handleSend() {
    if (!inputVal.trim()) return;
    onSend(inputVal);
    setInputVal("");
    if (taRef.current) taRef.current.style.height = "auto";
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  if (!contact) {
    return (
      <div className={`${styles.chatWin} ${styles.chatWinEmpty}`}>
        <div className={styles.chEmpty}>
          <div className={styles.chEmptyIco}><i className="fa-solid fa-comments" /></div>
          <h3>Your Messages</h3>
          <p>Select a conversation to start chatting with your Dostis 💜</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatWin}>
      {/* header */}
      <div className={styles.chatHdr}>
        <div className={styles.avc} style={{ background: contact.color, width: 44, height: 44, fontSize: 17 }}>
          {ini(contact.name)}
        </div>
        <div className={styles.chatHdrInfo}>
          <div className={styles.chatHdrName}>{contact.name}</div>
          <div className={`${styles.chatHdrSub} ${styles[contact.status]}`}>
            <span className={styles.hdot} />
            {contact.seen}
          </div>
        </div>
        <div className={styles.chatHdrActs}>
          {["fa-phone", "fa-video", "fa-ellipsis-vertical"].map((ic, i) => (
            <button key={i} className={styles.hbtn} onClick={() => onToast("Feature coming soon 🚀", "err")}>
              <i className={`fa-solid ${ic}`} />
            </button>
          ))}
        </div>
      </div>

      {/* messages */}
      <div className={styles.msgs} ref={msgsRef}>
        {msgs.length === 0 && (
          <>
            <div className={styles.sysmsg}>You matched with {contact.name} on Dostiशिप ✨</div>
            <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, marginTop: 10 }}>
              Be the first to say hello! 👋
            </div>
          </>
        )}

        {msgs.length > 0 && (
          <div className={styles.datesep}><span>Today</span></div>
        )}

        {msgs.map((m, i) => {
          if (m.t === "sys") return <div key={i} className={styles.sysmsg}>{m.txt}</div>;
          const sent = m.d === "sent";
          const nextSameDir = msgs[i + 1]?.d === m.d && msgs[i + 1]?.t !== "sys";
          return (
            <MessageRow
              key={i}
              m={m}
              sent={sent}
              contact={contact}
              ghostAv={nextSameDir}
            />
          );
        })}

        {showTyping && (
          <div className={styles.tyrow}>
            <div className={styles.avc} style={{ background: contact.color, width: 30, height: 30, fontSize: 11 }}>
              {ini(contact.name)}
            </div>
            <div className={styles.tybbl}>
              <div className={styles.tyd} />
              <div className={styles.tyd} />
              <div className={styles.tyd} />
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className={styles.inpArea}>
        <div className={styles.inpRow}>
          <div className={styles.itools}>
            {["fa-regular fa-face-smile", "fa-solid fa-paperclip", "fa-solid fa-image"].map((ic, i) => (
              <button key={i} className={styles.itool} onClick={() => onToast("Feature coming soon 🚀", "err")}>
                <i className={ic} />
              </button>
            ))}
          </div>
          <textarea
            ref={taRef}
            className={styles.msginp}
            placeholder="Type a message..."
            rows={1}
            value={inputVal}
            onChange={e => {
              setInputVal(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
            }}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.sndbtn} onClick={handleSend}>
            <i className="fa-solid fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Message Row ──────────────────────────────────────────────────────────────

function MessageRow({ m, sent, contact, ghostAv }) {
  const [playing, setPlaying] = useState(false);
  const [bars] = useState(() => randomBars());

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setPlaying(false), 4000);
    return () => clearTimeout(t);
  }, [playing]);

  const rowCls = [
    styles.mrow,
    sent ? styles.sent : styles.received,
    ghostAv ? styles.ghostAv : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={rowCls}>
      {!sent && (
        <div className={styles.avc} style={{ background: contact.color, width: 30, height: 30, fontSize: 11 }}>
          {ini(contact.name)}
        </div>
      )}

      {m.t === "voice" && (
        <div className={styles.bbl} style={{ padding: 0 }}>
          <div className={styles.vrow}>
            <button className={styles.vplay} onClick={() => setPlaying(p => !p)}>
              <i className={`fa-solid ${playing ? "fa-pause" : "fa-play"}`} />
            </button>
            <div className={styles.waveform}>
              {bars.map((h, i) => (
                <div key={i} className={styles.wbar} style={{ height: h }} />
              ))}
            </div>
            <span className={styles.vdur}>{m.dur}</span>
          </div>
          <div className={styles.bblMeta} style={{ padding: "0 14px 8px" }}>
            <span className={styles.bblTime}>{m.ts}</span>
            {sent && <i className={`fa-solid fa-check-double ${styles.tick} ${m.r ? styles.tickBlue : ""}`} />}
          </div>
        </div>
      )}

      {m.t === "photos" && (
        <div className={styles.bbl} style={{ padding: 5 }}>
          <div className={`${styles.pgrid} ${styles["p" + (m.n || 2)]}`}>
            {Array.from({ length: m.n || 2 }).map((_, k) => (
              <div key={k} className={styles.pcell}>
                <img src="/static/profileimg.jpg" alt="photo" />
              </div>
            ))}
          </div>
          <div className={`${styles.pgridMeta} ${styles.bblMeta}`}>
            <span className={styles.bblTime}>{m.ts}</span>
            {sent && <i className={`fa-solid fa-check-double ${styles.tick} ${m.r ? styles.tickBlue : ""}`} />}
          </div>
        </div>
      )}

      {m.t === "text" && (() => {
        const emojiOnly = /^[\p{Emoji}\s]+$/u.test(m.txt || "") && (m.txt || "").trim().length <= 4;
        return (
          <div className={`${styles.bbl} ${emojiOnly ? styles.bblEmj : ""}`} style={{ position: "relative" }}>
            <div className={styles.bblTxt}>{m.txt}</div>
            <div className={styles.bblMeta}>
              <span className={styles.bblTime}>{m.ts}</span>
              {sent && <i className={`fa-solid fa-check-double ${styles.tick} ${m.r ? styles.tickBlue : ""}`} />}
            </div>
            {m.rxn && <div className={styles.react}>{m.rxn}</div>}
          </div>
        );
      })()}
    </div>
  );
}
