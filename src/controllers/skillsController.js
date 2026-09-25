const supabase = require("../config/supabase");

// CREATE skill
const createSkill = async (req, res) => {
  try {
    const {
      name,
      category,
      proficiency,
      icon_url
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required"
      });
    }

    const { data, error } = await supabase
      .from("skills")
      .insert([
        {
          name,
          category,
          proficiency,
          icon_url
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create skill",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
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

// READ all skills
const getSkills = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch skills",
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

// READ one skill
const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Skill not found"
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

// UPDATE skill
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      category,
      proficiency,
      icon_url
    } = req.body;

    const { data, error } = await supabase
      .from("skills")
      .update({
        name,
        category,
        proficiency,
        icon_url,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Skill not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
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

// DELETE skill
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete skill",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully"
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
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill
};