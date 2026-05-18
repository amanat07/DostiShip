import { useEffect, useState } from "react";
import styles from "../styles/Settings.module.css";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [language, setLanguage] = useState("en");
  const [dostishipPlus, setDostishipPlus] = useState(false);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/50?text=User");
  const [notificationMsg, setNotificationMsg] = useState("");

  // ── LOAD SAVED SETTINGS ─────────────────────────────
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedAvatar = localStorage.getItem("avatar");
    const savedNotifications = localStorage.getItem("notifications") || "enabled";
    const savedPrivacy = localStorage.getItem("privacy") || "visible";
    const savedLanguage = localStorage.getItem("language") || "en";
    const savedPlus = localStorage.getItem("dostishipPlus") || "disabled";

    setTheme(savedTheme);
    setAvatar(savedAvatar || "https://via.placeholder.com/50?text=User");
    setNotifications(savedNotifications === "enabled");
    setPrivacy(savedPrivacy === "hidden");
    setLanguage(savedLanguage);
    setDostishipPlus(savedPlus === "enabled");

    document.body.setAttribute("data-theme", savedTheme);
  }, []);

  // ── NOTIFICATION ─────────────────────────────────────
  const showNotification = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(""), 3000);
  };

  // ── THEME ────────────────────────────────────────────
  const toggleTheme = (isDark) => {
    const value = isDark ? "dark" : "light";
    setTheme(value);
    document.body.setAttribute("data-theme", value);
    localStorage.setItem("theme", value);
    showNotification(`Theme changed to ${value}`);
  };

  // ── NOTIFICATIONS ────────────────────────────────────
  const toggleNotifications = (val) => {
    setNotifications(val);
    localStorage.setItem("notifications", val ? "enabled" : "disabled");
    showNotification(`Notifications ${val ? "enabled" : "disabled"}`);
  };

  // ── PRIVACY ──────────────────────────────────────────
  const togglePrivacy = (val) => {
    setPrivacy(val);
    localStorage.setItem("privacy", val ? "hidden" : "visible");
    showNotification(`Privacy ${val ? "enabled" : "disabled"}`);
  };

  // ── LANGUAGE ─────────────────────────────────────────
  const changeLanguage = (val) => {
    setLanguage(val);
    localStorage.setItem("language", val);
    showNotification(
      `Language changed to ${
        val === "en" ? "English" : val === "hi" ? "Hindi" : "Punjabi"
      }`
    );
  };

  // ── DOSTISHIP+ ───────────────────────────────────────
  const togglePlus = (val) => {
    setDostishipPlus(val);
    localStorage.setItem("dostishipPlus", val ? "enabled" : "disabled");
    showNotification(`Dostiship+ ${val ? "enabled" : "disabled"}`);
  };

  // ── AVATAR ───────────────────────────────────────────
  const updateAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      localStorage.setItem("avatar", ev.target.result);
      showNotification("Avatar updated successfully!");
    };
    reader.readAsDataURL(file);
  };

  // ── PASSWORD (same logic) ────────────────────────────
  const changePassword = () => {
    const current = document.getElementById("current-password").value;
    const newPass = document.getElementById("new-password").value;
    const confirm = document.getElementById("confirm-password").value;

    if (!current || !newPass || !confirm) {
      return showNotification("Please fill all fields");
    }
    if (newPass !== confirm) {
      return showNotification("Passwords do not match");
    }
    if (newPass.length < 8) {
      return showNotification("Password must be 8+ characters");
    }

    localStorage.setItem("password", newPass);
    showNotification("Password changed successfully!");

    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-password").value = "";
  };

  const deactivateAccount = () => {
    localStorage.setItem("accountStatus", "deactivated");
    showNotification("Account deactivated");
  };

  const deleteAccount = () => {
    localStorage.clear();
    showNotification("Account deleted");
  };

  return (
    <div>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>
          Dosti<span>शिप</span>
        </div>
        <button className={styles.backBtn} onClick={() => window.history.back()}>
          Back
        </button>
      </header>

      {/* NOTIFICATION */}
      {notificationMsg && (
        <div className={styles.notification}>{notificationMsg}</div>
      )}

      {/* SETTINGS */}
      <div className={styles.container}>
        <h2>Settings</h2>

        {/* Avatar */}
        <div className={styles.option}>
          <label>Change Profile Picture</label>
          <img src={avatar} className={styles.avatar} />
          <input type="file" onChange={updateAvatar} />
        </div>

        {/* Theme */}
        <div className={styles.option}>
          <label>Theme</label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => toggleTheme(e.target.checked)}
          />
        </div>

        {/* Notifications */}
        <div className={styles.option}>
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => toggleNotifications(e.target.checked)}
          />
        </div>

        {/* Privacy */}
        <div className={styles.option}>
          <label>Privacy</label>
          <input
            type="checkbox"
            checked={privacy}
            onChange={(e) => togglePrivacy(e.target.checked)}
          />
        </div>

        {/* Language */}
        <div className={styles.option}>
          <label>Language</label>
          <select value={language} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="pa">Punjabi</option>
          </select>
        </div>

        {/* Plus */}
        <div className={styles.option}>
          <label>Dostiship+</label>
          <input
            type="checkbox"
            checked={dostishipPlus}
            onChange={(e) => togglePlus(e.target.checked)}
          />
        </div>

        {/* Password */}
        <div className={styles.option}>
          <label>Change Password</label>
          <input id="current-password" placeholder="Current password" type="password" />
          <input id="new-password" placeholder="New password" type="password" />
          <input id="confirm-password" placeholder="Confirm password" type="password" />
          <button onClick={changePassword}>Change</button>
        </div>

        {/* Danger */}
        <div className={styles.option}>
          <button onClick={deactivateAccount}>Deactivate</button>
          <button onClick={deleteAccount}>Delete</button>
        </div>
      </div>
    </div>
  );
}