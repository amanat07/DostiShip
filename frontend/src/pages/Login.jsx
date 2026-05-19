import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

import loginImage from "../assets/registeration.jpeg";
import googleImg from "../assets/google.jpeg";
import appleImg from "../assets/apple.jpeg";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── If already logged in, skip to the right page ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // not logged in, stay on login page

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const hasInterests = Array.isArray(user.interests) && user.interests.length > 0;
      // ⚠️ Old code did: navigate("/dashboard") always — WRONG
      // Must check interests first
      if (hasInterests) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/discover-interests", { replace: true });
      }
    } catch {
      // Corrupt localStorage — clear and stay on login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const showNotification = (message, type = "success") => {
    const notif = document.createElement("div");
    notif.innerText = message;
    notif.style.position = "fixed";
    notif.style.top = "20px";
    notif.style.right = "20px";
    notif.style.padding = "12px 18px";
    notif.style.borderRadius = "8px";
    notif.style.color = "#fff";
    notif.style.zIndex = "9999";
    notif.style.fontSize = "14px";
    notif.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    notif.style.backgroundColor = type === "error" ? "#e74c3c" : "#2ecc71";
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (!username || !password) {
      showNotification("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ── Save token and full user object (includes interests array) ──
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showNotification("Login successful! Redirecting...", "success");

        // ── Route based on whether interests have been set ──
        const hasInterests =
          Array.isArray(data.user.interests) && data.user.interests.length > 0;

        setTimeout(() => {
          if (hasInterests) {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/discover-interests", { replace: true });
          }
        }, 800);
      } else {
        showNotification(data.message || "Invalid login credentials", "error");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err);
      showNotification(
        "Cannot connect to server. Make sure backend is running on port 5000.",
        "error"
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-page"]}>
      <Link to="/" className={styles["login-back-button"]}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>

      <div className={styles["login-container"]}>
        {/* FORM SECTION */}
        <div className={styles["login-form-section"]}>
          <h2>Welcome Back!</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles["login-form-group"]}>
              <input
                type="text"
                name="username"
                placeholder="Username or Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles["login-form-group"]}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles["toggle-password"]}`}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>

            <div className={styles["login-forgot-password"]}>
              <a href="#">Forgot Password?</a>
            </div>

            <button className={styles["login-btn"]} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className={styles["login-options"]}>
            <div className={styles["login-divider"]}>or continue with</div>

            <div className={styles["login-social-login"]}>
              <div
                className={styles["login-social-btn"]}
                onClick={() =>
                  window.location.href = "http://localhost:5000/auth/google"
                }
              >
                <img src={googleImg} alt="Google" />
              </div>

              <div className={styles["login-social-btn"]}>
                <img src={appleImg} alt="Apple" />
              </div>
            </div>

            <div className={styles["login-register-link"]}>
              Don't have an account? <Link to="/register">Register now</Link>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div
          className={styles["login-image-section"]}
          style={{
            background: `url(${loginImage}) no-repeat center center / cover`,
          }}
        />
      </div>
    </div>
  );
}

export default Login;