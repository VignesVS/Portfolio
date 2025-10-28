import React, { useState, useEffect } from "react";
import adminApi from "../api/adminApi"; 
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Load existing contact data on mount
  useEffect(() => {
    const fetchContact = async () => {
      try {
         const res = await adminApi.get("/contact");
        if (res.data) {
          setFormData({
            email: res.data.email || "",
            phone: res.data.phone || "",
            linkedin: res.data.linkedin || "",
            github: res.data.github || "",
            address: res.data.address || "",
          });
        }
        toast.success("Contact details loaded!");
      } catch (err) {
        console.error("Error fetching contact:", err);
        toast.error("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (PUT only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await adminApi.put("/contact", formData);
      alert("Contact updated successfully!");
       toast.success("✅ Contact updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (err) {
      console.error("Error updating contact:", err);
      toast.error("Error updating contact details");
    }
  };

  if (loading) {
    return <div className="text-gray-400 text-center py-10">Loading contact info...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg text-white border border-gray-700">
      <h2 className="text-3xl font-semibold text-cyan-400 mb-6 text-center">
        Contact Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            placeholder="Enter your LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium">GitHub</label>
          <input
            type="text"
            name="github"
            placeholder="Enter your GitHub URL"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium">Address</label>
          <textarea
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:ring-2 focus:ring-cyan-500 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-500 text-gray-900 font-semibold px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all"
          >
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
