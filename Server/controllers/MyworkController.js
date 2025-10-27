import Experience from "../models/Myworks.js";

// Get all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new experience


// ✅ Add new experience
export const addExperience = async (req, res) => {
  try {
    console.log("📩 Incoming Body (POST):", req.body); // 👈 check this in terminal

    const newExp = new Experience(req.body);
    const savedExp = await newExp.save();
    res.status(201).json(savedExp);
  } catch (error) {
    console.error("❌ Error in addExperience:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    console.log("📩 Incoming Body (PUT):", req.body); // 👈 check this
    console.log("🆔 Params:", req.params);

    const updatedExp = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedExp) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json(updatedExp);
  } catch (error) {
    console.error("❌ Error in updateExperience:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    await experience.deleteOne();
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
