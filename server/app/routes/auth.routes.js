module.exports = app => {
  const Auth        = require("../controllers/auth.controller.js");
  const dotenv      = require('dotenv');
  const authHealper = require('../helper/auth.helper');
  
  dotenv.config();
    
    app.get("/api/login/:userId", Auth.login);
};