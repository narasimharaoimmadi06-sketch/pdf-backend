import React from "react";

export default function UploadBox({ multiple, onChange }) {
  return (
    <div style={{ margin: "20px 0" }}>
      <input type="file" multiple={multiple} onChange={e => onChange(e.target.files)} />
    </div>
  );
}
