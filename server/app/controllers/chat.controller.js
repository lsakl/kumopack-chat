const Chat = require("../models/chat.model.js");

exports.userConnected = (userData, userConnectAll) => {
  Chat.userConnected(userData, userConnectAll, (err, data) => {
    if (err){
      console.log(err);
    }
    return data;
  });
};

exports.userDisconnect = (userConnectAll) => {
  Chat.userDisconnect(userConnectAll, (err, data) => {
    if (err){
      console.log(err);
    }
    return data;
  });
};

exports.saveMessage = (data, result) => {
  if(data.messageType === "message"){
    Chat.saveMessageTextType(data, (saveMessageTextTypeErr, saveMessageTextTypeData) => {
      if (saveMessageTextTypeErr){
        result(saveMessageTextTypeErr);
        return;
      }
      
      Chat.getUserConnectionByUserId(data.to, data.from, (getUserConnectionByUserIdErr, getUserConnectionByUserIdData) => {
        if (getUserConnectionByUserIdErr){
          result(getUserConnectionByUserIdErr);
          return;
        }
        result(getUserConnectionByUserIdData);
      });
    });     
  }
};

exports.getChatHistory = (params, result) => {
  Chat.getChatHistory(params, (err, data) => {
    if (err){
      console.log(err);
    }
    result(data);
  });
};

exports.getChatHistoryMore = (params, result) => {
  Chat.getChatHistoryMore(params, (err, data) => {
    if (err){
      console.log(err);
    }
    result(data);
  });
};

exports.getStatus = (params, result) => {
  Chat.getStatus(params, (err, data) => {
    if (err){
      console.log(err);
    }
    result(data);
  });
};