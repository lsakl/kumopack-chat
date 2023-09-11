module.exports = app => {

  const Contact = require("../controllers/contact.controller.js");
  const authHealper = require('../helper/auth.helper');

  app.get("/api/contact/add/:userId/:contactUserId",                          Contact.addContact);
  app.post("/api/contact/list",                       authHealper.checkToken, Contact.getContactList);
};