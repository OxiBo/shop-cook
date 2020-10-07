const keys = require("../config/keys"),
  sgMail = require("@sendgrid/mail"),
  emailTemplate = require("./emailTemplate");
sgMail.setApiKey(keys.sendGridKey);

module.exports = (shoppingList, sendTo, sendFrom) => {
    console.log(sendTo)
    console.log(sendFrom)
  const msg = {
    to: sendTo, // Change to your recipient
    from: sendFrom, // Change to your verified sender
    subject: "ShoppingList",
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
