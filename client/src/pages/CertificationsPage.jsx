import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    adminApi
      .get("/certifications")
      .then((res) => setCertifications(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      id="certifications"
      className="min-h-screen bg-gray-900 text-white pt-32 pb-10" // 🔹 added pt-32 (adjust if needed)
    >
      <h1 className="text-5xl font-bold text-cyan-400 text-center mb-12">
        Certifications
      </h1>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {certifications.map((cert) => (
          <div
            key={cert._id}
            className="flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => setModalImage(cert.image)}
          >
            {/* Image with hover description */}
            <div className="relative w-96 h-96 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-lg group">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover overlay for description */}
              {cert.description && (
                <div
                  className="absolute top-0 left-0 w-full h-[70%] bg-black bg-opacity-70 
                  flex items-center justify-center text-center px-4
                  -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                  transition-all duration-700 ease-out"
                >
                  <p className="text-gray-200 text-lg">{cert.description}</p>
                </div>
              )}
            </div>

            {/* Static info below */}
            <p className="mt-4 text-lg text-gray-300 font-semibold">
              {cert.name}
            </p>
            {cert.date && <p className="text-sm text-gray-400">{cert.date}</p>}
          </div>
        ))}
      </div>

      {/* Modal for full image view */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Certification"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;
