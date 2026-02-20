import React, { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function ImageToPdf() {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState("");

  const convert = async () => {
    const fd = new FormData();
    for (let f of files) fd.append("files", f);

    const res = await fetch("https://pdf-backend-5a9k.onrender.com/api/image-to-pdf", {
      method: "POST",
      body: fd
    });

    const data = await res.json();
    setUrl("https://pdf-backend-5a9k.onrender.com" + data.url);
  };

  return (
    <div>
      <h2>Images to PDF</h2>
      <UploadBox multiple={true} onChange={setFiles} />
      <button onClick={convert}>Convert</button>
      {url && <a href={url}>Download PDF</a>}
    </div>
  );
}
