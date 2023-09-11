const User = require("../models/user.model.js");

exports.checkInsertData = (req, res) => {
  User.checkInsertData(req.body, (err, data) => {
    if (err){
      res.send(err);
      return;
    }

    res.send(data);      
  });
  
};

// exports.getUserList = (req, res) => {
//   User.getUserList(req.body.userType, req.body.page, req.body.limit, (err, data) => {
//     if (err){
//       res.send(err);
//       return;
//     }

//     res.send(data);      
//   });
// };