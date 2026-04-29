import Contact from "../models/Contact.js";

export const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const created = await Contact.create({ name, email, subject, message });
  res.status(201).json({
    message: "Message sent successfully",
    id: created._id
  });
};
