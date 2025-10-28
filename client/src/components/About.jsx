import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import adminApi from "../api/adminApi";

const About = () => {
  const [aboutData, setAboutData] = useState({ content: "", image: "" });

  useEffect(() => {
    adminApi
      .get("/about")
      .then((res) => {
        if (res.data) setAboutData(res.data);
      })
      .catch((err) => console.log("Error fetching about:", err));
  }, []);

  // Animation variants
  const imageVariant = {
    hidden: { opacity: 0, x: -150, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, x: 150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        
        {/* Left side: Animated Image */}
        {aboutData.image && (
          <motion.div
            variants={imageVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}  
            className="md:flex-[0.3] flex justify-center md:justify-start w-full"
          >
            <img
              src={aboutData.image}
              alt="About Me"
              className="w-full h-auto rounded-xl object-cover opacity-95 hover:opacity-100 transition-all duration-300"
            />
          </motion.div>
        )}

        {/* Right side: Animated Text */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="md:flex-[0.7] text-center md:text-left space-y-6 w-full"
        >
          <h2 className="text-4xl font-bold text-cyan-400">About Me</h2>
          <p className="text-gray-400 text-lg whitespace-pre-line">
            {aboutData.content}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
