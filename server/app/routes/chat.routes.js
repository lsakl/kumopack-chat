module.exports = io => {
  const Chat = require("../controllers/chat.controller.js");
  const authHealper = require('../helper/auth.helper');
  io.on('connection', socket => {
    if(authHealper.socketCheckToken(socket.handshake.headers.authorization)){

      const userData = {
        socketId    : socket.id,
        userId      : socket.handshake.headers.userid,
        userType    : socket.handshake.headers.usertype,
        datetime    : new Date(),
        connection  : true,
      };
      Chat.userConnected(userData, Array.from(io.sockets.sockets.values()).map((s) => s.id));

      socket.on('chat_history', params => {
        Chat.getChatHistory(params, chatHistory =>{
          io.to(userData.socketId).emit('chat_history', chatHistory);
        });
      });
      
      socket.on('chat_message', message => {
        Chat.saveMessage(message, saveMessageRes =>{
            if(saveMessageRes.status === 200){
              saveMessageRes.data.forEach(element => {
                io.to(element.socketId).emit('chat_message', message);
              });              
            }else{
              io.to(userData.socketId).emit('chat_message', message);
            }
        });
      });

      socket.on('chat_status', params => {
        Chat.getStatus(params, resStatus =>{
          io.to(socket.id).emit('chat_status', resStatus);
        });
      });

      socket.on('chat_history_more', message => {
        Chat.getChatHistoryMore(message, getChatHistoryMoreRes =>{
          io.to(socket.id).emit('chat_history_more', getChatHistoryMoreRes);
        });
      });
    
      socket.on('disconnect', () => {
        Chat.userDisconnect(Array.from(io.sockets.sockets.values()).map((s) => s.id));
      });
    }
  });
};