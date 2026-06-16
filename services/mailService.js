const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
     host: "smtp.gmail.com",
  port: 587,
  secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
     family: 4,
  });

const sendMail = async (
  name,
  email,
  phone,
  subject,
  message
) => {
  try {
    console.log(
      "ADMIN_EMAIL:",
      process.env.ADMIN_EMAIL
    );

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

      to:
        process.env.ADMIN_EMAIL ||
        process.env.EMAIL_USER,

      replyTo: email,

      subject: `New Contact: ${subject}`,

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Message</h2>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <p><strong>Message:</strong></p>

          <p>${message}</p>
        </div>
      `,
    });

    console.log("Email Sent");
  } catch (error) {
    console.log(
      "Mail Error:",
      error.message
    );

    throw new Error(error.message);
  }
};

module.exports = sendMail;