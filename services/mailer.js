// https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/#complete-code-block

const keys = require('../config/keys'),
  sgMail = require('@sendgrid/mail'),
  emailTemplate = require('./emailTemplate');
sgMail.setApiKey(keys.sendGridKey);

module.exports = (shoppingList, sendTo, sendFrom) => {
  const sentAt = new Date();
  const msg = {
    to: sendTo, // Change to your recipient
    from: sendFrom, // Change to your verified sender
    subject: `Shopping List, ${sentAt.toDateString()} `,
    text: 'Shopping List',
    html: emailTemplate(shoppingList, sentAt),
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent'); // res.status(200).json({ status: 'Ok' });
    })
    .catch((error) => {
      console.error(error);
    });
};
