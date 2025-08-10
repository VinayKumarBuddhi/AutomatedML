import { useState } from "react"

export default function QueryDataset({ filePath }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [code, setCode] = useState("")
  const API = import.meta.env.VITE_API_BASE || "http://localhost:5000"

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API}/query_dataset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_path: filePath, query })
      })
      const data = await res.json()

      setCode(data.code || "")
      if (!res.ok || data.error) {
        setError(data.error || "Failed to run query")
        setResults([])
      } else {
        setResults(data.result ?? [])
      }
    } catch (err) {
      setError("Failed to query dataset")
      setResults([])
      setCode("")
    }

    setLoading(false)
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-2">Query Dataset</h2>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Ask something in English..."
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Run Query
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {code && (
        <div className="mt-3">
          <h3 className="font-medium mb-1">Generated code</h3>
          <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-sm"><code>{code}</code></pre>
        </div>
      )}
      {/* Table for array of objects */}
      {!loading && results && Array.isArray(results) && results.length > 0 && typeof results[0] === "object" && (
        <table className="w-full mt-4 table-auto border">
          <thead>
            <tr>
              {Object.keys(results[0]).map(key => (
                <th key={key} className="border px-2 py-1">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j} className="border px-2 py-1">
                    {String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* List for array of values */}
      {!loading && Array.isArray(results) && results.length > 0 && typeof results[0] !== "object" && (
        <div className="mt-4">
          <strong>Result:</strong>
          <ul className="list-disc ml-6">
            {results.map((item, idx) => (
              <li key={idx}>{String(item)}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Single value */}
      {!loading && results && !Array.isArray(results) && (
        <div className="mt-4">
          <strong>Result:</strong> {String(results)}
        </div>
      )}
    </div>
  )
}
