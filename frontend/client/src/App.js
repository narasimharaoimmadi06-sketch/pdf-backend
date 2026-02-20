import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ImageToPdf from "./pages/ImageToPdf";
import PdfToImage from "./pages/PdfToImage";
import PdfToWord from "./pages/PdfToWord";
import PdfMerge from "./pages/PdfMerge";

function Home() {
  const nav = useNavigate();

  return (
    <div className="bg">
      <div className="card">
        <h1>Narasimharao</h1>
        <p>Convert your files with elegance.</p>

        <div className="buttons">
          <button onClick={() => nav("/image-to-pdf")}>Images to PDF</button>
          <button onClick={() => nav("/pdf-to-image")}>PDF to Image</button>
          <button onClick={() => nav("/pdf-to-word")}>PDF to Word</button>
          <button onClick={() => nav("/pdf-merge")}>PDF Merge</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-to-pdf" element={<ImageToPdf />} />
        <Route path="/pdf-to-image" element={<PdfToImage />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/pdf-merge" element={<PdfMerge />} />
      </Routes>
    </BrowserRouter>
  );
}
