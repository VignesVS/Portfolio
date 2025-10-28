import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger floating animation after component mounts
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("hero"), 200);
    } else scrollToSection("hero");
    setMenuOpen(false);
  };

  const handleProjectsClick = () => {
    navigate("/projects");
    setMenuOpen(false);
  };

  const handleCertificationsClick = () => {
    navigate("/certifications");
    setMenuOpen(false);
  };

  const handleResume = () => {
    navigate("/resume");
    setMenuOpen(false);
  };

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("contact"), 200);
    } else scrollToSection("contact");
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", onClick: handleHomeClick, path: "/" },
    { name: "Projects", onClick: handleProjectsClick, path: "/projects" },
    { name: "Certifications", onClick: handleCertificationsClick, path: "/certifications" },
    { name: "Resume", onClick: handleResume, path: "/resume" },
    { name: "Contact", onClick: handleContactClick },
  ];

  return (
    <header className="fixed w-full backdrop-blur-md bg-gray-900/70 border-b border-gray-800 text-white shadow-lg z-50 transition-all duration-300 overflow-hidden">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo with floating animation */}
        <div
          onClick={() => navigate("/")}
          className={`text-3xl font-bold text-cyan-400 cursor-pointer tracking-wider hover:scale-110 transition-transform duration-500 ${
            animate ? "animate-floatDown" : "opacity-0 -translate-y-6"
          }`}
        >
          VS
        </div>

        {/* Desktop Nav */}
        <nav
          className={`hidden md:flex gap-8 text-lg transition-all duration-700 ${
            animate ? "animate-floatDownDelay" : "opacity-0 -translate-y-6"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <span
                key={link.name}
                onClick={link.onClick}
                className={`relative cursor-pointer font-medium transition-all duration-300 ${
                  isActive ? "text-cyan-400" : "text-gray-200 hover:text-cyan-400"
                }`}
              >
                {link.name}
                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-cyan-400 scale-x-0 transition-transform duration-300 origin-right ${
                    isActive ? "scale-x-100 origin-left" : "hover:scale-x-100 origin-left"
                  }`}
                ></span>
              </span>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-2xl cursor-pointer hover:text-cyan-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 px-6 py-4 flex flex-col gap-4 text-lg animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <span
                key={link.name}
                onClick={link.onClick}
                className={`cursor-pointer font-medium transition-all ${
                  isActive ? "text-cyan-400" : "text-gray-200 hover:text-cyan-400"
                }`}
              >
                {link.name}
              </span>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
