import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import DiscoverInterests from "./src/pages/DiscoverInterests";
import PrivacyPolicy from "./src/pages/PrivacyPolicy";
import ProfilePage from "./src/pages/ProfilePage";
import Services from "./src/pages/Services";
import { CiSettings } from "react-icons/ci";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/about" element={<About />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Journal" element={<Journal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hangout" element={<Hangout />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/DiscoverInterests" element={<DiscoverInterests />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        

      </Routes>
    </Router>
  );
}

export default App;