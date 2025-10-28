import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import adminApi from "../api/adminApi"
import "react-toastify/dist/ReactToastify.css";

const HeroForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    description: "",
    profileImage: "",
    linkedin: "",
    github: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing profile
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await adminApi.get("/profile");
      if (res.data) {
        setProfile({
          name: res.data.name || "",
          role: res.data.role || "",
          description: res.data.description || "",
          profileImage: res.data.profileImage || "",
          linkedin: res.data.socialLinks?.linkedin || "",
          github: res.data.socialLinks?.github || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("❌ Failed to fetch profile details.");
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);


  // Handle text change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("role", profile.role);
      formData.append("description", profile.description);
      formData.append("linkedin", profile.linkedin);
      formData.append("github", profile.github);

      if (file) formData.append("profileImage", file);
      else formData.append("profileImage", profile.profileImage);

      await await adminApi.put("/profile",  formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update profile!");
    }
  };

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">Edit Hero Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          name="role"
          value={profile.role}
          onChange={handleChange}
          placeholder="Your Role"
          className="p-2 rounded bg-gray-700 text-white"
          required
        />

        <textarea
          name="description"
          value={profile.description}
          onChange={handleChange}
          placeholder="Short description"
          className="p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="profileImage"
          value={profile.profileImage}
          onChange={handleChange}
          placeholder="Profile image URL"
          className="p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="linkedin"
          value={profile.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          name="github"
          value={profile.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="p-2 rounded bg-gray-700 text-white"
        />

        {profile.profileImage && (
          <div className="flex justify-center">
            <img
              src={file ? URL.createObjectURL(file) : profile.profileImage}
              alt="Profile Preview"
              className="w-40 h-40 rounded-full mt-2 shadow-lg object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-4 bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default HeroForm;
