import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import adminApi from "../api/adminApi";

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    adminApi
      .get("/certifications")
      .then((res) => setCertifications(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="certifications"
      className="min-h-screen bg-gray-900 text-white pt-28 pb-16 overflow-hidden"
    >
      {/* Title Animation */}
      <motion.h1
        className="text-5xl font-bold text-cyan-400 text-center mb-12"
        variants={fadeRight}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        Certifications
      </motion.h1>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert._id}
            className="flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => setModalImage(cert.image)}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Certificate Image */}
            <motion.div
              className="relative w-96 h-96 md:w-96 md:h-96 rounded-lg overflow-hidden shadow-lg group"
              variants={fadeInScale}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              {cert.description && (
                <div
                  className="absolute top-0 left-0 w-full h-[70%] bg-black bg-opacity-70 
                  flex items-center justify-center text-center px-4
                  -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                  transition-all duration-700 ease-out"
                >
                  <p className="text-gray-200 text-lg">{cert.description}</p>
                </div>
              )}
            </motion.div>

            {/* Text Below */}
            <motion.p
              className="mt-4 text-lg text-gray-300 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {cert.name}
            </motion.p>
            {cert.date && (
              <motion.p
                className="text-sm text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                viewport={{ once: true }}
              >
                {cert.date}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
          >
            <motion.img
              src={modalImage}
              alt="Certification"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl border-4 border-cyan-400 object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsPage;
