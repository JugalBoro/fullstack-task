// routes/apiRoutes.js
const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/fileController");
const pdfController = require("../controllers/pdfController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit (adjust as needed)
  },
});
// Endpoint to handle PDF file upload
router.post("/upload", upload.single("pdf"), fileController.uploadFile);

// Endpoint to retrieve and display stored PDF files
router.get("/retrieve/:id", fileController.retrieveFile);

// Endpoint to extract selected pages and create a new PDF
router.post("/extract-pages", pdfController.extractPages);
// router.get("/getNumPages/:fileId", fileController.getPageNumber);
module.exports = router;
