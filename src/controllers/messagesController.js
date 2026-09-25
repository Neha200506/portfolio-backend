const supabase = require("../config/supabase");

// CREATE message
const createMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          name,
          email,
          subject,
          message
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to save message",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
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

// READ all messages
const getMessages = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch messages",
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

// READ one message
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Message not found"
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

// UPDATE message
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    const { data, error } = await supabase
      .from("messages")
      .update({
        is_read
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Message not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
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

// DELETE message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete message",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully"
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
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};