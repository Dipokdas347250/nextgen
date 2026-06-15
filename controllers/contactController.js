const Contact = require("../models/Contact");
const sendMail = require("../services/mailService");

const createContact =
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        subject,
        message,
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !subject ||
        !message
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required",
        });
      }

      const newContact =
        await Contact.create({
          name,
          email,
          phone,
          subject,
          message,
        });

      await sendMail(
        name,
        email,
        phone,
        subject,
        message
      );

      res.status(201).json({
        success: true,
        message:
          "Message sent successfully",
        data: newContact,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
};