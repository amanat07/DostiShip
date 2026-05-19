require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const passport = require("./middleware/passport");
const jwt = require("jsonwebtoken");

const app = express();

// ─────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ─────────────────────────────────────────────
// BODY PARSERS
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────
// STATIC FILES
// ─────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─────────────────────────────────────────────
// SESSION
// ─────────────────────────────────────────────
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// ─────────────────────────────────────────────
// PASSPORT
// ─────────────────────────────────────────────
app.use(passport.initialize());
app.use(passport.session());

// ─────────────────────────────────────────────
// GOOGLE AUTH
// ─────────────────────────────────────────────
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const frontendUrl =
        process.env.FRONTEND_URL || "http://localhost:3000";

      const userData = {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        profilePic: req.user.profilePic,
        interests: req.user.interests || [],
        gender: req.user.gender,
      };

      res.redirect(
        `${frontendUrl}/auth-callback?token=${token}&user=${encodeURIComponent(
          JSON.stringify(userData)
        )}`
      );
    } catch (err) {
      console.error("Google auth error:", err);
      res.status(500).json({
        error: "Google authentication failed",
      });
    }
  }
);

// ─────────────────────────────────────────────
// API ROUTES
// ─────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/post"));

// ─────────────────────────────────────────────
// REACT BUILD (PRODUCTION)
// ─────────────────────────────────────────────
const frontendBuildPath = path.join(
  __dirname,
  "..",
  "frontend",
  "dist"
);

if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.use((req, res, next) => {
    if (
      req.method !== "GET" ||
      req.path.startsWith("/api/") ||
      req.path.startsWith("/auth/")
    ) {
      return next();
    }

    res.sendFile(
      path.join(frontendBuildPath, "index.html")
    );
  });
}

// ─────────────────────────────────────────────
// ERROR HANDLER
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:");
  console.error(err);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

// ─────────────────────────────────────────────
// MONGODB
// ─────────────────────────────────────────────
mongoose
  .connect(
    process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/dostiship"
  )
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
  });

// ─────────────────────────────────────────────
// SERVER
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running → http://localhost:${PORT}`
  );
});