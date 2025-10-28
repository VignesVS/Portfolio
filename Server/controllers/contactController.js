import Contact from "../models/Contact.js";

// ✅ Get the single contact info
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update the single contact info
export const updateContact = async (req, res) => {
  try {
    const { email, phone, linkedin, github, address } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ message: "Email and phone are required" });
    }

    let contact = await Contact.findOne();

    // If no contact exists, create one
    if (!contact) {
      contact = new Contact({ email, phone, linkedin, github, address });
    } else {
      contact.email = email;
      contact.phone = phone;
      contact.linkedin = linkedin;
      contact.github = github;
      contact.address = address;
    }

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
