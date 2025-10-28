import React, { useEffect, useState } from "react";
import axios from "axios";
import adminApi from "../api/adminApi";

const Resume = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await adminApi.get("/resume");
        if (res.data?.url) {
          setResumeUrl(res.data.url);
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return (
      <div className="text-gray-400 text-center py-10 text-lg">
        Loading resume...
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

  // Use Google Docs Viewer fallback
  const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
    resumeUrl
  )}&embedded=true`;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-semibold text-cyan-400 mb-6 text-center">
        My Resume
      </h2>

      {/* Embedded PDF Viewer */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <iframe
          src={googleViewerUrl}
          title="Resume Viewer"
          className="w-full h-[85vh] border-none"
          allow="autoplay"
        ></iframe>
      </div>

      <div className="text-center mt-6">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all"
        >
          Download Resume (PDF)
        </a>
      </div>
    </div>
  );
};

export default Resume;
