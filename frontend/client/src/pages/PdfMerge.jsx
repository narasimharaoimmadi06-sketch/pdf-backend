import React, { useState } from "react";
import UploadBox from "../components/UploadBox";

export default function PdfMerge() {
  const [files, setFiles] = useState(null);
  const [url, setUrl] = useState("");

  const merge = async () => {
    const fd = new FormData();
    for (let f of files) fd.append("files", f);

    const res = await fetch("https://pdf-backend-5a9k.onrender.com/api/pdf-merge", {
      method: "POST",
      body: fd
    });

    const data = await res.json();
    setUrl("https://pdf-backend-5a9k.onrender.com" + data.url);
  };

  return (
    <div>
      <h2>PDF Merge</h2>
      <UploadBox multiple={true} onChange={setFiles} />
      <button onClick={merge}>Merge</button>
      {url && <a href={url}>Download PDF</a>}
    </div>
  );
}
