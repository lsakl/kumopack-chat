module.exports = app => {

  const User = require("../controllers/user.controller.js");
  const authHealper = require('../helper/auth.helper');

  app.post("/api/user/add",                           User.checkInsertData);
  // app.post("/api/user/list",  authHealper.checkToken, User.getUserList);
};