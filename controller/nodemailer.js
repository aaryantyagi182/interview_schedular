const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "recruiter.abcde@gmail.com", // generated ethereal user
      pass: "@123Admin", // generated ethereal password
    },
  });
module.exports = transporter;