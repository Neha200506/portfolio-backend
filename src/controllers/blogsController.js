const supabase = require("../config/supabase");

// CREATE blog
const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      image_url,
      published,
      published_at
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required"
      });
    }

    const { data, error } = await supabase
      .from("blogs")
      .insert([
        {
          title,
          slug,
          excerpt,
          content,
          image_url,
          published,
          published_at
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create blog",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
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

// READ all blogs
const getBlogs = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch blogs",
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

// READ one blog
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
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

// UPDATE blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      excerpt,
      content,
      image_url,
      published,
      published_at
    } = req.body;

    const { data, error } = await supabase
      .from("blogs")
      .update({
        title,
        slug,
        excerpt,
        content,
        image_url,
        published,
        published_at,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Blog not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
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

// DELETE blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("blogs")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete blog",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully"
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
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
};