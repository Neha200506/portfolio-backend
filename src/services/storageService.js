const supabase = require("../config/supabase");

const BUCKET_NAME = "portfolio-media";

const uploadFile = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      throw new Error(error.message);
    }

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return {
      fileName,
      fileUrl: data.publicUrl,
      storagePath: fileName,
      fileType: file.mimetype,
      fileSize: file.size
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteFile = async (storagePath) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([storagePath]);

    if (error) {
      throw new Error(error.message);
    }

    return true;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  uploadFile,
  deleteFile
};