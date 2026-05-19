import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import regImage from "../assets/regii.jpg";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profilePic: null,
  });

  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, profilePic: file });
        setPreviewUrl(URL.createObjectURL(file)); // show preview before upload
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const showNotification = (message, type = "success") => {
    const notif = document.createElement("div");
    notif.innerText = message;
    Object.assign(notif.style, {
      position: "fixed", top: "20px", right: "20px",
      padding: "12px 20px", borderRadius: "8px", color: "#fff",
      zIndex: "9999", fontSize: "14px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
      backgroundColor: type === "error" ? "#e74c3c" : "#2ecc71",
      maxWidth: "320px",
    });
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 4000);
  };

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    if (input) input.type = input.type === "password" ? "text" : "password";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, password, confirmPassword, gender, profilePic } = form;

    // ── Client-side validation ──
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !gender) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    // ── Chitkara email check on frontend ──
    if (!email.toLowerCase().endsWith("@chitkara.edu.in")) {
      showNotification("Only @chitkara.edu.in email addresses are allowed", "error");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    if (password.length < 6) {
      showNotification("Password must be at least 6 characters", "error");
      return;
    }

    if (!profilePic) {
      showNotification("Please upload a profile photo", "error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", `${firstName} ${lastName}`);
      formData.append("username", username.toLowerCase());
      formData.append("email", email.toLowerCase());
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("profilePic", profilePic); // uploaded to Cloudinary by backend

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formData,
        // NOTE: Do NOT set Content-Type header — browser sets it with boundary for multipart
      });

      const data = await res.json();

      if (res.ok) {
        // Store token and user (interests will be [] at this point)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showNotification("Registered successfully! Now pick your interests 🎉", "success");

        // Always redirect to discover-interests after registration
        setTimeout(() => navigate("/discover-interests"), 1200);
      } else {
        showNotification(data.error || "Registration failed", "error");
        setLoading(false);
      }
    } catch (err) {
      console.error("Register fetch error:", err);
      showNotification(
        "Cannot connect to server. Make sure the backend is running on port 5000.",
        "error"
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* IMAGE SECTION */}
      <div
        className={styles.imageSection}
        style={{ background: `url(${regImage}) no-repeat center/cover` }}
      >
        <div className={styles.imageCaption}>Join Our Community</div>
      </div>

      {/* FORM SECTION */}
      <div className={styles.formSection}>
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input name="firstName" placeholder="First Name" onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <input name="username" placeholder="Username" onChange={handleChange} required />
          </div>

          {/* Email with hint */}
          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email (@chitkara.edu.in only)"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              onChange={handleChange}
              required
            />
            <i className="fas fa-eye" onClick={() => togglePassword("password")} />
          </div>

          <div className={styles.formGroup}>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <i className="fas fa-eye" onClick={() => togglePassword("confirmPassword")} />
          </div>

          {/* Profile picture with preview */}
          <div className={styles.formGroup}>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Profile preview"
                style={{
                  width: 80, height: 80, borderRadius: "50%",
                  objectFit: "cover", marginBottom: 8, display: "block",
                }}
              />
            )}
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" required />
            <label>
              I accept the <Link to="/terms">Terms</Link> &{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </label>
          </div>

          <button className={styles.registerBtn} disabled={loading}>
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className={styles.loginLink}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;