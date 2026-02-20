const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { pdfToPng } = require("pdf-to-png-converter");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pages = await pdfToPng(req.file.path, {
      outputFolder: "outputs",
      fileName: "page",
      disableFontFace: true,
      useSystemFonts: true
    });

    // delete uploaded pdf
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: "Converted successfully",
      files: pages.map(p => `/outputs/${path.basename(p.path)}`)
    });

  } catch (err) {
    console.error("PDF TO IMAGE ERROR:", err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

module.exports = router;
