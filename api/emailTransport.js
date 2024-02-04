const sgMail = require("@sendgrid/mail");
const { sendGridApi } = require("../config/keys");
sgMail.setApiKey(sendGridApi);

function sendConfirmEmail(to, htmlContent, content, subject) {
  const msg = {
    to, // Change to your recipient
    from: "eng.dburhama@gmail.com", // Change to your verified sender
    subject,
    text: content, // assign the msg that is inside the email
    html: htmlContent,
  };
  return sgMail.send(msg);
}
module.exports = sendConfirmEmail;
