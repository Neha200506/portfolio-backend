const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./config/supabase");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const aboutRoutes = require("./routes/aboutRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const projectRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const messageRoutes = require("./routes/messageRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(express.json());

// -------------------------
// Basic Test Route
// -------------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio CMS Backend is running!"
  });
});

// -------------------------
// Supabase Test Route
// -------------------------
app.get("/api/test-supabase", async (req, res) => {
  try {
    const { error } = await supabase.auth.getSession();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Supabase connection failed",
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Supabase connection is working!"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Supabase connection failed",
      error: error.message
    });
  }
});

// -------------------------
// API Routes
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/media", mediaRoutes);

// -------------------------
// Protected Test Route
// -------------------------
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "You have accessed a protected route!",
    user: req.user
  });
});

// -------------------------
// Start Server
// -------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});