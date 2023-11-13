// controllers/fileController.js
const PdfModel = require("../models/pdfModel");
const mime = require("mime-types");
const fs = require("fs");
const path = require("path"); // Import the path module
const PDFParser = require("pdf-parse");

const uploadFile = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    console.log("Received file details:", {
      originalname,
      size: buffer.length,
    });

    // Check if the uploaded file is a PDF
    const mimeType = mime.lookup(originalname);
    if (mimeType !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    console.log("Uploading file:", originalname);

    const pdf = new PdfModel({
      filename: originalname,
      path: buffer.toString("base64"),
    });

    const savedPdf = await pdf.save();

    console.log("File saved successfully");

    res
      .status(200)
      .json({ message: "File uploaded successfully", fileId: savedPdf._id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const retrieveFile = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Retrieve the PDF content from MongoDB based on fileId
    const pdf = await PdfModel.findById(fileId);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    // Send the PDF content as a response
    const buffer = Buffer.from(pdf.path, "base64");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${pdf.filename}`);
    res.status(200).send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const retrieveAllFiles = async (req, res) => {
  try {
    // Retrieve all PDFs from MongoDB
    const allPdfs = await PdfModel.find();

    // Map the data to include only necessary information
    const pdfData = allPdfs.map((pdf) => ({
      fileId: pdf._id,
      filename: pdf.filename,
    }));

    res.status(200).json(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  uploadFile,
  retrieveFile,
  retrieveAllFiles,
};
