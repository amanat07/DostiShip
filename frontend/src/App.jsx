import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/auth-callback" element={<AuthCallback />} />

        {/* Auth flow */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Post-login flow */}
        <Route path="/discover-interests" element={<DiscoverInterests />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* App pages */}
        <Route path="/hangout" element={<Hangout />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/map" element={<Map />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;