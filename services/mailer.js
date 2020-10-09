// https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/#complete-code-block

const keys = require("../config/keys"),
  sgMail = require("@sendgrid/mail"),
  emailTemplate = require("./emailTemplate");
sgMail.setApiKey(keys.sendGridKey);

module.exports = (shoppingList, sendTo, sendFrom) => {

  const msg = {
    to: sendTo, // Change to your recipient
    from: sendFrom, // Change to your verified sender
    subject: "Shopping List",
    text: "Shopping List",
    html: emailTemplate(shoppingList),
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
