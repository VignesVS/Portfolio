import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ExperienceForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    duration: "",
    from: "",
    to: "",
    description: "",
  });
  const [experiences, setExperiences] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/experience";

  // Fetch all experiences
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(API_URL);
      setExperiences(res.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast.error("Failed to load experiences");
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        toast.success("Experience updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        toast.success("Experience added successfully!");
      }

      setFormData({
        company: "",
        role: "",
        duration: "",
        from: "",
        to: "",
        description: "",
      });
      setEditId(null);
      fetchExperiences();
    } catch (error) {
      console.error("Error saving experience:", error);
      toast.error("Failed to save experience");
    }
  };

  // Handle edit click
 const handleEdit = (exp) => {
  setFormData({
    company: exp.company || "",
    role: exp.role || "",
    duration: exp.duration || "",
    from: exp.from || "",
    to: exp.to || "",
    description: exp.description || "",
  });
  setEditId(exp._id);
};


  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Experience deleted successfully!");
        fetchExperiences();
      } catch (error) {
        console.error("Error deleting experience:", error);
        toast.error("Failed to delete experience");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">
        {editId ? "Edit Experience" : "Add Experience"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        <input
          type="text"
          name="role"
          placeholder="Role / Position"
          value={formData.role}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 2 years)"
          value={formData.duration}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        <input
          type="text"
          name="from"
          placeholder="From (e.g. Jan 2020)"
          value={formData.from}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        <input
          type="text"
          name="to"
          placeholder="To (e.g. Dec 2022)"
          value={formData.to}
          onChange={handleChange}
          required
          className="p-2 rounded bg-gray-700 border border-gray-600"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="p-2 rounded bg-gray-700 border border-gray-600 md:col-span-2"
        ></textarea>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded md:col-span-2"
        >
          {editId ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      {/* Display all experiences */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-cyan-300">All Experiences</h3>
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-gray-700 p-4 rounded flex justify-between items-start"
            >
              <div>
                <h4 className="font-bold text-lg text-cyan-400">{exp.company}</h4>
                <p className="text-gray-300">
                  {exp.role} — {exp.duration}
                </p>
                <p className="text-gray-400 text-sm">
                  {exp.from} → {exp.to}
                </p>
                <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
