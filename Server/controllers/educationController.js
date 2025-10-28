import Education from "../models/Education.js";

// ✅ Get all education records (sorted by "from" descending)
export const getEducation = async (req, res) => {
  try {
    const educationList = await Education.find().sort({ from: -1 });
    res.status(200).json(educationList);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch education records",
      error: error.message,
    });
  }
};

// ✅ Add new education record
export const addEducation = async (req, res) => {
  try {
    const { institution, educationLevel, from, to, location, fieldOfStudy, description } = req.body;

    // Basic validation
    if (!institution || !educationLevel || !from || !to) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newEducation = new Education({
      institution,
      educationLevel,
      from,
      to,
      location,
      fieldOfStudy,
      description,
    });

    await newEducation.save();
    res.status(201).json({
      message: "Education record added successfully",
      education: newEducation,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error adding education record",
      error: error.message,
    });
  }
};

// ✅ Update existing education record by ID
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEducation = await Education.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEducation) {
      return res.status(404).json({ message: "Education record not found" });
    }

    res.status(200).json({
      message: "Education record updated successfully",
      education: updatedEducation,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating education record",
      error: error.message,
    });
  }
};

// ✅ Delete education record by ID
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEducation = await Education.findByIdAndDelete(id);
    if (!deletedEducation) {
      return res.status(404).json({ message: "Education record not found" });
    }

    res.status(200).json({
      message: "Education record deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting education record",
      error: error.message,
    });
  }
};
