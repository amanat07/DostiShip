require("dotenv").config();

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const friendRoutes = require("./routes/friends");
const passport = require("./middleware/passport");
const journalRoutes = require("./routes/journal");

const app = express();
const server = http.createServer(app);

// ─────────────────────────────────────────────
// SOCKET.IO
// ─────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("User added:", userId);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);

    if (sendUserSocket) {
      io.to(sendUserSocket).emit(
  "msg-receive",
  {
    from: data.from,
    message: data.message,
  }
);
    }
  });
  

  socket.on("disconnect", () => {

  for (const [key, value] of onlineUsers.entries()) {

    if (value === socket.id) {
      onlineUsers.delete(key);
      break;
    }

  }

  console.log("❌ User disconnected");

});
});

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
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

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
    failureRedirect:
      "http://localhost:3000/login?error=invalid_domain",
  }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:3000";

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
app.use(
  "/api/messages",
  require("./routes/message")
);
app.use("/api/journal", journalRoutes);
app.use(
  "/api/friends",
  friendRoutes
);

// ─────────────────────────────────────────────
// REACT BUILD
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
    error:
      err.message || "Internal Server Error",
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
// SERVER START
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `🚀 Server running → http://localhost:${PORT}`
  );
});