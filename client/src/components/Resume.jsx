import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await adminApi.get("/resume");
        if (res.data?.url) setResumeUrl(res.data.url);
      } catch (err) {
        console.error("Error fetching resume:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(resumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "VIGNESH V S Resume.pdf"; // 👈 Custom filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading resume:", err);
      alert("❌ Failed to download. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-cyan-400">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium">Loading Resume...</p>
      </div>
    );
  }

  if (!resumeUrl) {
    return (
      <div className="text-center py-16 bg-gray-900 text-gray-400 rounded-xl max-w-4xl mx-auto shadow-lg">
        <p className="text-xl font-medium">
          ⚠️ No resume uploaded yet. Please check back later.
        </p>
      </div>
    );
  }

  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    resumeUrl
  )}&embedded=true`;

  return (
    <div className="relative max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-semibold text-cyan-400 mb-6 text-center">
        My Resume
      </h2>

      {/* Resume container */}
      <div className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {iframeLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm z-10 transition-opacity duration-500">
            <div className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-cyan-300">Loading resume preview...</p>
          </div>
        )}

        <iframe
          src={googleViewerUrl}
          title="Resume Viewer"
          className={`w-full h-[85vh] border-none transition-opacity duration-700 ${
            iframeLoading ? "opacity-0" : "opacity-100"
          }`}
          allow="autoplay"
          onLoad={() => setIframeLoading(false)}
        ></iframe>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleDownload}
          className="bg-cyan-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all"
        >
          Download Resume (PDF)
        </button>
      </div>
    </div>
  );
};

export default Resume;
