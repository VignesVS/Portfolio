import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import adminApi from "../api/adminApi";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    adminApi.get("/skills")
      .then(res => {
        console.log('Fetched skills:', res.data); // ✅ Debug print
        setSkills(res.data);
      })
      .catch(err => console.log(err));
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

  // Duplicate for infinite loop effect
  const displayedSkills = [...skills, ...skills];

  return (
    <section id="skills" className="py-10 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          Skills
        </h2>

        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-hidden whitespace-nowrap"
        >
          {displayedSkills.map((skill, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-28 flex flex-col items-center justify-center text-center"
            >
              {skill.logo ? (
                <img
                  src={skill.logo}
                  alt={skill.name}
                  className="w-20 h-20 object-contain rounded-half shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-700 flex items-center justify-center rounded-full">
                  <span className="text-white font-bold text-xl">
                    {skill.name[0]}
                  </span>
                </div>
              )}
              {/* 👇 Skill name below logo */}
              <p className="mt-2 text-sm text-gray-300">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
