const Auth        = require("../models/auth.model.js");
const authHealper = require('../helper/auth.helper');

exports.login = (req, res) => {
  Auth.loginCheckUserAccount(req.params.userId, (err, userData) => {
    if (err){
      res.send(err);
      return;
    }
    if(userData && userData.data._id.toString() === req.params.userId){
      res.send({
        status:200,
        data:userData.data,
        token:authHealper.generateAccessToken({ 
                id:1,
                data:userData.data,
              }),
        verifyToken:1,
        messages:"การเข้าสู่ระบบเรียบเร้อยแล้ว"
      });
    }else{
      res.send({
        status:200,
        data:null,
        token:null,
        verifyToken:0,
        messages:"การเข้าสู่ระบบไม่ถูกต้อง"
      });   
    }
  });
    
};