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

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, profilePic: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

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
    notif.style.backgroundColor =
      type === "error" ? "#e74c3c" : "#2ecc71";

    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  };

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      gender,
      profilePic,
    } = form;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      showNotification("Please fill all fields", "error");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }

    if (!profilePic) {
      showNotification("Please upload a profile image", "error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", firstName + " " + lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("profilePic", profilePic);

      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        showNotification("Registration successful!", "success");

        setTimeout(() => {
          navigate("/discover-interests");
        }, 1500);
      } else {
        showNotification(data.error || "Something went wrong", "error");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      showNotification("Server error!", "error");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* IMAGE SECTION */}
      <div
        className={styles.imageSection}
        style={{
          background: `url(${regImage}) no-repeat center/cover`,
        }}
      >
        <div className={styles.imageCaption}>
          Join Our Community
        </div>
      </div>

      {/* FORM SECTION */}
      <div className={styles.formSection}>
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <i
              className="fas fa-eye"
              onClick={() => togglePassword("password")}
            ></i>
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
            <i
              className="fas fa-eye"
              onClick={() => togglePassword("confirmPassword")}
            ></i>
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" required />
            <label>
              I accept the <Link to="/terms">Terms</Link> &{" "}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <div className={styles.formGroup}>
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            className={styles.registerBtn}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
        </form>

        <div className={styles.loginLink}>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;