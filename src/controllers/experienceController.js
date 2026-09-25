const supabase = require("../config/supabase");

// CREATE experience
const createExperience = async (req, res) => {
  try {
    const {
      company,
      position,
      description,
      start_date,
      end_date,
      currently_working,
      company_url
    } = req.body;

    if (!company || !position) {
      return res.status(400).json({
        success: false,
        message: "Company and position are required"
      });
    }

    const { data, error } = await supabase
      .from("experience")
      .insert([
        {
          company,
          position,
          description,
          start_date,
          end_date,
          currently_working,
          company_url
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create experience",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
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

// READ all experience
const getExperiences = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch experience",
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

// READ one experience
const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Experience not found"
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

// UPDATE experience
const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company,
      position,
      description,
      start_date,
      end_date,
      currently_working,
      company_url
    } = req.body;

    const { data, error } = await supabase
      .from("experience")
      .update({
        company,
        position,
        description,
        start_date,
        end_date,
        currently_working,
        company_url,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Experience not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
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

// DELETE experience
const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("experience")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete experience",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully"
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
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience
};