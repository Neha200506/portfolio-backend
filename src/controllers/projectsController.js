const supabase = require("../config/supabase");

// CREATE project
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      image_url,
      technologies,
      github_url,
      live_url,
      featured
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required"
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          image_url,
          technologies,
          github_url,
          live_url,
          featured
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create project",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Project created successfully",
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

// READ all projects
const getProjects = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
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

// READ one project
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
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

// UPDATE project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      image_url,
      technologies,
      github_url,
      live_url,
      featured
    } = req.body;

    const { data, error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        image_url,
        technologies,
        github_url,
        live_url,
        featured,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Project not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
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

// DELETE project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete project",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully"
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
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};