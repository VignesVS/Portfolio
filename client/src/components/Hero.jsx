import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import profilePlaceholder from "../assets/profile.jpg";
import adminApi from "../api/adminApi";

const Hero = () => {
  const [heroData, setHeroData] = useState({
    name: "",
    role: "",
    description: "",
    profileImage: "",
    socialLinks: { linkedin: "", github: "" },
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await adminApi.get("/profile");
        if (res.data) setHeroData(res.data);
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: -80, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Galaxy Background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#0d1b2a,_#000)]"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      ></div>

      {/* Stars */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/stardust.png')",
          backgroundSize: "400px 400px",
          transform: `translate(${mousePosition.x / 2}px, ${mousePosition.y / 2}px)`,
          transition: "transform 0.2s ease-out",
          opacity: 0.4,
        }}
      ></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center md:gap-[160px] px-6">
        {/* Left: Text */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // 👈 replays every scroll
          className="md:flex-1 flex flex-col items-center md:items-start space-y-5"
        >
          <h1 className="text-5xl font-bold text-white whitespace-nowrap">
            Hi, I'm{" "}
            <span className="text-cyan-400 animate-pulse">{heroData.name}</span>
          </h1>

          <p className="text-gray-300 text-xl">{heroData.role}</p>
          <p className="text-gray-400 max-w-md text-center md:text-left">
            {heroData.description}
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-2">
            {/* LinkedIn */}
            {heroData.socialLinks?.linkedin && (
              <a
                href={heroData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-3xl hover:text-cyan-600 transition"
              >
                <FaLinkedin />
              </a>
            )}

            {/* GitHub */}
            {heroData.socialLinks?.github && (
              <a
                href={heroData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-3xl hover:text-cyan-600 transition"
              >
                <FaGithub />
              </a>
            )}

            {/* LeetCode - Hardcoded */}
            <a
              href="https://leetcode.com/u/VIGNESHVS031024/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 text-3xl hover:text-cyan-600 transition"
              title="LeetCode Profile"
            >
              {/* LeetCode SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path d="M16.53 17.66a.75.75 0 0 1 0 1.06l-1.83 1.83a6.75 6.75 0 0 1-9.54-9.54l5.97-5.97a.75.75 0 1 1 1.06 1.06l-5.97 5.97a5.25 5.25 0 1 0 7.42 7.42l1.83-1.83a.75.75 0 0 1 1.06 0zM20.78 11.47a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 1 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 1 1 1.06-1.06l3.25 3.25z" />
              </svg>
            </a>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition mt-4"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          variants={imageVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // 👈 replays every scroll
          className="md:flex-1 flex justify-center md:justify-end relative"
        >
          <div className="rounded-full shadow-[0_0_40px_10px_rgba(0,255,255,0.3)] p-1">
            <img
              src={heroData.profileImage || profilePlaceholder}
              alt="Profile"
              className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-cyan-400/30"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
