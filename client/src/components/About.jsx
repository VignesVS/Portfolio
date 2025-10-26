import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [aboutData, setAboutData] = useState({ content: '', image: '' });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/about')
      .then((res) => {
        if (res.data) {
          setAboutData(res.data); // res.data should have content and image
        }
      })
      .catch((err) => console.log('Error fetching about:', err));
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        
        {/* Left side: Image (30%) */}
        <div className="md:flex-[0.3] flex justify-center md:justify-start w-full">
          {aboutData.image && (
            <img
              src={aboutData.image}
              alt="About Me"
              className="w-full h-auto rounded-2xl shadow-xl object-cover"
            />
          )}
        </div>

        {/* Right side: Text (70%) */}
        <div className="md:flex-[0.7] text-center md:text-left space-y-6 w-full">
          <h2 className="text-4xl font-bold text-cyan-400">About Me</h2>
          <p className="text-gray-400 text-lg whitespace-pre-line">{aboutData.content}</p>
        </div>

      </div>
    </section>
  );
};

export default About;
