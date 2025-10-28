import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
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

  // Fetch hero data
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

  // Parallax effect for stars
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

      {/* Moving Stars */}
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
        {/* Left: Text + Social Icons */}
        <div className="md:flex-1 flex flex-col items-center md:items-start space-y-5">
          <h1 className="text-5xl font-bold text-white whitespace-nowrap">
            Hi, I'm{" "}
            <span className="text-cyan-400 animate-pulse">{heroData.name}</span>
          </h1>

          <p className="text-gray-300 text-xl">{heroData.role}</p>
          <p className="text-gray-400 max-w-md text-center md:text-left">
            {heroData.description}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
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
        </div>

        {/* Right: Profile Image */}
        <div className="md:flex-1 flex justify-center md:justify-end relative">
          <div className="rounded-full shadow-[0_0_40px_10px_rgba(0,255,255,0.3)] p-1">
            <img
              src={heroData.profileImage || profilePlaceholder}
              alt="Profile"
              className="w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-cyan-400/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
