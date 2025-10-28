import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminApi from "../api/adminApi"; // Axios instance with token

const EducationForm = () => {
  const [educationList, setEducationList] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    institution: "",
    educationLevel: "",
    fieldOfStudy: "",
    fromMonth: "",
    fromYear: "",
    toMonth: "",
    toYear: "",
    location: "",
    grade: "",
    description: "",
  });

  // Months and Years dropdown data
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec",
  ];
  const years = Array.from({ length: 50 }, (_, i) => 2030 - i); // 2030 to 1981

  const fetchEducation = async () => {
    try {
      const res = await adminApi.get("/education");
      setEducationList(res.data);
    } catch (err) {
      toast.error("Error loading education data");
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        from: `${formData.fromMonth} ${formData.fromYear}`,
        to: `${formData.toMonth} ${formData.toYear}`,
      };

      if (editId) {
        await adminApi.put(`/education/${editId}`, formattedData);
        toast.success("Education updated successfully!");
        setEditId(null);
      } else {
        await adminApi.post("/education", formattedData);
        toast.success("Education added successfully!");
      }

      setFormData({
        institution: "",
        educationLevel: "",
        fieldOfStudy: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        location: "",
        grade: "",
        description: "",
      });
      fetchEducation();
    } catch (err) {
      toast.error("Error saving education");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this education record?")) {
      try {
        await adminApi.delete(`/education/${id}`);
        toast.success("Deleted successfully");
        fetchEducation();
      } catch (err) {
        toast.error("Error deleting record");
      }
    }
  };

  const handleEdit = (edu) => {
    const [fromMonth, fromYear] = edu.from?.split(" ") || ["", ""];
    const [toMonth, toYear] = edu.to?.split(" ") || ["", ""];

    setFormData({
      institution: edu.institution,
      educationLevel: edu.educationLevel,
      fieldOfStudy: edu.fieldOfStudy,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      location: edu.location,
      grade: edu.grade || "",
      description: edu.description || "",
    });
    setEditId(edu._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">
        {editId ? "Edit Education" : "Manage Education"}
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 grid gap-4"
      >
        <input
          type="text"
          name="institution"
          placeholder="INSTITUTION"
          value={formData.institution}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="educationLevel"
          placeholder="EDUCATION LEVEL"
          value={formData.educationLevel}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="FIELD OF STUDY"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* From Month/Year */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="fromMonth"
            value={formData.fromMonth}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">From Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            name="fromYear"
            value={formData.fromYear}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">From Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* To Month/Year */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="toMonth"
            value={formData.toMonth}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">To Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            name="toYear"
            value={formData.toYear}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">To Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="location"
          placeholder="LOCATION"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="grade"
          placeholder="GRADE"
          value={formData.grade}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <input
          type="text"
          name="description"
          placeholder="DESCRIPTION"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 py-3 px-6 rounded-lg font-semibold"
          >
            {editId ? "Update Education" : "Add Education"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({
                  institution: "",
                  educationLevel: "",
                  fieldOfStudy: "",
                  fromMonth: "",
                  fromYear: "",
                  toMonth: "",
                  toYear: "",
                  location: "",
                  grade: "",
                  description: "",
                });
              }}
              className="bg-gray-600 hover:bg-gray-700 py-3 px-6 rounded-lg font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Education List */}
      <div className="grid gap-4">
        {educationList.map((edu) => (
          <div
            key={edu._id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl text-cyan-400">{edu.institution}</h3>
              <p className="text-gray-300">
                {edu.educationLevel} - {edu.fieldOfStudy}
              </p>
              <p className="text-gray-400 text-sm">
                {edu.from} - {edu.to}
              </p>
              <p className="text-gray-400 text-sm">{edu.location}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(edu)}
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(edu._id)}
                className="text-red-400 hover:text-red-500 font-semibold"
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

export default EducationForm;
