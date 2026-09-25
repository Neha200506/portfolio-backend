const multer = require("multer");

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

// Create multer upload middleware
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 50 * 1024 * 1024 // 50 MB
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, PNG, WEBP, GIF images and PDF files are allowed"
        )
      );
    }
  }
});

module.exports = upload;