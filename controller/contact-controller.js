import Contact from "../models/contact-model.js";

const contactForm = async (req, res) => {
  try {

    const response = req.body;

    await Contact.create(response);
    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ message: "Message not submitted" });
  }
};

export { contactForm };