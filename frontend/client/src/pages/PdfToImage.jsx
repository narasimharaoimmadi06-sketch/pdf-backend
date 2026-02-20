import React, { useState } from "react";
import axios from "axios";

function PdfToImage() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [images, setImages] = useState([]);

  const handleConvert = async () => {
    if (!file) {
      alert("Select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);   // ⚠️ must be "file"

    try {
      const res = await axios.post(
        "http://localhost:5000/api/pdf-to-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMsg(res.data.message);
      setImages(res.data.files);

    } catch (err) {
      console.log(err);
      alert("Conversion failed");
    }
  };

  return (
    <div>
      <h2>PDF to Image</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleConvert}>Convert</button>

      <p>{msg}</p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:5000${img}`}
            alt="converted"
            width="200"
            style={{ margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default PdfToImage;
