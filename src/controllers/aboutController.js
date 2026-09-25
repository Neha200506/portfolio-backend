const supabase = require("../config/supabase");

// CREATE about
const createAbout = async (req, res) => {
  try {
    const {
      name,
      title,
      bio,
      profile_image_url,
      email,
      location
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required"
      });
    }

    const { data, error } = await supabase
      .from("about")
      .insert([
        {
          name,
          title,
          bio,
          profile_image_url,
          email,
          location
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create about information",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "About information created successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// READ all about records
const getAbout = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("about")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch about information",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// READ one about record
const getAboutById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("about")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "About information not found"
      });
    }

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// UPDATE about
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      title,
      bio,
      profile_image_url,
      email,
      location
    } = req.body;

    const { data, error } = await supabase
      .from("about")
      .update({
        name,
        title,
        bio,
        profile_image_url,
        email,
        location,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "About information not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "About information updated successfully",
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// DELETE about
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("about")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete about information",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "About information deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout
};