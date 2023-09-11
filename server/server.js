const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const app           = express();
const dotenv        = require('dotenv');

dotenv.config();

// let whiteList = [process.env.FRONTEND];
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whiteList.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Service Not allowed by CORS'))
//         }
//     }
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.status(404).send({message:"Service not found."});
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/contact.routes.js")(app);

const server = app.listen(process.env.HTTPPORT, () => {
  console.log(`HTTP PORT : ${process.env.HTTPPORT}.`);
});
//////////////////////////////////////////////
// const http = require("http").createServer();
// const io = require('socket.io')(http, {
//   cors: {
//     origin: '*',
//   }
// });

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

require("./app/routes/chat.routes.js")(io);

// http.listen(process.env.SOCKET_IO_PORT, () => {
//   console.log("SOCKET IO PORT : " + process.env.SOCKET_IO_PORT);
// });