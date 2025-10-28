import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import { toast } from "react-toastify";

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [formData, setFormData] = useState({
    company: "",
    designation: "",
    from: "",
    to: "",
    description: "",
    location: "",
    type: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all experiences when page loads
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await adminApi.get("/experience");
      setExperiences(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching experiences:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add or Update experience
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await adminApi.put(`/experience/${editingId}`, formData);
        toast.success("Updated successfully");
      } else {
        await adminApi.post("/experience", formData);
        toast.success("Added successfully");
      }

      // Reset form and reload list
      setFormData({
        company: "",
        designation: "",
        from: "",
        to: "",
        description: "",
        location: "",
        type: "",
      });
      setEditingId(null);
      fetchExperiences();
    } catch (err) {
      console.error("❌ Error saving experience:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit handler
  const handleEdit = (exp) => {
    setFormData({
      company: exp.company || "",
      designation: exp.designation || "",
      from: exp.from || "",
      to: exp.to || "",
      description: exp.description || "",
      location: exp.location || "",
      type: exp.type || "",
    });
    setEditingId(exp._id);
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      await adminApi.delete(`/experience/${id}`);
      fetchExperiences();
    } catch (err) {
      console.error("❌ Error deleting experience:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
        Manage Experience
      </h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        {/* Location and Type */}
        <div className="flex gap-4">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location (e.g. Chennai, India)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select Type</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Duration */}
        <div className="flex gap-4">
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="From (e.g. Jan 2023)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="To (e.g. May 2024 / Present)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-700 text-white"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 rounded font-semibold transition ${
            loading
              ? "bg-cyan-300 text-gray-700 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600 text-gray-900"
          }`}
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Experience"
            : "Add Experience"}
        </button>
      </form>

      {/* Experience List */}
      <div>
        {experiences.length === 0 ? (
          <p className="text-gray-400 text-center">No experiences added yet.</p>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-gray-700 p-4 mb-4 rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-cyan-300">
                  {exp.company}
                </h3>
                <p className="text-sm text-gray-300">{exp.designation}</p>
                <p className="text-sm text-gray-400">
                  {exp.from} – {exp.to}
                </p>
                <p className="text-sm text-gray-400">
                  {exp.location} • {exp.type}
                </p>
                <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
