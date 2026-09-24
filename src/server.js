const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./config/supabase");

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
    message: "Portfolio CMS Backend is running!",
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
        error: error.message,
      });
    }

    res.json({
      success: true,
      message: "Supabase connection is working!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Supabase connection failed",
      error: error.message,
    });
  }
});

// -------------------------
// Start Server
// -------------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
