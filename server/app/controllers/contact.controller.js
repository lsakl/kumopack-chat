const Contact = require("../models/contact.model.js");

exports.addContact = (req, res) => {
  Contact.addContact(req.params.userId, req.params.contactUserId, (err, data) => {
    if (err){
      res.send(err);
      return;
    }

    res.send(data);      
  });
};

exports.getContactList = (req, res) => {
  Contact.getContactList(req.body.userId, req.body.search, req.body.page, req.body.limit, (err, data) => {
    if (err){
      res.send(err);
      return;
    }

    res.send(data);      
  });
};