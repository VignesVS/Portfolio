import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminApi
      .get("/contact")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setContactInfo(res.data[0]);
        } else if (res.data) {
          setContactInfo(res.data);
        }
      })
      .catch((err) => console.error("Error fetching contact info:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.post("/messages", formData);

      toast.success("✅ Message sent successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
        style: {
          background: "rgba(0, 20, 30, 0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(34,211,238,0.4)",
          color: "#E0F2FE",
          borderRadius: "12px",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 0 15px rgba(34,211,238,0.3)",
        },
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("❌ Error sending message. Try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
        transition: Slide,
        style: {
          background: "rgba(50,0,0,0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(239,68,68,0.4)",
          color: "#FCA5A5",
          borderRadius: "12px",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 0 15px rgba(239,68,68,0.3)",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center py-16 overflow-hidden"
    >
      <motion.h1
        className="text-5xl font-bold text-cyan-400 mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Contact Me
      </motion.h1>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        <motion.div
          className="space-y-6 flex flex-col justify-center"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-cyan-400 text-2xl" />
            <p className="text-lg">{contactInfo.email || "Loading..."}</p>
          </div>

          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-cyan-400 text-2xl" />
            <p className="text-lg">{contactInfo.phone || "Loading..."}</p>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
            <p className="text-lg">{contactInfo.address || "Loading..."}</p>
          </div>

          {contactInfo.linkedin && (
            <div className="flex items-center gap-4">
              <FaLinkedin className="text-cyan-400 text-2xl" />
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-cyan-300 transition"
              >
                LinkedIn Profile
              </a>
            </div>
          )}

          {contactInfo.github && (
            <div className="flex items-center gap-4">
              <FaGithub className="text-cyan-400 text-2xl" />
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-cyan-300 transition"
              >
                GitHub Profile
              </a>
            </div>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full space-y-6 hover:shadow-cyan-500/30 transition duration-300"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>

      {/* Toast Container */}
      <ToastContainer newestOnTop />
    </section>
  );
};

export default Contact;
