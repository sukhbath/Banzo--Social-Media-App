var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "56dda736128ab5",
    pass: "8928a775571360",
  },
});

function sendEmail(to, subject, text) {
  var mailOptions = {
    from: "banzo@gmail.com",
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
