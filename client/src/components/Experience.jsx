import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Experience.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/experience")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <section id="experience" className="experience-section">
      <h2 className="experience-title">Experience</h2>

      <div className="experience-container">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp._id} className="experience-card">
              <div className="experience-header">
                <h3 className="company-name">{exp.company}</h3>
                <span className="designation">{exp.designation}</span>
              </div>
              <p className="duration">
                {exp.from} – {exp.to}
              </p>
              <p className="description">{exp.description}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No experiences added yet.</p>
        )}
      </div>
    </section>
  );
};

export default Experience;
