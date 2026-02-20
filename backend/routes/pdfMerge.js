const express = require("express");
const router = express.Router();
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("files"), async (req, res) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of req.files) {
      const bytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
      fs.unlinkSync(file.path);
    }

    const mergedBytes = await mergedPdf.save();
    const name = `merge_${Date.now()}.pdf`;
    const outPath = path.join("outputs", name);
    fs.writeFileSync(outPath, mergedBytes);

    res.json({ url: `/outputs/${name}` });
  } catch (e) {
    res.status(500).json({ error: "Merge failed" });
  }
});

module.exports = router;
