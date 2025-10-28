import React, { useEffect, useState, useRef } from "react";
import adminApi from "../api/adminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SkillForm = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
    level: "",
    logo: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const formRef = useRef(null);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await adminApi.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch skills!");
      }
    };
    fetchSkills();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSkill({ ...newSkill, logo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Smooth scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Add or Update Skill
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newSkill.name);
      formData.append("category", newSkill.category);
      formData.append("level", newSkill.level);
      if (newSkill.logo instanceof File) {
        formData.append("logo", newSkill.logo);
      }

      if (editId) {
        await adminApi.put(`/skills/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Skill updated successfully!");
      } else {
        await adminApi.post("/skills", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Skill added successfully!");
      }

      // Refresh skills list
      const res = await adminApi.get("/skills");
      setSkills(res.data);

      // Reset form
      setNewSkill({ name: "", category: "", level: "", logo: null });
      setPreview(null);
      setEditId(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to save skill!");
    }
  };

  // Edit Skill
  const handleEdit = (skill) => {
    setEditId(skill._id);
    setNewSkill({
      name: skill.name,
      category: skill.category || "",
      level: skill.level || "",
      logo: skill.logo,
    });
    setPreview(skill.logo);
    scrollToForm();
  };

  // Delete Skill
  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
      toast.success("🗑️ Skill deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete skill!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Manage Skills</h2>

      {/* Add/Edit Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mb-10 bg-gray-800 p-4 rounded-lg shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category (Frontend, Backend, Tool...)"
          value={newSkill.category}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />

        {/* Dropdown for Level */}
        <select
          name="level"
          value={newSkill.level}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="text-white"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg shadow-lg mt-2"
          />
        )}

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          {editId ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-lg text-center"
          >
            {skill.logo && (
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-24 h-24 object-cover rounded-lg mb-2"
              />
            )}
            <p className="text-white font-semibold text-lg">{skill.name}</p>
            <p className="text-gray-400 text-sm">{skill.category}</p>
            <p className="text-gray-400 text-sm">{skill.level}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(skill)}
                className="bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded text-sm transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillForm;
