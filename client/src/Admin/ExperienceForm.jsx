import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi"; // ✅ use your configured axios instance

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExp, setNewExp] = useState({
    company: "",
    designation: "",
    from: "",
    to: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch all experiences
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await adminApi.get("/experience"); // ✅ plural endpoint
      setExperiences(res.data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

  // ✅ Handle form input
  const handleChange = (e) => {
    setNewExp({ ...newExp, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update experience
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      await adminApi.put(`/experience/${editingId}`, newExp);
    } else {
      await adminApi.post("/experience", newExp);
    }
    setNewExp({ company: "", designation: "", from: "", to: "", description: "" });
    setEditingId(null);
    fetchExperiences();
  } catch (err) {
    console.error("Error saving experience:", err);
  }
};

  // ✅ Edit experience
  const handleEdit = (exp) => {
    setNewExp({
      company: exp.company,
      designation: exp.designation,
      from: exp.from,
      to: exp.to,
      description: exp.description,
    });
    setEditingId(exp._id);
  };

  // ✅ Delete experience
  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/experience/${id}`); // ✅ plural endpoint
      fetchExperiences();
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
        Manage Experience
      </h2>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="company"
          value={newExp.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          name="designation"
          value={newExp.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="from"
            value={newExp.from}
            onChange={handleChange}
            placeholder="From (e.g. Jan 2023)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="text"
            name="to"
            value={newExp.to}
            onChange={handleChange}
            placeholder="To (e.g. May 2024 / Present)"
            className="w-1/2 p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <textarea
          name="description"
          value={newExp.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-700 text-white"
        ></textarea>

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold px-4 py-2 rounded transition w-full"
        >
          {editingId ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      {/* ✅ List of experiences */}
      <div>
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-gray-700 p-4 mb-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-cyan-300">{exp.company}</h3>
              <p className="text-sm text-gray-300">{exp.designation}</p>
              <p className="text-sm text-gray-400">
                {exp.from} – {exp.to}
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
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
