import { useState } from "react";

export default function UploadWork() {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const handleUpload = () => {
    alert("File uploaded successfully (dummy).");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-700">Upload Your Project</h2>
        
        <input
          type="file"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <textarea
          placeholder="Project Description"
          className="w-full border p-2 rounded mb-4"
          rows="4"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <button
          onClick={handleUpload}
          className="w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
