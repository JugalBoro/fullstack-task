// controllers/PDFController.js
const { PDFDocument } = require("pdf-lib");

const extractPages = async (req, res) => {
  try {
    // Access selected pages and original PDF from request
    const { originalPDF, selectedPages } = req.body;

    // Use pdf-lib to manipulate PDF
    const pdfDoc = await PDFDocument.load(originalPDF);
    const newPdfDoc = await PDFDocument.create();

    for (const pageNum of selectedPages) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
      newPdfDoc.addPage(copiedPage);
    }

    // Save the new PDF to a buffer
    const newPdfBytes = await newPdfDoc.save();

    // Respond with the new PDF
    res.setHeader("Content-Type", "application/pdf");
    res.send(newPdfBytes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  extractPages,
};
