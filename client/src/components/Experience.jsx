import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import "./Experience.css";
import work from "../assets/work.gif";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await adminApi.get("/experience");
        setExperiences(res.data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10 text-lg">
        Loading experience details...
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 text-lg">
        💼 No experience details found yet.
      </div>
    );
  }

  return (
    <section
      id="experience"
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-16"
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto md:gap-[115px]">
        {/* Left Side - Image */}
        <div className="md:w-[30%] w-full flex justify-center items-center mb-10 md:mb-0">
          <div className="w-full max-w-[500px] h-[350px] bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
            <img
              src={work}
              alt="Experience Illustration"
              className=" object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Side - Experience List */}
        <div className="md:w-[55%] w-full">
          <h2 className="text-4xl font-bold text-cyan-400 mb-10 text-center md:text-left">
            Experience
          </h2>

          <div className="relative pl-6 border-l-2 border-cyan-400/40 space-y-10">
            {experiences.map((exp) => (
              <div key={exp._id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[10px] top-1.5 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]"></div>

                {/* Experience Content */}
                <div className="ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#111827]/80 p-5 rounded-xl shadow-lg transition-all duration-300 ">
                  {/* Left - Company Info */}
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400">
                      {exp.company}
                    </h3>
                    <p className="text-gray-300 font-medium">
                      {exp.designation || "Role not specified"}
                    </p>
                      <p className="text-sm text-gray-400">
                      📍 {exp.location || "Location not available"}
                    </p>
                    <p className="text-sm text-gray-400">
                      💼 Type: {exp.type || "Not mentioned"}
                    </p>
                   
                   
                    {exp.description && (
                      <p className="text-gray-300 mt-2 italic">
                        {exp.description}
                      </p>
                    )}
                  </div>

                  {/* Right - Duration */}
                  <div className="text-sm text-gray-400 mt-3 sm:mt-0 sm:text-right">
                    🗓 {exp.from} - {exp.to}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
