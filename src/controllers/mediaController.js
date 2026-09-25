const supabase = require("../config/supabase");
const { uploadFile } = require("../services/storageService");

// UPLOAD media file
const uploadMedia = async (req, res) => {
  try {
    // Check whether a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required"
      });
    }

    // Upload file to Supabase Storage
    const uploadedFile = await uploadFile(req.file);

    // Save file information in media table
    const { data, error } = await supabase
      .from("media")
      .insert([
        {
          file_name: uploadedFile.fileName,
          file_url: uploadedFile.fileUrl,
          storage_path: uploadedFile.storagePath,
          file_type: uploadedFile.fileType,
          file_size: uploadedFile.fileSize
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "File uploaded but media record could not be saved",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data
    });

  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message
    });
  }
};
// CREATE media record
const createMedia = async (req, res) => {
  try {
    const {
      file_name,
      file_url,
      storage_path,
      file_type,
      file_size
    } = req.body;

    if (!file_name || !file_url || !storage_path) {
      return res.status(400).json({
        success: false,
        message: "File name, file URL and storage path are required"
      });
    }

    const { data, error } = await supabase
      .from("media")
      .insert([
        {
          file_name,
          file_url,
          storage_path,
          file_type,
          file_size
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create media record",
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Media record created successfully",
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

// READ all media
const getMedia = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch media",
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

// READ one media
const getMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("media")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Media record not found"
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

// UPDATE media record
const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      file_name,
      file_url,
      storage_path,
      file_type,
      file_size
    } = req.body;

    const { data, error } = await supabase
      .from("media")
      .update({
        file_name,
        file_url,
        storage_path,
        file_type,
        file_size
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Media record not found or update failed",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Media record updated successfully",
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

// DELETE media record
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("media")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete media record",
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Media record deleted successfully"
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
  uploadMedia,
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia
};