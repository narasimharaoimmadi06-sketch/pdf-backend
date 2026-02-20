const express = require("express");
const cors = require("cors");

const imageToPdf = require("./routes/imageToPdf");
const pdfToImage = require("./routes/pdfToImage");
const pdfToWord = require("./routes/pdfToWord");
const pdfMerge = require("./routes/pdfMerge");

const app = express();

app.use(cors());
app.use(express.json());

// static folders
app.use("/uploads", express.static("uploads"));
app.use("/outputs", express.static("outputs"));

// routes
app.use("/api/image-to-pdf", imageToPdf);
app.use("/api/pdf-to-image", pdfToImage);
app.use("/api/pdf-to-word", pdfToWord);
app.use("/api/pdf-merge", pdfMerge);

app.get("/", (req, res) => {
  res.send("Backend working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
