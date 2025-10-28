import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminApi from "../api/adminApi";

const ResumeForm = () => {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await adminApi.get("/resume");
        setResume(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResume();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.warning("Please select a PDF file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await adminApi.post("/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Resume uploaded successfully!");
      setResume(res.data.resume);
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Resume upload failed!");
    }
  };

  return (
    <div className="max-w-xl mx-auto text-white">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">Manage Resume</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white"
        />

        {file && <p className="text-sm text-gray-400">Selected: {file.name}</p>}

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-all"
        >
          Upload Resume
        </button>
      </form>

      {resume && (
        <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-300 mb-2">Current Resume:</p>
          <a
            href={resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 underline hover:text-cyan-300"
          >
            View / Download Resume (PDF)
          </a>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
