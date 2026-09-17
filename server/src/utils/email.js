const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
};


const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your FixFlow email",
    html: `
      <h2>Welcome to FixFlow</h2>

      <p>
        Please verify your email address by clicking the
        link below.
      </p>

      <a href="${verificationUrl}">
        Verify Email
      </a>

      <p>
        This link will expire soon.
      </p>
    `
  });
};

module.exports = {
  sendEmail,
  sendVerificationEmail
};