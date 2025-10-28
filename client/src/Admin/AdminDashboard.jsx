import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroForm from "./HeroForm";
import AboutForm from "./AboutForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";
import ExperienceForm from "./ExperienceForm";
import ContactForm from "./ContactForm";
import ResumeForm from "./ResumeForm";
import EducationForm from "./EducationForm";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const navigate = useNavigate();

  // ✅ Manual logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // ✅ Auto logout after 15 minutes
  // useEffect(() => {
  //   const autoLogoutTimer = setTimeout(() => {
  //     localStorage.removeItem("adminToken");
  //     alert("Session expired. Please log in again.");
  //     navigate("/admin/login");
  //   }, 15 * 60 * 1000); // 15 minutes

  //   return () => clearTimeout(autoLogoutTimer);
  // }, [navigate]);

  // ✅ Logout when tab/window is closed or refreshed
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.removeItem("adminToken");
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "hero":
        return <HeroForm />;
      case "about":
        return <AboutForm />;
      case "experience":
        return <ExperienceForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      case "contact":
        return <ContactForm />;
      case "resume":
        return <ResumeForm/>
      case "education":
        return <EducationForm/>
      default:
        return <HeroForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 pt-40 relative">
      {/* ✅ Centered Title */}
      <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* ✅ Logout Button (below fixed header, top-right corner) */}
      <button
        onClick={handleLogout}
        className="absolute top-28 right-10 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition shadow-lg"
      >
        Logout
      </button>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["hero", "about", "skills", "education","experience", "projects", "certifications", "contact", "resume"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${activeTab === tab
              ? "bg-cyan-500 text-gray-900"
              : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Active Form */}
      <div>{renderTab()}</div>
    </div>
  );
};

export default AdminDashboard;
