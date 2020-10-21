var config = require("../config/config");
var ejs = require("ejs");
var sgMail = require("@sendgrid/mail");
//require('dotenv').config({path:'../../'});
sgMail.setApiKey(config.sendGridKey);

var subjects = {
  accountCreation: "Conta criada em CarWashClub",
  accountRemoval: "Conta removida em CarWashClub",
  resetPassword: "Renovação de Palavra-Passe em CarWashClub",
};

async function isSendedEmail(action, params, recipient) {
  try {
    var email = {
      to: recipient,
      from: {
        email: config.emailAddress,
        name: "CarWashClub",
      },
    };

    // Get email subject
    email.subject = subjects[action];

    // Get email html
    email.html = await ejs.renderFile(
      __dirname + "/templates/" + action + ".ejs",
      { params: params }
    );

    console.log(email);
    var sent = false;

    // Send email
    await sgMail
      .sendStatus(email)
      .then(async (res) => {
        sent = true;
      })
      .catch(async (err) => {});

    return sent;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports.isSendedEmail = isSendedEmail;