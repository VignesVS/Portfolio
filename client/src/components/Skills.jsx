import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import adminApi from "../api/adminApi";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    adminApi
      .get("/skills")
      .then((res) => {
        setSkills(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Auto scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollAmount = 0;
    const speed = 1; // pixels per frame
    let animationFrame;

    const scrollStep = () => {
      if (!el) return;
      scrollAmount += speed;
      if (scrollAmount >= el.scrollWidth / 2) scrollAmount = 0; // loop
      el.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(scrollStep);
    };

    animationFrame = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrame);
  }, [skills]);

  const displayedSkills = [...skills, ...skills];

  return (
    <section id="skills" className="py-20 bg-gray-900 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto px-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-cyan-400 mb-12 text-center tracking-wide"
        >
          Skills
        </motion.h2>

        <motion.div
          ref={scrollRef}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex gap-10 overflow-x-scroll whitespace-nowrap no-scrollbar"
        >
          {displayedSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-28 flex flex-col items-center justify-center text-center group"
              whileHover={{
                y: -8,
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0,255,255,0.5)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-20 h-20 object-contain rounded-full shadow-lg transition-all duration-300 group-hover:shadow-[0_0_20px_#00ffff]"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-full">
                  <span className="text-white font-bold text-xl">
                    {skill.name[0]}
                  </span>
                </div>
              )}
              <p className="mt-2 text-sm text-gray-300">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
