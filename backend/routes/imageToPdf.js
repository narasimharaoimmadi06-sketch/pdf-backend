const express = require("express");
const router = express.Router();
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("files"), async (req, res) => {
  try {
    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const imgBuffer = await sharp(file.path).toBuffer();
      const img = await pdfDoc.embedJpg(imgBuffer);
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      fs.unlinkSync(file.path);
    }

    const pdfBytes = await pdfDoc.save();
    const name = `images_${Date.now()}.pdf`;
    const outPath = path.join("outputs", name);
    fs.writeFileSync(outPath, pdfBytes);

    res.json({ url: `/outputs/${name}` });
  } catch (e) {
    res.status(500).json({ error: "Image to PDF failed" });
  }
});

module.exports = router;
