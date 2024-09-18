const multer = require("multer");

// Set up multer storage engine
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500000 }, // Limit file size to 500KB
});

module.exports = upload;
