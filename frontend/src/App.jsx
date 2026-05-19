import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import AuthCallback from "./pages/AuthCallback";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DiscoverInterests from "./pages/DiscoverInterests";
import Hangout from "./pages/Hangout";
import Inbox from "./pages/Inbox";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Notification from "./pages/Notification";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Settings from "./pages/Settings";

// ── Must be logged in ──
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// ── Must be logged in AND interests not yet set ──
// If interests already exist, skip straight to dashboard
function InterestsRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.interests && user.interests.length > 0) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Post-register: logged in + no interests ── */}
        <Route
          path="/discover-interests"
          element={
            <InterestsRoute>
              <DiscoverInterests />
            </InterestsRoute>
          }
        />

        {/* ── Protected app pages ── */}
        <Route path="/dashboard"     element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/hangout"       element={<PrivateRoute><Hangout /></PrivateRoute>} />
        <Route path="/inbox"         element={<PrivateRoute><Inbox /></PrivateRoute>} />
        <Route path="/journal"       element={<PrivateRoute><Journal /></PrivateRoute>} />
        <Route path="/map"           element={<PrivateRoute><Map /></PrivateRoute>} />
        <Route path="/notifications" element={<PrivateRoute><Notification /></PrivateRoute>} />
        <Route path="/profile"       element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/settings"      element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;