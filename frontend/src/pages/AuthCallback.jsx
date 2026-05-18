import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const userParam = params.get("user");

    try {
      if (token && userParam) {
        const user = JSON.parse(decodeURIComponent(userParam));

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard"); // replace with your page.html route
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Auth callback error:", err);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Poppins"
    }}>
      Logging you in...
    </div>
  );
}