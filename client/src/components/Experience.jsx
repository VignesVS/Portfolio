import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  // Animation Variants
  const imageVariant = {
    hidden: { opacity: 0, x: -120, rotate: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, x: 120 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section
  id="experience"
  className="bg-gray-900 text-white flex items-center justify-center px-6 py-10 md:py-12 overflow-hidden mt-0"
>


      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto md:gap-[115px]">

        {/* Left Side - Animated Image */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="md:w-[30%] w-full flex justify-center items-center mb-10 md:mb-0"
        >
          <div className=" hidden md:block w-72 h-72 w-full max-w-[500px] h-[350px] bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
            <img
              src={work}
              alt="Experience Illustration"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Right Side - Animated Experience List */}
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
          Experience
        </motion.h2>

          <div className="relative pl-6 border-l-2 border-cyan-400/40 space-y-10">
            {experiences.map((exp) => (
              <div key={exp._id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[10px] top-1.5 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff]"></div>

                {/* Experience Content */}
                <div className="ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-[#111827]/80 p-5 rounded-xl shadow-lg transition-all duration-300">
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

                  {/* Right - Duration (Single Line, No Wrap) */}
                  <div className="text-sm text-gray-400 mt-3 sm:mt-0 sm:text-right whitespace-nowrap">
                    🗓 {exp.from} - {exp.to}
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

export default Experience;
