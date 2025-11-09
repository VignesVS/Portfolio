import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import adminApi from "../api/adminApi";
import image from "../assets/education.png";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await adminApi.get("education");
        setEducationList(res.data);
      } catch (err) {
        console.error("Error fetching education data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10 text-lg">
        Loading education details...
      </div>
    );
  }

  if (educationList.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 text-lg">
        📘 No education details found yet.
      </div>
    );
  }

  // Animation Variants
  const imageVariant = {
    hidden: { opacity: 0, x: 120, rotate: 5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, x: -120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
      id="education"
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-16 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row-reverse w-full max-w-6xl md:gap-[160px]">
        
        {/* Right side (Animated Image) */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="md:w-[25%] w-full flex justify-center items-center mb-10 md:mb-0"
        >
          <div className=" hidden md:block w-72 h-72 bg-gray-800 flex items-center justify-center text-gray-500 rounded-xl shadow-lg">
            <img
              src={image}
              alt="Education Illustration"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Left side (Animated Education Details) */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="md:w-[55%] w-full"
        >
          <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-bold text-cyan-400 mb-12 text-center tracking-wide"
                  >
                  Education
                  </motion.h2>

          <div className="relative pl-6 border-l-2 border-cyan-400/40 space-y-10">
            {educationList.map((edu) => (
              <div key={edu._id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[10px] top-1.5 w-4 h-4 bg-cyan-400 rounded-full shadow-lg"></div>

                {/* Education details */}
                <div className="ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold text-cyan-400">
                      {edu.institution}
                    </h3>
                    <p className="text-gray-300">
                      <span className="font-medium text-gray-100">
                        {edu.educationLevel}
                      </span>{" "}
                      {edu.fieldOfStudy && `- ${edu.fieldOfStudy}`}
                    </p>
                    <p className="text-sm text-gray-400">
                      📍 {edu.location || "Location not available"}
                    </p>
                    {edu.grade && (
                      <p className="text-sm text-gray-400">🎯 Grade: {edu.grade}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-300 mt-2 italic">{edu.description}</p>
                    )}
                  </div>

                  <div className="text-sm text-gray-400 mt-3 sm:mt-0 sm:text-right">
                    🗓 {edu.from} - {edu.to}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
