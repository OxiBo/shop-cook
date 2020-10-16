// https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/#complete-code-block

const keys = require("../config/keys"),
  sgMail = require("@sendgrid/mail"),
  resetEmailTemplate = require("./resetEmailTemplate");
sgMail.setApiKey(keys.sendGridKey);

module.exports = (sendTo, resetToken) => {
  const sentAt = new Date();
  const msg = {
    to: sendTo, // Change to your recipient
    from: "shop&cook@shop-cook.com", // Change to your verified sender
    subject: "Your Password Reset Token",
    text: "Shopping List",
    html: resetEmailTemplate(
      `Your Password Reset Token is here! \n\n <a href="${keys.redirectDomain}/reset?resetToken=${resetToken}">Click here to reset!</a>`,
      sentAt
    ),
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
