import React, { useState } from "react";
import DownloadModel from "./DownloadModel";

export default function TrainModel({ filePath, task, onModelTrained }) {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [score, setScore] = useState(null);
  const [modelFilename, setModelFilename] = useState("");
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");
  const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

  const handleTrainModel = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/run_automl`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_path: filePath, task }),
      });

      const data = await response.json();
      console.log("Training response:", data);
      setLoading(false);

      if (response.ok) {
        setModel(data.best_model);
        setScore({ cv: data.cv_score, test: data.test_score });
        setModelFilename(data.model_filename);
        setDetails(Array.isArray(data.models) ? data.models : []);
        onModelTrained(data.model_filename);
      } else {
        setError(data.message || "Model training failed.");
      }
    } catch (e) {
      setLoading(false);
      setError("Failed to connect to backend.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Train Model</h3>

      <button
        onClick={handleTrainModel}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Training..." : "Train Model"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {model && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-lg font-semibold text-green-800 mb-2">Training Complete!</h4>
          <p className="text-green-700"><strong>Best Model:</strong> {model}</p>
          {score && (
            <>
              <p className="text-green-700"><strong>CV Score:</strong> {Number(score.cv).toFixed(4)}</p>
              <p className="text-green-700"><strong>Test Score:</strong> {Number(score.test).toFixed(4)}</p>
            </>
          )}
        </div>
      )}

      {details && details.length > 0 && (
        <div className="mt-4">
          <h5 className="font-semibold mb-2">All Models Performance</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 border text-left">Model</th>
                  <th className="px-3 py-2 border text-left">CV Score</th>
                  <th className="px-3 py-2 border text-left">Test Score</th>
                </tr>
              </thead>
              <tbody>
                {details.map((d, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 py-2 border">{d.model}</td>
                    <td className="px-3 py-2 border">{Number(d.cv_score).toFixed(4)}</td>
                    <td className="px-3 py-2 border">{Number(d.test_score).toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modelFilename && <DownloadModel filename={modelFilename} />}
    </div>
  );
}
