import React from "react";

export default function DownloadModel({ filename }) {
  const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";
  const handleDownload = async () => {
    const response = await fetch(`${API}/download/${filename}`);
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert("Failed to download model.");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">Download Trained Model</h3>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Download Model
      </button>
    </div>
  );
}
